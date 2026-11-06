"use client";

import { Analytics, type BeforeSendEvent } from "@vercel/analytics/next";

export default function SiteAnalytics() {
  return <Analytics beforeSend={(event: BeforeSendEvent) => {
    // Only production custom-domain visits belong in the business dashboard.
    const url = new URL(event.url);
    if (!["www.theshvitz.com", "theshvitz.com"].includes(url.hostname)) return null;
    if (navigator.webdriver || url.pathname.startsWith("/api/") || url.pathname.startsWith("/admin")) return null;
    // An owner can exclude their browser with ?analytics=off; ?analytics=on restores it.
    try {
      const choice = new URLSearchParams(window.location.search).get("analytics");
      if (choice === "off") localStorage.setItem("shvitz-analytics-opt-out", "1");
      if (choice === "on") localStorage.removeItem("shvitz-analytics-opt-out");
      if (localStorage.getItem("shvitz-analytics-opt-out") === "1") return null;
    } catch { /* Storage can be disabled; tracking must never break the page. */ }
    // Keep form values, query strings and fragments out of analytics payloads.
    url.search = "";
    url.hash = "";
    return { ...event, url: url.toString() };
  }} />;
}
