"use client";

import { useState } from "react";
import { Mail, Sparkles, CheckCircle, Loader2 } from "lucide-react";

interface EmailCaptureProps {
  variant?: "banner" | "inline" | "sidebar";
  headline?: string;
  subheadline?: string;
}

export default function EmailCapture({
  variant = "banner",
  headline = "Get Your Free Nakshatra Name Report",
  subheadline = "Enter your email and we'll send you a personalised list of auspicious baby names based on your child's Nakshatra, Pada, and lucky syllables.",
}: EmailCaptureProps) {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email.trim() || !email.includes("@")) {
      setErrorMsg("Please enter a valid email address.");
      return;
    }

    setStatus("loading");
    setErrorMsg("");

    try {
      // Replace this with your actual email service (Mailchimp, ConvertKit, etc.)
      // Example: await fetch("/api/subscribe", { method: "POST", body: JSON.stringify({ email }) });
      await new Promise((resolve) => setTimeout(resolve, 900)); // Simulated delay
      setStatus("success");
      setEmail("");
    } catch {
      setStatus("error");
      setErrorMsg("Something went wrong. Please try again.");
    }
  }

  if (variant === "sidebar") {
    return (
      <div className="rounded-2xl border border-orange-100 bg-gradient-to-b from-orange-50 to-amber-50 p-5">
        <div className="flex items-center gap-2 mb-3">
          <Mail className="h-4 w-4 text-orange-500" />
          <h3 className="text-sm font-bold text-gray-900">Free Name Report</h3>
        </div>
        <p className="text-xs text-gray-500 mb-4 leading-relaxed">
          Get a personalised PDF with your baby&rsquo;s Nakshatra names, lucky letters, and personality insights.
        </p>
        {status === "success" ? (
          <div className="flex items-center gap-2 text-green-700 text-sm">
            <CheckCircle className="h-4 w-4" />
            <span>Thank you! Check your inbox.</span>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-2">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="your@email.com"
              className="w-full rounded-lg border border-orange-200 bg-white px-3 py-2 text-sm focus:border-orange-400 focus:outline-none"
              disabled={status === "loading"}
            />
            {errorMsg && <p className="text-xs text-red-500">{errorMsg}</p>}
            <button
              type="submit"
              disabled={status === "loading"}
              className="w-full rounded-lg bg-orange-500 px-4 py-2 text-sm font-semibold text-white hover:bg-orange-600 transition-colors disabled:opacity-60"
            >
              {status === "loading" ? (
                <span className="flex items-center justify-center gap-2">
                  <Loader2 className="h-3.5 w-3.5 animate-spin" /> Sending...
                </span>
              ) : (
                "Get Free Report"
              )}
            </button>
          </form>
        )}
      </div>
    );
  }

  if (variant === "inline") {
    return (
      <div className="rounded-2xl border border-orange-100 bg-white p-6 shadow-sm">
        <div className="flex items-start gap-4">
          <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl bg-orange-100">
            <Sparkles className="h-5 w-5 text-orange-500" />
          </div>
          <div className="flex-1">
            <h3 className="font-bold text-gray-900">{headline}</h3>
            <p className="mt-1 text-sm text-gray-500">{subheadline}</p>
            {status === "success" ? (
              <div className="mt-3 flex items-center gap-2 text-green-700 text-sm font-medium">
                <CheckCircle className="h-4 w-4" />
                <span>You&rsquo;re on the list! Check your inbox shortly.</span>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="mt-4 flex gap-2">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  className="flex-1 rounded-xl border border-gray-200 px-4 py-2.5 text-sm focus:border-orange-400 focus:outline-none"
                  disabled={status === "loading"}
                />
                <button
                  type="submit"
                  disabled={status === "loading"}
                  className="rounded-xl bg-orange-500 px-5 py-2.5 text-sm font-semibold text-white hover:bg-orange-600 transition-colors whitespace-nowrap disabled:opacity-60"
                >
                  {status === "loading" ? <Loader2 className="h-4 w-4 animate-spin" /> : "Get Report"}
                </button>
              </form>
            )}
            {errorMsg && <p className="mt-1 text-xs text-red-500">{errorMsg}</p>}
          </div>
        </div>
      </div>
    );
  }

  // Default: banner
  return (
    <div className="rounded-2xl bg-gradient-to-r from-orange-500 to-amber-500 p-8 text-white">
      <div className="max-w-2xl mx-auto text-center">
        <div className="flex items-center justify-center gap-2 mb-3">
          <Sparkles className="h-6 w-6 text-white/80" />
          <span className="text-sm font-semibold text-orange-100 uppercase tracking-wide">Free for New Parents</span>
        </div>
        <h2 className="text-2xl font-bold sm:text-3xl">{headline}</h2>
        <p className="mt-3 text-orange-100 leading-relaxed">{subheadline}</p>

        {status === "success" ? (
          <div className="mt-6 flex items-center justify-center gap-2 rounded-xl bg-white/20 px-6 py-4 text-white font-semibold">
            <CheckCircle className="h-5 w-5" />
            <span>Thank you! Your report is on its way.</span>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="mt-6 flex flex-col sm:flex-row gap-3 justify-center">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email address"
              className="flex-1 max-w-sm rounded-xl border-0 px-5 py-3.5 text-base text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-white/50"
              disabled={status === "loading"}
            />
            <button
              type="submit"
              disabled={status === "loading"}
              className="rounded-xl bg-white px-7 py-3.5 text-base font-bold text-orange-600 hover:bg-orange-50 transition-colors shadow-lg disabled:opacity-70"
            >
              {status === "loading" ? (
                <span className="flex items-center gap-2">
                  <Loader2 className="h-4 w-4 animate-spin" /> Sending...
                </span>
              ) : (
                "Send My Free Report"
              )}
            </button>
          </form>
        )}
        {errorMsg && <p className="mt-2 text-sm text-red-200">{errorMsg}</p>}
        <p className="mt-3 text-xs text-orange-200">No spam, ever. Unsubscribe anytime.</p>
      </div>
    </div>
  );
}
