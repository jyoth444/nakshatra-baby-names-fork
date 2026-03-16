"use client";

/**
 * BirthDetailsForm - Form to input date, time, and location of birth.
 * Triggers Nakshatra calculation on submit.
 */

import { useState } from "react";
import { Calendar, Clock, MapPin, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { calculateNakshatraAction } from "@/lib/actions";
import type { NakshatraResult } from "@/utils/nakshatraCalculator";

interface BirthDetailsFormProps {
  onResult: (result: NakshatraResult) => void;
}

export default function BirthDetailsForm({ onResult }: BirthDetailsFormProps) {
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [timeOfBirth, setTimeOfBirth] = useState("");
  const [location, setLocation] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!dateOfBirth || !timeOfBirth) {
      setError("Please enter both date and time of birth.");
      return;
    }

    setIsLoading(true);
    try {
      const result = await calculateNakshatraAction(dateOfBirth, timeOfBirth);
      onResult(result);
    } catch (err) {
      setError("Failed to calculate Nakshatra. Please try again.");
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="w-full max-w-lg mx-auto shadow-xl border-orange-100 dark:border-orange-900/30">
      <CardHeader className="text-center pb-2">
        <CardTitle className="text-2xl font-bold bg-gradient-to-r from-orange-500 to-amber-500 bg-clip-text text-transparent">
          Enter Birth Details
        </CardTitle>
        <CardDescription className="text-gray-500 dark:text-gray-400">
          Provide the date and time of birth to calculate the Nakshatra
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Date of Birth */}
          <div className="space-y-2">
            <Label
              htmlFor="dob"
              className="text-sm font-medium flex items-center gap-2"
            >
              <Calendar className="h-4 w-4 text-orange-500" />
              Date of Birth
            </Label>
            <Input
              id="dob"
              type="date"
              value={dateOfBirth}
              onChange={(e) => setDateOfBirth(e.target.value)}
              className="border-gray-200 dark:border-gray-700 focus:ring-orange-500 focus:border-orange-500"
              required
            />
          </div>

          {/* Time of Birth */}
          <div className="space-y-2">
            <Label
              htmlFor="tob"
              className="text-sm font-medium flex items-center gap-2"
            >
              <Clock className="h-4 w-4 text-orange-500" />
              Time of Birth
            </Label>
            <Input
              id="tob"
              type="time"
              value={timeOfBirth}
              onChange={(e) => setTimeOfBirth(e.target.value)}
              className="border-gray-200 dark:border-gray-700 focus:ring-orange-500 focus:border-orange-500"
              required
            />
          </div>

          {/* Location (Optional) */}
          <div className="space-y-2">
            <Label
              htmlFor="location"
              className="text-sm font-medium flex items-center gap-2"
            >
              <MapPin className="h-4 w-4 text-orange-500" />
              Location{" "}
              <span className="text-xs text-gray-400 font-normal">
                (optional)
              </span>
            </Label>
            <Input
              id="location"
              type="text"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              placeholder="e.g., Mumbai, India"
              className="border-gray-200 dark:border-gray-700 focus:ring-orange-500 focus:border-orange-500"
            />
          </div>

          {/* Error message */}
          {error && (
            <p className="text-sm text-red-500 text-center">{error}</p>
          )}

          {/* Submit button */}
          <Button
            type="submit"
            disabled={isLoading}
            className="w-full bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white shadow-md"
          >
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Calculating...
              </>
            ) : (
              "Calculate Nakshatra"
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
