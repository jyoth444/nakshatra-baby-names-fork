import Link from "next/link";
import { Star } from "lucide-react";

const NAKSHATRA_LINKS = [
  "Ashwini", "Bharani", "Krittika", "Rohini", "Mrigashira",
  "Ardra", "Punarvasu", "Pushya", "Ashlesha", "Magha",
];

const LETTER_LINKS = ["a", "vi", "ka", "ma", "na", "ra", "sa", "ga", "ha", "pa"];

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div className="lg:col-span-1">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-orange-400 to-amber-500">
                <Star className="h-5 w-5 text-white" fill="white" />
              </div>
              <span className="text-lg font-bold text-white">Nakshatra Names</span>
            </Link>
            <p className="text-sm text-gray-400 leading-relaxed">
              Discover meaningful Indian baby names based on Vedic astrology and
              Nakshatra wisdom. Over 10,000 names with meanings and origins.
            </p>
          </div>

          {/* Nakshatra Links */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-white mb-4">
              Popular Nakshatras
            </h3>
            <ul className="space-y-2">
              {NAKSHATRA_LINKS.map((n) => (
                <li key={n}>
                  <Link
                    href={`/nakshatra/${n.toLowerCase()}`}
                    className="text-sm text-gray-400 hover:text-orange-400 transition-colors"
                  >
                    {n} Names
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* By Letter */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-white mb-4">
              Browse by Letter
            </h3>
            <ul className="space-y-2">
              {LETTER_LINKS.map((l) => (
                <li key={l}>
                  <Link
                    href={`/names/${l}`}
                    className="text-sm text-gray-400 hover:text-orange-400 transition-colors"
                  >
                    Names Starting with &apos;{l.toUpperCase()}&apos;
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-white mb-4">
              Quick Links
            </h3>
            <ul className="space-y-2">
              {[
                { href: "/", label: "Home" },
                { href: "/search", label: "Search Names" },
                { href: "/blog", label: "Blog" },
                { href: "/blog/how-to-choose-baby-names-by-nakshatra", label: "How to Choose Names" },
                { href: "/blog/meaningful-sanskrit-baby-names", label: "Sanskrit Names" },
                { href: "/sitemap.xml", label: "Sitemap" },
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-gray-400 hover:text-orange-400 transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 border-t border-gray-800 pt-8 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-xs text-gray-500">
            &copy; {new Date().getFullYear()} Nakshatra Baby Names. All rights reserved.
          </p>
          <div className="flex gap-4 text-xs text-gray-500">
            <Link href="/about" className="hover:text-orange-400 transition-colors">About</Link>
            <Link href="/privacy-policy" className="hover:text-orange-400 transition-colors">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-orange-400 transition-colors">Terms of Service</Link>
            <Link href="/contact" className="hover:text-orange-400 transition-colors">Contact</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
