"use client";

import { useEffect, useState } from "react";

// Release: Wednesday, Oct 14 2026, 00:00 Brasília time.
const RELEASE_AT = new Date("2026-10-14T00:00:00-03:00").getTime();

function remaining(now: number) {
  const total = Math.max(0, Math.ceil((RELEASE_AT - now) / 1_000));
  return {
    d: Math.floor(total / 86400),
    h: Math.floor((total % 86400) / 3600),
    m: Math.floor((total % 3600) / 60),
    s: total % 60,
    done: total === 0,
  };
}

export default function ReleaseCountdown() {
  // Starts empty so the static HTML matches the first client render.
  const [now, setNow] = useState<number | null>(null);

  useEffect(() => {
    setNow(Date.now());
    const id = setInterval(() => setNow(Date.now()), 1_000);
    return () => clearInterval(id);
  }, []);

  const t = now === null ? null : remaining(now);

  return (
    <div className="flex items-center gap-3 rounded-[14px] bg-[#e8e8ed] px-6 py-[13px] text-[18px] font-semibold text-[#1c1c1e]">
      {t?.done ? (
        "Out now"
      ) : (
        <>
          Release in
          <span className="min-w-[10.5ch] rounded-md bg-[#1c1c1e] px-2 py-1 text-center text-[14px] font-bold tabular-nums text-white">
            {t ? `${t.d}d ${t.h}h ${t.m}m ${t.s}s` : "–d –h –m –s"}
          </span>
        </>
      )}
    </div>
  );
}
