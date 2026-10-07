type IconProps = { className?: string };

export function AppleLogo({ className }: IconProps) {
  return (
    <svg viewBox="0 0 814 1000" fill="currentColor" className={className} aria-hidden="true">
      <path d="M788.1 340.9c-5.8 4.5-108.2 62.2-108.2 190.5 0 148.4 130.3 200.9 134.2 202.2-.6 3.2-20.7 71.9-68.7 141.9-42.8 61.6-87.5 123.1-155.5 123.1s-85.5-39.5-164-39.5c-76.5 0-103.7 40.8-165.9 40.8s-105.6-57-155.5-127C46.7 790.7 0 663 0 541.8c0-194.4 126.4-297.5 250.8-297.5 66.1 0 121.2 43.4 162.7 43.4 39.5 0 101.1-46 176.3-46 28.5 0 130.9 2.6 198.3 99.2zm-234-181.5c31.1-36.9 53.1-88.1 53.1-139.3 0-7.1-.6-14.3-1.9-20.1-50.6 1.9-110.8 33.7-147.1 75.8-28.5 32.4-55.1 83.6-55.1 135.5 0 7.8 1.3 15.6 1.9 18.1 3.2.6 8.4 1.3 13.6 1.3 45.4 0 102.5-30.4 135.5-71.3z" />
    </svg>
  );
}

// The lines are cut out of the bubble with a mask so they can be written in
// when a parent with `group/faqs` is hovered.
export function ChatIcon({ className, id = "chat-icon" }: IconProps & { id?: string }) {
  const line = (offset: number) => ({
    className:
      "[transform-box:fill-box] origin-left group-hover/faqs:animate-[changelog-write_0.45s_cubic-bezier(0.22,1,0.36,1)_both]",
    style: { animationDelay: `${offset}ms` },
  });
  const bubble =
    "M5 3h14a3 3 0 0 1 3 3v9a3 3 0 0 1-3 3h-7.2l-4.6 3.6A1 1 0 0 1 5.6 21v-3H5a3 3 0 0 1-3-3V6a3 3 0 0 1 3-3Z";

  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <mask id={id}>
        <path d={bubble} fill="white" />
        <g fill="black">
          <rect x="6.25" y="8.25" width="11.5" height="1.5" rx="0.75" {...line(0)} />
          <rect x="6.25" y="11.75" width="7.5" height="1.5" rx="0.75" {...line(120)} />
        </g>
      </mask>
      <path d={bubble} mask={`url(#${id})`} />
    </svg>
  );
}

export function ChangelogIcon({
  className,
  id = "changelog-icon",
  play,
  delay = 0,
}: IconProps & { id?: string; play?: "hover" | "load"; delay?: number }) {
  const animation =
    play === "hover"
      ? "group-hover/changelog:animate-[changelog-write_0.45s_cubic-bezier(0.22,1,0.36,1)_both]"
      : play === "load"
        ? "animate-[changelog-write_0.6s_cubic-bezier(0.22,1,0.36,1)_both]"
        : "";
  const line = (offset: number) => ({
    className: `[transform-box:fill-box] origin-left ${animation}`,
    style: { animationDelay: `${delay + offset}ms` },
  });

  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <mask id={id}>
        <rect x="4" y="2" width="16" height="20" rx="3" fill="white" />
        <g fill="black">
          <circle cx="8.5" cy="7.5" r="1" {...line(0)} />
          <rect x="10.75" y="6.75" width="5.5" height="1.5" rx="0.75" {...line(60)} />
          <circle cx="8.5" cy="11.5" r="1" {...line(140)} />
          <rect x="10.75" y="10.75" width="5.5" height="1.5" rx="0.75" {...line(200)} />
          <rect x="7.25" y="15.75" width="9" height="1.5" rx="0.75" {...line(280)} />
        </g>
      </mask>
      <rect x="4" y="2" width="16" height="20" rx="3" mask={`url(#${id})`} />
    </svg>
  );
}

export function BadgeCheckIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M10.6 1.9a2 2 0 0 1 2.8 0l1.4 1.3 1.9-.3a2 2 0 0 1 2.3 1.6l.3 1.9 1.7.9a2 2 0 0 1 .9 2.7l-.8 1.7.8 1.7a2 2 0 0 1-.9 2.7l-1.7.9-.3 1.9a2 2 0 0 1-2.3 1.6l-1.9-.3-1.4 1.3a2 2 0 0 1-2.8 0l-1.4-1.3-1.9.3a2 2 0 0 1-2.3-1.6l-.3-1.9-1.7-.9a2 2 0 0 1-.9-2.7l.8-1.7-.8-1.7a2 2 0 0 1 .9-2.7l1.7-.9.3-1.9a2 2 0 0 1 2.3-1.6l1.9.3 1.4-1.3Zm5 7.4a.9.9 0 0 0-1.3-1.2l-3.6 3.9-1.5-1.5a.9.9 0 1 0-1.3 1.3l2.2 2.1a.9.9 0 0 0 1.3 0l4.2-4.6Z" />
    </svg>
  );
}

export function LockIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M12 2a5 5 0 0 0-5 5v3H6a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8a2 2 0 0 0-2-2h-1V7a5 5 0 0 0-5-5Zm-3 8V7a3 3 0 1 1 6 0v3H9Z" />
    </svg>
  );
}

export function IdBadgeIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M6 2h12a2 2 0 0 1 2 2v16a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2Zm6 5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5Zm-4 10.5a.75.75 0 0 0 .75.75h6.5a.75.75 0 0 0 .75-.75c0-1.9-1.8-3.5-4-3.5s-4 1.6-4 3.5Z" />
    </svg>
  );
}

export function SunIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" className={className} aria-hidden="true">
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" />
    </svg>
  );
}
