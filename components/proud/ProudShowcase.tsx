"use client";

import { useEffect, useRef, useState, type ReactNode, type RefObject } from "react";
import { AppleLogo, IdBadgeIcon, SunIcon } from "./icons";
import DynamicIsland from "./DynamicIsland";
import ProudApp from "./ProudApp";

function useNow() {
  const [now, setNow] = useState<Date | null>(null);
  useEffect(() => {
    setNow(new Date());
    const id = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(id);
  }, []);
  return now;
}

const ease = "transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]";

// Mac screen: starts on the lock screen; clicking it unlocks to the desktop (menu bar + dock).
// Clicking Proud in the dock opens the app window; clicking the island expands it.
export default function ProudShowcase() {
  const now = useNow();
  const [unlocked, setUnlocked] = useState(false);
  const [appOpen, setAppOpen] = useState(false);
  const [islandOpen, setIslandOpen] = useState(false);
  const screenRef = useRef<HTMLDivElement>(null);
  const proudIconRef = useRef<HTMLDivElement>(null);

  const date = now
    ? now.toLocaleDateString("en-GB", { weekday: "short", day: "numeric", month: "short" }).replace(" ", ", ")
    : " ";
  const time = now
    ? now.toLocaleTimeString("en-GB", { hour: "2-digit", minute: "2-digit", hour12: false })
    : " ";

  const toggle = () => {
    // A click outside the expanded island just collapses it.
    if (islandOpen) return setIslandOpen(false);
    if (unlocked) setAppOpen(false);
    setUnlocked(!unlocked);
  };

  return (
    <div data-reveal="400" className="relative mt-14 w-full max-w-[1215px] overflow-hidden rounded-[28px] bg-[#1d2a1c] sm:mt-20 md:rounded-[44px]">
      <div
        role="button"
        tabIndex={0}
        aria-label={unlocked ? "Lock the Mac" : "Unlock the Mac"}
        onClick={toggle}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            toggle();
          }
        }}
        ref={screenRef}
        className="relative aspect-[4/5] w-full cursor-pointer select-none sm:aspect-[16/10]"
      >
        <img
          src="/proud-wallpaper.jpg"
          alt=""
          className={`absolute inset-0 h-full w-full object-cover ${ease} ${unlocked ? "scale-100" : "scale-[1.06]"}`}
        />

        <MenuBar now={now} visible={unlocked} app={appOpen ? "Proud" : "Finder"} />

        <DynamicIsland
          now={now}
          unlocked={unlocked}
          expanded={islandOpen}
          onExpand={() => setIslandOpen(true)}
          onCollapse={() => setIslandOpen(false)}
        />

        {/* Lock screen */}
        <div
          className={`absolute inset-x-0 top-[12%] flex flex-col items-center sm:top-[15%] ${ease} ${
            unlocked ? "pointer-events-none -translate-y-10 opacity-0 blur-md" : ""
          }`}
        >
          <p className="text-[20px] font-semibold tracking-[-0.01em] text-white/85 sm:text-[28px]">{date}</p>
          <p className="mt-0 bg-gradient-to-b from-white to-white/75 bg-clip-text text-[72px] font-bold leading-none tracking-[-0.03em] text-transparent tabular-nums sm:text-[96px] md:text-[100px]">
            {time}
          </p>
          <div className="mt-6 flex items-center gap-6 text-[15px] font-semibold text-white/85 sm:mt-8 sm:text-[17px]">
            <span className="flex items-center gap-2">
              <IdBadgeIcon className="h-4 w-4" />
              Work
            </span>
            <span className="flex items-center gap-2">
              <SunIcon className="h-4 w-4" />
              24°
            </span>
          </div>
        </div>
        <p
          className={`absolute inset-x-0 bottom-[7%] text-center text-[13px] font-medium text-white/70 sm:text-[15px] ${ease} ${
            unlocked ? "translate-y-4 opacity-0" : "animate-pulse"
          }`}
        >
          Click to unlock
        </p>

        <AppWindow open={appOpen} onClose={() => setAppOpen(false)} screenRef={screenRef} iconRef={proudIconRef} />

        <Dock
          now={now}
          visible={unlocked}
          proudOpen={appOpen}
          proudIconRef={proudIconRef}
          onProudClick={() => setAppOpen((o) => !o)}
        />
      </div>
    </div>
  );
}

