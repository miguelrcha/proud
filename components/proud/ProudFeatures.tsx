import type { ReactNode } from "react";
import DownloadMacLabel from "./DownloadMacLabel";

const stroke = {
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 2.2,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

function sparkle(cx: number, cy: number, r: number) {
  const k = r * 0.18;
  return `M${cx} ${cy - r}Q${cx + k} ${cy - k} ${cx + r} ${cy}Q${cx + k} ${cy + k} ${cx} ${cy + r}Q${cx - k} ${cy + k} ${cx - r} ${cy}Q${cx - k} ${cy - k} ${cx} ${cy - r}Z`;
}

const features: { title: ReactNode; icon: ReactNode }[] = [
  {
    title: <>Built-in<br />AI Agents</>,
    icon: (
      <>
        <path d={sparkle(10, 13.5, 8.5)} fill="currentColor" />
        <path d={sparkle(19, 4.8, 3.6)} fill="currentColor" />
        <circle cx="19.5" cy="18.5" r="1.7" fill="currentColor" />
      </>
    ),
  },
  {
    title: <>Connected<br />to your apps</>,
    icon: (
      <>
        <path d="M12 6 5 18h14L12 6Z" {...stroke} />
        <circle cx="12" cy="5.5" r="3.2" fill="currentColor" />
        <circle cx="5" cy="18" r="3.2" fill="currentColor" />
        <circle cx="19" cy="18" r="3.2" fill="currentColor" />
      </>
    ),
  },
  {
    title: <>Notes, Docs<br />&amp; Tasks</>,
    icon: (
      <>
        <rect x="4" y="2.5" width="16" height="19" rx="3.5" {...stroke} />
        <path d="m7.5 8.6 1.5 1.5 2.6-3M14 9h2.5M7.5 14h9M7.5 17.6h5" {...stroke} />
      </>
    ),
  },
  {
    title: <>Live Agent<br />Activity</>,
    icon: (
      <>
        <path d="M12 3a9 9 0 1 0 9 9" {...stroke} />
        <path d={sparkle(12, 12, 4.2)} fill="currentColor" />
        <circle cx="19.2" cy="4.8" r="2.7" fill="currentColor" />
      </>
    ),
  },
  {
    title: <>Smart<br />Notifications</>,
    icon: (
      <>
        <path d="M6 9a6 6 0 0 1 9.2-5.1M18 9.5c.3 6.4 3 8.5 3 8.5H3s3-2 3-9" {...stroke} />
        <path d="M10.3 21a1.9 1.9 0 0 0 3.4 0" {...stroke} />
        <circle cx="18.6" cy="4.6" r="2.7" fill="currentColor" />
      </>
    ),
  },
  {
    title: <>Focus<br />Sessions</>,
    icon: (
      <>
        <path d="M20 14.5A8.5 8.5 0 1 1 9.5 4a7 7 0 0 0 10.5 10.5Z" {...stroke} />
        <path d={sparkle(18, 5, 2.6)} fill="currentColor" />
      </>
    ),
  },
  {
    title: <>Quick<br />Capture</>,
    icon: (
      <path
        d="M15 6v12a3 3 0 1 0 3-3H6a3 3 0 1 0 3 3V6a3 3 0 1 0-3 3h12a3 3 0 1 0-3-3"
        {...stroke}
      />
    ),
  },
  {
    title: (
      <>
        Blazing fast
        <br />
        <span className="relative inline-block">
          native app
          <svg
            viewBox="0 0 180 60"
            fill="none"
            preserveAspectRatio="none"
            className="pointer-events-none absolute -inset-x-[14px] -inset-y-[10px] h-[calc(100%+20px)] w-[calc(100%+28px)] text-[#b47cf2]"
            aria-hidden="true"
          >
            <path
              d="M24 34C14 18 112 2 168 20c16 6 12 26-30 32-46 6-118 2-130-14C2 26 40 10 96 9"
              stroke="currentColor"
              strokeWidth="2.6"
              strokeLinecap="round"
            />
          </svg>
        </span>
      </>
    ),
    icon: (
      <>
        <path d="M13.5 2 5 13.5h6.5L10 22l9-12.2h-6.6L13.5 2Z" fill="currentColor" />
        <path d="M6.2 1.5 3.6 5.4h2.6L5.2 8.6" {...stroke} strokeWidth={1.8} />
      </>
    ),
  },
];

export default function ProudFeatures() {
  return (
    <section id="features" className="flex flex-col items-center px-4 pt-24 md:pt-32">
      <ul className="grid w-full max-w-[1040px] grid-cols-2 gap-x-6 gap-y-14 md:grid-cols-4 md:gap-y-[60px]">
        {features.map((f, i) => (
          <li key={i} data-reveal={(i % 4) * 90} className="flex flex-col items-center text-center text-[#1c1c1e]">
            <svg viewBox="0 0 24 24" className="h-14 w-14 md:h-16 md:w-16" aria-hidden="true">
              {f.icon}
            </svg>
            <h3 className="mt-6 text-[22px] font-bold leading-[1.25] tracking-[-0.02em] md:mt-8 md:text-[28px]">
              {f.title}
            </h3>
          </li>
        ))}
      </ul>

      <div data-reveal="0" className="flex flex-col items-center">
        <a
          href="/download"
          className="mt-20 group flex items-center rounded-[14px] bg-[#1c1c1e] px-6 py-[17px] text-[18px] font-semibold text-white shadow-[0_14px_30px_-8px_rgba(28,28,30,0.45)] transition-transform hover:-translate-y-0.5 md:mt-24"
        >
          <DownloadMacLabel />
        </a>
        <p className="mt-8 flex items-center gap-2 text-[14px] font-semibold text-[#83838f]">
          <svg viewBox="0 0 32 32" className="h-[18px] w-[18px]" aria-hidden="true">
            <defs>
              <clipPath id="finder-clip">
                <rect width="32" height="32" rx="7.5" />
              </clipPath>
            </defs>
            <g clipPath="url(#finder-clip)">
              <rect width="32" height="32" fill="#c9c9d1" />
              <path d="M0 0h18.5c-2.3 5.2-3.6 10.6-3.6 17.2h3.4c-.2 5.3.3 10.2 1.6 14.8H0Z" fill="#b3b3be" />
            </g>
            <path d="M10 9.5v3.2M23 9.5v3.2" stroke="#f4f4f6" strokeWidth="1.8" strokeLinecap="round" />
            <path d="M7.5 21.5c5.3 4 11.7 4 17 0" stroke="#f4f4f6" strokeWidth="1.8" strokeLinecap="round" fill="none" />
          </svg>
          macOS 15 or later
        </p>
      </div>
    </section>
  );
}
