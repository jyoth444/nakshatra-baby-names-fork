/**
 * Nakshatra Calculator - Determines nakshatra, rashi, pada from birth date/time.
 *
 * Uses the high-precision `astronomy-engine` library (ELP/MPP02 lunar theory)
 * for the Moon's tropical ecliptic longitude, then applies the B.V. Raman
 * Ayanamsa to convert to sidereal coordinates as used in traditional
 * South Indian Vedic Panchangam calculations.
 *
 * Reference: Don Cross "astronomy-engine" (ELP/MPP02 for Moon),
 *            B.V. Raman Ayanamsa (traditional South Indian standard).
 */

import { EclipticGeoMoon } from "astronomy-engine";
import { NAKSHATRAS, type NakshatraInfo } from "@/data/nakshatras";

export interface NakshatraResult {
  nakshatra: string;
  nakshatraId: number;
  rashi: string;
  pada: number;
  syllables: string[];
  allSyllables: string[];
  deity: string;
  moonLongitude: number;
}

/**
 * Calculate the B.V. Raman Ayanamsa for a given date.
 *
 * The Ayanamsa is the angular difference between the tropical and sidereal
 * zodiacs due to the precession of the equinoxes.
 *
 * The B.V. Raman Ayanamsa is widely used in traditional South Indian
 * (Telugu, Kannada, Tamil) panchangam calculations. It differs from the
 * Lahiri (Chitrapaksha) system by approximately 1.8° and is based on
 * B.V. Raman's independent determination of the sidereal reference point.
 *
 * Reference value at J2000.0: ~22°02' = 22.033°
 * Precession rate: ~50.29 arcseconds per year (IAU standard)
 */
function getRamanAyanamsa(
  year: number,
  month: number,
  day: number
): number {
  const decimalYear = year + (month - 1) / 12 + (day - 1) / 365.25;

  const AYANAMSA_J2000 = 22.033;
  const PRECESSION_RATE = 50.29 / 3600.0;

  const ayanamsa = AYANAMSA_J2000 + PRECESSION_RATE * (decimalYear - 2000.0);

  return ayanamsa;
}

/**
 * Get the Moon's tropical ecliptic longitude using the astronomy-engine library.
 *
 * Uses the ELP/MPP02 lunar ephemeris which provides sub-arcminute accuracy
 * for the Moon's position. This is significantly more accurate than simplified
 * Meeus perturbation series.
 *
 * @param year - Year (UT)
 * @param month - Month 1-12 (UT)
 * @param day - Day 1-31 (UT)
 * @param utHour - Decimal hour in UT (e.g., 10.5 for 10:30 UT)
 * @returns Moon's tropical ecliptic longitude in degrees (0-360)
 */
function getMoonTropicalLongitude(
  year: number,
  month: number,
  day: number,
  utHour: number
): number {
  // Convert decimal UT hour to hours, minutes, seconds
  const totalSeconds = utHour * 3600;
  const hrs = Math.floor(totalSeconds / 3600);
  const mins = Math.floor((totalSeconds % 3600) / 60);
  const secs = Math.floor(totalSeconds % 60);

  // Create UTC Date object for astronomy-engine
  const date = new Date(Date.UTC(year, month - 1, day, hrs, mins, secs));

  // Get Moon's geocentric ecliptic coordinates (ecliptic of date)
  const moonEcl = EclipticGeoMoon(date);

  return moonEcl.lon;
}

/**
 * Determine the Nakshatra and Pada from sidereal Moon longitude.
 * Each nakshatra spans 13°20' = 13.3333° of the sidereal ecliptic.
 * Each pada spans 3°20' = 3.3333°.
 */
function getNakshatraFromLongitude(longitude: number): {
  nakshatra: NakshatraInfo;
  pada: number;
} {
  // Each nakshatra = 360/27 = 13.3333° degrees
  const nakshatraIndex = Math.floor(longitude / (360 / 27));

  // Each pada = 360/108 = 3.3333° degrees
  const padaInNakshatra = Math.floor(
    (longitude - nakshatraIndex * (360 / 27)) / (360 / 108)
  );
  const pada = padaInNakshatra + 1; // 1-based

  // Safety: clamp nakshatra index
  const safeIndex = Math.max(0, Math.min(nakshatraIndex, 26));
  const nakshatra = NAKSHATRAS[safeIndex];

  return { nakshatra, pada: Math.min(pada, 4) };
}

/**
 * Main function: Calculate Nakshatra details from birth date and time.
 *
 * Uses high-precision Moon position from astronomy-engine (ELP/MPP02 theory)
 * with B.V. Raman Ayanamsa to determine the sidereal Moon longitude,
 * nakshatra, pada, and starting syllables.
 *
 * @param dateOfBirth - Date string in YYYY-MM-DD format
 * @param timeOfBirth - Time string in HH:MM format (24-hour, IST assumed)
 * @returns NakshatraResult with all calculated details
 */
export function calculateNakshatra(
  dateOfBirth: string,
  timeOfBirth: string
): NakshatraResult {
  const [year, month, day] = dateOfBirth.split("-").map(Number);
  const [hours, minutes] = timeOfBirth.split(":").map(Number);

  // Convert IST to UT (IST = UT + 5:30)
  let utDecimalHour = hours + minutes / 60 - 5.5;

  // Handle day boundary crossing (when IST time before 5:30 AM gives negative UT)
  let utYear = year;
  let utMonth = month;
  let utDay = day;

  if (utDecimalHour < 0) {
    utDecimalHour += 24;
    utDay -= 1;

    if (utDay < 1) {
      utMonth -= 1;
      if (utMonth < 1) {
        utMonth = 12;
        utYear -= 1;
      }
      // Get days in the previous month
      utDay = new Date(utYear, utMonth, 0).getDate();
    }
  } else if (utDecimalHour >= 24) {
    utDecimalHour -= 24;
    utDay += 1;

    // Handle month overflow
    const daysInMonth = new Date(utYear, utMonth, 0).getDate();
    if (utDay > daysInMonth) {
      utDay = 1;
      utMonth += 1;
      if (utMonth > 12) {
        utMonth = 1;
        utYear += 1;
      }
    }
  }

  // Get Moon's tropical ecliptic longitude using astronomy-engine (high precision)
  const tropicalLongitude = getMoonTropicalLongitude(
    utYear,
    utMonth,
    utDay,
    utDecimalHour
  );

  // Get B.V. Raman Ayanamsa - traditional South Indian standard
  const ayanamsa = getRamanAyanamsa(year, month, day);

  // Convert tropical to sidereal longitude
  let siderealLongitude = tropicalLongitude - ayanamsa;
  siderealLongitude = ((siderealLongitude % 360) + 360) % 360;

  // Determine Nakshatra and Pada from sidereal position
  const { nakshatra, pada } = getNakshatraFromLongitude(siderealLongitude);

  // Get the pada-specific info
  const padaInfo = nakshatra.padas.find((p) => p.pada === pada);
  const rashi = padaInfo?.rashi || nakshatra.rpiSignStart;
  const syllables = padaInfo?.syllables || [];

  // Get all syllables for this nakshatra
  const allSyllables = nakshatra.padas.flatMap((p) => p.syllables);

  return {
    nakshatra: nakshatra.name,
    nakshatraId: nakshatra.id,
    rashi,
    pada,
    syllables,
    allSyllables,
    deity: nakshatra.deity,
    moonLongitude: siderealLongitude,
  };
}