function MenuBar({ now, visible, app }: { now: Date | null; visible: boolean; app: string }) {
  const clock = now
    ? `${now.toLocaleDateString("en-GB", { weekday: "short", day: "numeric", month: "short" }).replace(",", "")}  ${now.toLocaleTimeString("en-GB", { hour: "2-digit", minute: "2-digit", hour12: false })}`
    : "";

  return (
    <div
      onClick={(e) => e.stopPropagation()}
      className={`absolute inset-x-0 top-0 flex h-7 cursor-default items-center justify-between px-3 text-[11px] font-medium text-white sm:h-9 sm:px-5 sm:text-[13px] ${ease} ${
        visible ? "translate-y-0 opacity-100" : "-translate-y-full opacity-0"
      }`}
    >
      <div className="flex items-center gap-3 sm:gap-5">
        <AppleLogo className="h-3 w-3 sm:h-[15px] sm:w-[15px]" />
        <span translate="no" className="notranslate font-bold">{app}</span>
        <span className="hidden md:inline">File</span>
        <span className="hidden md:inline">Edit</span>
        <span className="hidden md:inline">View</span>
        <span className="hidden md:inline">Window</span>
        <span className="hidden md:inline">Help</span>
      </div>
      <div className="flex items-center gap-3 sm:gap-4">
        <svg viewBox="0 0 24 24" className="hidden h-4 w-4 sm:block" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
          <path d="M2 9a15 15 0 0 1 20 0M5.5 12.5a10 10 0 0 1 13 0M9 16a5 5 0 0 1 6 0" />
          <circle cx="12" cy="19.5" r="1" fill="currentColor" />
        </svg>
        <svg viewBox="0 0 28 14" className="hidden h-3 w-6 sm:block" aria-hidden="true">
          <rect x="0.75" y="0.75" width="23" height="12.5" rx="3.5" fill="none" stroke="currentColor" strokeOpacity="0.5" strokeWidth="1.5" />
          <rect x="3" y="3" width="15" height="8" rx="1.8" fill="currentColor" />
          <path d="M25.5 5v4" stroke="currentColor" strokeOpacity="0.5" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
        <span className="tabular-nums">{clock}</span>
      </div>
    </div>
  );
}

function AppWindow({
  open,
  onClose,
  screenRef,
  iconRef,
}: {
  open: boolean;
  onClose: () => void;
  screenRef: RefObject<HTMLDivElement>;
  iconRef: RefObject<HTMLDivElement>;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [animating, setAnimating] = useState(false);
  const genie = useRef<{ frame: number; overlay: HTMLDivElement | null; p: number }>({ frame: 0, overlay: null, p: 1 });
  const first = useRef(true);

  // While closed, the app's controls shouldn't be focusable.
  useEffect(() => {
    if (ref.current) ref.current.inert = !open;
  }, [open]);

  // macOS "genie" minimize: p = 0 is the open window, p = 1 is fully sucked into the dock icon.
  useEffect(() => {
    if (first.current) {
      first.current = false;
      return;
    }
    const win = ref.current;
    const screen = screenRef.current;
    const icon = iconRef.current;
    const g = genie.current;
    cancelAnimationFrame(g.frame);
    g.overlay?.remove();
    g.overlay = null;
    if (!win || !screen || !icon || window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      g.p = open ? 0 : 1;
      setAnimating(false);
      return;
    }

    const s = screen.getBoundingClientRect();
    const w = win.getBoundingClientRect();
    const i = icon.getBoundingClientRect();
    const L = w.left - s.left;
    const T = w.top - s.top;
    const W = w.width;
    const H = w.height;
    const ix = i.left - s.left + i.width / 2;
    const iy = i.top - s.top + i.height * 0.35;
    const iw = i.width * 0.7;

    // Slice a snapshot of the window into horizontal strips; each strip is squeezed independently.
    const N = 28;
    const sh = H / N;
    const overlay = document.createElement("div");
    overlay.setAttribute("aria-hidden", "true");
    overlay.style.cssText = "position:absolute;inset:0;pointer-events:none;z-index:5";
    const snapshot = win.cloneNode(true) as HTMLDivElement;
    snapshot.removeAttribute("inert");
    snapshot.style.cssText = `position:absolute;left:0;width:${W}px;height:${H}px;margin:0;transform:none;transition:none;opacity:1;filter:none;visibility:visible;box-shadow:none`;
    const strips: HTMLDivElement[] = [];
    for (let k = 0; k < N; k++) {
      const strip = document.createElement("div");
      strip.style.cssText = `position:absolute;left:0;top:0;width:${W}px;height:${sh + 1}px;overflow:hidden;transform-origin:0 0;will-change:transform`;
      const c = snapshot.cloneNode(true) as HTMLDivElement;
      c.style.top = `${-k * sh}px`;
      strip.appendChild(c);
      overlay.appendChild(strip);
      strips.push(strip);
    }
    screen.appendChild(overlay);
    g.overlay = overlay;

    const smooth = (x: number) => {
      const t = Math.min(1, Math.max(0, x));
      return t * t * (3 - 2 * t);
    };
    // Funnel: how far a row at screen-y is pulled toward the icon's width (0 = full window, 1 = icon).
    const funnel = (y: number) => smooth((y - T) / (iy - T));
    const render = (p: number) => {
      const a = Math.min(1, p / 0.4); // phase 1: sides bend toward the icon
      const b = smooth((p - 0.4) / 0.6); // phase 2: window pours down into it
      const drop = b * (iy - T);
      for (let k = 0; k < N; k++) {
        const y0 = Math.min(T + k * sh + drop, iy);
        const y1 = Math.min(T + (k + 1) * sh + drop, iy);
        const f = a * funnel((y0 + y1) / 2);
        const left = L + (ix - iw / 2 - L) * f;
        const right = L + W + (ix + iw / 2 - L - W) * f;
        const st = strips[k].style;
        st.transform = `translate(${left}px, ${y0}px) scale(${(right - left) / W}, ${Math.max(0, y1 - y0) / sh})`;
        st.opacity = y1 - y0 < 0.5 ? "0" : "1";
      }
    };

    const from = g.p;
    const to = open ? 0 : 1;
    const duration = 620 * Math.abs(to - from);
    const ease = (t: number) => (t < 0.5 ? 2 * t * t : 1 - (-2 * t + 2) ** 2 / 2);
    const start = performance.now();
    setAnimating(true);
    render(from);
    const tick = (now: number) => {
      const t = duration ? Math.min(1, (now - start) / duration) : 1;
      g.p = from + (to - from) * ease(t);
      render(g.p);
      if (t < 1) {
        g.frame = requestAnimationFrame(tick);
      } else {
        overlay.remove();
        g.overlay = null;
        setAnimating(false);
      }
    };
    g.frame = requestAnimationFrame(tick);
  }, [open, screenRef, iconRef]);

  useEffect(() => {
    const g = genie.current;
    return () => {
      cancelAnimationFrame(g.frame);
      g.overlay?.remove();
    };
  }, []);

  return (
    <div
      onClick={(e) => e.stopPropagation()}
      // Keep typing inside the app from reaching the screen's Enter/Space unlock handler.
      onKeyDown={(e) => e.stopPropagation()}
      ref={ref}
      style={{ visibility: open && !animating ? "visible" : "hidden" }}
      className={`absolute left-1/2 top-[9%] w-[84%] -translate-x-1/2 cursor-default overflow-hidden rounded-[8px] border border-white/15 shadow-[0_30px_80px_-20px_rgba(0,0,0,0.7)] sm:rounded-[12px] ${
        open ? "" : "pointer-events-none"
      }`}
    >
      <ProudApp open={open} onClose={onClose} />
    </div>
  );
}

function Dock({
  now,
  visible,
  proudOpen,
  proudIconRef,
  onProudClick,
}: {
  now: Date | null;
  visible: boolean;
  proudOpen: boolean;
  proudIconRef: RefObject<HTMLDivElement>;
  onProudClick: () => void;
}) {
  const apps: { name: string; icon: ReactNode }[] = [
    { name: "Finder", icon: <AppIcon src="/dock/finder.png" /> },
    { name: "Safari", icon: <AppIcon src="/dock/safari.png" /> },
    { name: "Mail", icon: <AppIcon src="/dock/mail.png" /> },
    { name: "Calendar", icon: <CalendarIcon now={now} /> },
    { name: "Notes", icon: <AppIcon src="/dock/notes.png" /> },
    { name: "System Settings", icon: <AppIcon src="/dock/settings.png" /> },
    { name: "Proud", icon: <AppIcon src="/dock/proud.png" /> },
  ];

  return (
    <div
      onClick={(e) => e.stopPropagation()}
      className={`absolute bottom-2 left-1/2 flex -translate-x-1/2 cursor-default items-end gap-1 rounded-[16px] border border-white/25 bg-white/20 p-1 shadow-[0_10px_40px_-10px_rgba(0,0,0,0.5)] backdrop-blur-2xl sm:bottom-3 sm:gap-1.5 sm:rounded-[22px] sm:p-1.5 ${ease} delay-100 ${
        visible ? "translate-y-0 opacity-100" : "translate-y-[140%] opacity-0"
      }`}
    >
      {apps.map((app) => (
        <DockItem
          key={app.name}
          name={app.name}
          active={app.name === "Finder" || (app.name === "Proud" && proudOpen)}
          onClick={app.name === "Proud" ? onProudClick : undefined}
          iconRef={app.name === "Proud" ? proudIconRef : undefined}
        >
          {app.icon}
        </DockItem>
      ))}
      <span className="mx-0.5 h-[clamp(24px,3.6vw,48px)] w-px self-center bg-white/30 sm:mx-1" />
      <DockItem name="Trash">
        <AppIcon src="/dock/trash.png" />
      </DockItem>
    </div>
  );
}

function DockItem({
  name,
  active = false,
  onClick,
  iconRef,
  children,
}: {
  name: string;
  active?: boolean;
  onClick?: () => void;
  iconRef?: RefObject<HTMLDivElement>;
  children: ReactNode;
}) {
  return (
    <div
      onClick={onClick}
      className={`group/dock relative flex flex-col items-center ${onClick ? "cursor-pointer" : ""}`}
    >
      <span translate="no" className="notranslate pointer-events-none absolute -top-9 whitespace-nowrap rounded-md bg-black/50 px-2 py-0.5 text-[11px] font-medium text-white opacity-0 backdrop-blur-md transition-opacity group-hover/dock:opacity-100">
        {name}
      </span>
      <div ref={iconRef} className="h-[clamp(28px,4vw,52px)] w-[clamp(28px,4vw,52px)] origin-bottom transition-transform duration-200 ease-out group-hover/dock:-translate-y-1.5 group-hover/dock:scale-[1.25]">
        {children}
      </div>
      <span
        className={`absolute -bottom-[3px] h-[3px] w-[3px] rounded-full bg-white/90 transition-opacity sm:-bottom-[5px] sm:h-1 sm:w-1 ${
          active ? "opacity-100" : "opacity-0"
        }`}
      />
    </div>
  );
}

/* ---------- App icons ---------- */

// macOS app icons (exported from the system apps); they include the standard icon-grid padding.
function AppIcon({ src }: { src: string }) {
  return <img src={src} alt="" draggable={false} className="h-full w-full scale-[1.18] object-contain" />;
}

// Calendar shows today's date like the real dock icon, so it is drawn instead of exported.
// Sized on the same 256 grid as the exported icons.
function CalendarIcon({ now }: { now: Date | null }) {
  const weekday = now ? now.toLocaleDateString("en-GB", { weekday: "short" }) : "";
  const day = now ? now.getDate() : "";
  return (
    <svg viewBox="0 0 256 256" className="h-full w-full scale-[1.18]" aria-hidden="true">
      <defs>
        <linearGradient id="dock-calendar" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#ffffff" />
          <stop offset="1" stopColor="#ececec" />
        </linearGradient>
      </defs>
      <rect x="24" y="26" width="208" height="208" rx="46" fill="black" opacity="0.18" />
      <rect x="24" y="22" width="208" height="208" rx="46" fill="url(#dock-calendar)" />
      <text x="128" y="82" textAnchor="middle" fontSize="40" fontWeight="600" fill="#ff3b30" fontFamily="-apple-system, BlinkMacSystemFont, Inter, sans-serif">
        {weekday}
      </text>
      <text x="128" y="196" textAnchor="middle" fontSize="124" fontWeight="300" fill="#1c1c1e" fontFamily="-apple-system, BlinkMacSystemFont, Inter, sans-serif">
        {day}
      </text>
    </svg>
  );
}
