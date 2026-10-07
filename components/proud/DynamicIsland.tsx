"use client";

import { useEffect, useState, type ReactNode } from "react";
import { LockIcon } from "./icons";

type Tab = "calendar" | "tasks" | "focus" | "chat" | "music" | "connections" | "notices";
type Agent = "jason" | "lucia" | "trevor" | "link";

const SONG_LENGTH = 5 * 60 + 56; // 5:56

const spring = "duration-500 ease-[cubic-bezier(0.32,0.72,0,1)]";

// Which agent sits next to each tab's panel (music has none and uses the full width).
const tabAgent: Record<Tab, Agent | null> = {
  calendar: "jason",
  tasks: "lucia",
  focus: "lucia",
  chat: "trevor",
  music: null,
  connections: "link",
  notices: "jason",
};

const capitalize = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);

// Proud's Dynamic Island inside the Mac mockup.
// Locked: small notch with a lock. Unlocked: compact now-playing. Expanded: the tabbed panel.
export default function DynamicIsland({
  now,
  unlocked,
  expanded,
  onExpand,
  onCollapse,
}: {
  now: Date | null;
  unlocked: boolean;
  expanded: boolean;
  onExpand: () => void;
  onCollapse: () => void;
}) {
  const [tab, setTab] = useState<Tab>("calendar");
  const [playing, setPlaying] = useState(true);
  const [elapsed, setElapsed] = useState(17);

  useEffect(() => {
    if (!playing) return;
    const id = setInterval(() => setElapsed((s) => (s >= SONG_LENGTH ? 0 : s + 1)), 1000);
    return () => clearInterval(id);
  }, [playing]);

  const size = expanded
    ? "top-0 h-[290px] w-[min(96%,760px)] rounded-b-[28px] rounded-t-none sm:h-[300px] sm:rounded-b-[36px]"
    : unlocked
      ? "top-3 h-8 w-[200px] cursor-pointer rounded-[10px] sm:top-5 sm:h-10 sm:w-[250px] sm:rounded-[12px]"
      : "top-3 h-8 w-[150px] rounded-[10px] sm:top-5 sm:h-10 sm:w-[186px] sm:rounded-[12px]";

  const agent = tabAgent[tab];

  return (
    <div
      onClick={(e) => {
        if (!unlocked) return; // let the click reach the screen and unlock it
        e.stopPropagation();
        if (!expanded) onExpand();
      }}
      className={`absolute left-1/2 z-20 -translate-x-1/2 overflow-hidden bg-black text-white shadow-[0_20px_50px_-15px_rgba(0,0,0,0.7)] transition-all ${spring} ${size}`}
    >
      {/* Compact */}
      <div
        className={`absolute inset-0 flex items-center justify-between px-3 transition-opacity duration-200 sm:px-4 ${
          expanded ? "pointer-events-none opacity-0" : "opacity-100 delay-200"
        }`}
      >
        <LockIcon
          className={`h-3.5 w-3.5 transition-all duration-500 ${unlocked ? "scale-50 opacity-0 blur-[3px]" : ""}`}
        />
        <div className={`absolute inset-0 flex items-center justify-between px-2 transition-opacity duration-500 sm:px-2.5 ${unlocked ? "opacity-100" : "opacity-0"}`}>
          <AlbumArt className="h-5 w-5 rounded-[5px] sm:h-6 sm:w-6 sm:rounded-[6px]" />
          <Waveform playing={playing} className="h-3.5 sm:h-4" />
        </div>
      </div>

      {/* Expanded */}
      <div
        className={`flex h-full w-[min(96vw,760px)] max-w-full flex-col px-3 pb-3 transition-opacity sm:px-4 sm:pb-4 ${
          expanded ? "opacity-100 delay-200 duration-300" : "pointer-events-none opacity-0 duration-100"
        }`}
      >
        <div className="flex items-center justify-between pt-2">
          <div className="flex items-center gap-0.5 sm:gap-1">
            {tabs.map((t) => (
              <button
                key={t.id}
                type="button"
                aria-label={t.label}
                onClick={() => setTab(t.id)}
                className={`flex h-8 w-9 items-center justify-center rounded-full transition-colors sm:w-11 ${
                  tab === t.id ? "bg-[#2a2a2c] text-white" : "text-white/75 hover:text-white"
                }`}
              >
                {t.icon}
              </button>
            ))}
          </div>
          <div className="flex items-center gap-1">
            <span className="hidden h-8 w-9 items-center justify-center text-white/75 sm:flex">
              <WindowIcon />
            </span>
            <button
              type="button"
              aria-label="Recolher"
              onClick={(e) => {
                e.stopPropagation();
                onCollapse();
              }}
              className="flex h-8 w-9 items-center justify-center rounded-full text-white/75 transition-colors hover:text-white"
            >
              <ChevronUpIcon />
            </button>
          </div>
        </div>

        <div className="mt-3 flex min-h-0 flex-1 gap-4 sm:mt-4 sm:gap-5">
          {agent && <AgentBadge agent={agent} />}
          <div className="min-w-0 flex-1 overflow-hidden rounded-[18px] border border-white/[0.06] bg-[#1c1c1e] p-4 sm:rounded-[24px] sm:p-5">
            {tab === "calendar" && <CalendarPanel now={now} />}
            {tab === "tasks" && (
              <TextPanel title="Hoje" subtitle="nada para hoje" action="Abrir Tarefas">
                Crie tarefas na página Tarefas ou no card Hoje do Dashboard.
              </TextPanel>
            )}
            {tab === "focus" && <FocusPanel />}
            {tab === "chat" && (
              <TextPanel title="Chat" subtitle="Gemini 3.8 Flash" action="Nova conversa" actionPrimary>
                Nenhuma conversa ainda.
              </TextPanel>
            )}
            {tab === "music" && (
              <MusicPanel playing={playing} elapsed={elapsed} onToggle={() => setPlaying((p) => !p)} />
            )}
            {tab === "connections" && <ConnectionsPanel />}
            {tab === "notices" && (
              <TextPanel title="Avisos">Nenhum aviso ainda. Concluir tarefas e pomodoros aparece aqui.</TextPanel>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ---------- Panels ---------- */

function TextPanel({
  title,
  subtitle,
  action,
  actionPrimary = false,
  children,
}: {
  title: string;
  subtitle?: string;
  action?: string;
  actionPrimary?: boolean;
  children: ReactNode;
}) {
  return (
    <div>
      <div className="flex items-start justify-between gap-3">
        <h3 className="flex flex-wrap items-baseline gap-x-2.5 text-[20px] font-bold tracking-[-0.02em] sm:text-[22px]">
          {title}
          {subtitle && <span className="text-[13px] font-medium tracking-normal text-white/55 sm:text-[14px]">{subtitle}</span>}
        </h3>
        {action && (
          <button
            type="button"
            className={`shrink-0 whitespace-nowrap rounded-full px-3 py-1.5 text-[12px] font-semibold transition-colors sm:px-3.5 sm:text-[13px] ${
              actionPrimary ? "bg-[#b9a4f7] text-white hover:bg-[#c5b3f9]" : "bg-[#2a2a2c] text-white/90 hover:bg-[#333336]"
            }`}
          >
            {action}
          </button>
        )}
      </div>
      <p className="mt-3 text-[13px] text-white/60 sm:text-[14px]">{children}</p>
    </div>
  );
}

function CalendarPanel({ now }: { now: Date | null }) {
  const [offset, setOffset] = useState(0);
  if (!now) return null;

  const time = now.toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit", hour12: false });
  const longDate = capitalize(now.toLocaleDateString("pt-BR", { weekday: "long", day: "numeric", month: "long" }));

  const first = new Date(now.getFullYear(), now.getMonth() + offset, 1);
  const monthLabel = capitalize(first.toLocaleDateString("pt-BR", { month: "long", year: "numeric" }));
  // Monday-first grid, 5 or 6 rows.
  const lead = (first.getDay() + 6) % 7;
  const daysInMonth = new Date(first.getFullYear(), first.getMonth() + 1, 0).getDate();
  const rows = Math.ceil((lead + daysInMonth) / 7);
  const cells = Array.from({ length: rows * 7 }, (_, i) => new Date(first.getFullYear(), first.getMonth(), i - lead + 1));

  return (
    <div className="flex h-full gap-5">
      <div className="hidden w-[38%] shrink-0 flex-col border-r border-white/10 pr-5 sm:flex">
        <p className="text-[48px] font-bold leading-none tracking-[-0.03em] tabular-nums">{time}</p>
        <p className="mt-2 text-[14px] font-medium text-white/60">{longDate}</p>
        <p className="mt-5 text-[14px] font-medium text-white/60">Nada na agenda hoje</p>
      </div>
      <div className="min-w-0 flex-1">
        <div className="flex items-center justify-between">
          <p className="text-[15px] font-bold">{monthLabel}</p>
          <div className="flex items-center gap-3 text-white/80">
            <button type="button" aria-label="Mês anterior" onClick={() => setOffset((o) => o - 1)} className="hover:text-white">
              <ChevronIcon dir="left" />
            </button>
            <button type="button" aria-label="Próximo mês" onClick={() => setOffset((o) => o + 1)} className="hover:text-white">
              <ChevronIcon dir="right" />
            </button>
          </div>
        </div>
        <div className="mt-2 grid grid-cols-7 text-center text-[11px] font-semibold text-white/70">
          {["S", "T", "Q", "Q", "S", "S", "D"].map((d, i) => (
            <span key={i}>{d}</span>
          ))}
        </div>
        <div className="mt-1 grid grid-cols-7 gap-y-0.5 text-center text-[12px] font-semibold sm:text-[13px]">
          {cells.map((d) => {
            const inMonth = d.getMonth() === first.getMonth();
            const today = d.toDateString() === now.toDateString();
            return (
              <span
                key={d.toISOString()}
                className={`mx-auto flex h-[22px] w-8 items-center justify-center rounded-[7px] ${
                  today ? "bg-white text-black" : inMonth ? "text-white" : "text-white/30"
                }`}
              >
                {d.getDate()}
              </span>
            );
          })}
        </div>
      </div>
    </div>
  );
}

const focusModes = { Foco: 25 * 60, Pausa: 5 * 60, Longa: 15 * 60 } as const;
type FocusMode = keyof typeof focusModes;

function FocusPanel() {
  const [mode, setMode] = useState<FocusMode>("Foco");
  const [left, setLeft] = useState<number>(focusModes.Foco);
  const [running, setRunning] = useState(false);

  useEffect(() => {
    if (!running) return;
    const id = setInterval(() => setLeft((s) => Math.max(0, s - 1)), 1000);
    return () => clearInterval(id);
  }, [running]);

  useEffect(() => {
    if (left === 0) setRunning(false);
  }, [left]);

  const pick = (m: FocusMode) => {
    setMode(m);
    setLeft(focusModes[m]);
    setRunning(false);
  };

  const total = focusModes[mode];
  const r = 30;
  const c = 2 * Math.PI * r;
  const progress = Math.max(((total - left) / total) * c, 0.01);
  const mm = String(Math.floor(left / 60)).padStart(2, "0");
  const ss = String(left % 60).padStart(2, "0");

  return (
    <div className="flex h-full flex-col justify-between sm:justify-start">
      <div className="flex items-center gap-4">
        <div className="relative h-[64px] w-[64px] shrink-0 sm:h-[72px] sm:w-[72px]">
          <svg viewBox="0 0 72 72" className="h-full w-full -rotate-90" aria-hidden="true">
            <circle cx="36" cy="36" r={r} fill="none" stroke="#4a3418" strokeWidth="4" />
            <circle
              cx="36"
              cy="36"
              r={r}
              fill="none"
              stroke="#f5a23c"
              strokeWidth="4"
              strokeLinecap="round"
              strokeDasharray={`${progress} ${c}`}
              className="transition-[stroke-dasharray] duration-1000 ease-linear"
            />
          </svg>
          <TimerIcon className="absolute inset-0 m-auto h-6 w-6 text-[#f5a23c]" />
        </div>
        <div className="min-w-0">
          <p className="text-[15px] font-bold text-[#f5a23c]">{mode}</p>
          <p className="text-[13px] font-semibold sm:text-[15px]">Ciclo 1 de 4 · 0 pomodoros hoje</p>
        </div>
        <p className="ml-auto hidden text-[56px] font-bold leading-none tracking-[-0.03em] text-[#f5a23c] tabular-nums sm:block">
          {mm}:{ss}
        </p>
      </div>
      <div className="mt-4 flex items-center gap-2">
        <button
          type="button"
          aria-label={running ? "Pausar" : "Iniciar"}
          onClick={() => setRunning((v) => !v)}
          className="flex h-10 w-10 items-center justify-center rounded-full bg-[#2a2a2c] text-[#f5a23c] transition-colors hover:bg-[#333336]"
        >
          {running ? <PauseIcon className="h-4 w-4" /> : <PlayIcon className="h-4 w-4" />}
        </button>
        <button
          type="button"
          aria-label="Pular"
          onClick={() => pick(mode === "Foco" ? "Pausa" : "Foco")}
          className="flex h-10 w-10 items-center justify-center rounded-full bg-[#2a2a2c] transition-colors hover:bg-[#333336]"
        >
          <SkipIcon className="h-4 w-4" />
        </button>
        <p className="ml-2 text-[28px] font-bold leading-none text-[#f5a23c] tabular-nums sm:hidden">
          {mm}:{ss}
        </p>
        <div className="ml-auto hidden items-center gap-1 sm:flex">
          {(Object.keys(focusModes) as FocusMode[]).map((m) => (
            <button
              key={m}
              type="button"
              onClick={() => pick(m)}
              className={`rounded-full px-3.5 py-1.5 text-[13px] font-semibold transition-colors ${
                mode === m ? "bg-[#2a2a2c] text-white" : "text-white/55 hover:text-white"
              }`}
            >
              {m}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

function MusicPanel({ playing, elapsed, onToggle }: { playing: boolean; elapsed: number; onToggle: () => void }) {
  const fmt = (s: number) => `${Math.floor(s / 60)}:${String(s % 60).padStart(2, "0")}`;
  return (
    <div className="flex h-full flex-col justify-center">
      <div className="flex items-center gap-4">
        <AlbumArt className="h-[60px] w-[60px] shrink-0 rounded-[12px] sm:h-[72px] sm:w-[72px] sm:rounded-[14px]" />
        <div className="min-w-0 flex-1">
          <p className="truncate text-[16px] font-bold sm:text-[18px]">Aprender A Lidar</p>
          <p className="truncate text-[14px] font-medium text-white/55 sm:text-[15px]">Mc Iguinho Ct</p>
          <p className="mt-0.5 flex items-center gap-1.5 text-[12px] font-medium text-white/45">
            <BroadcastIcon className="h-3.5 w-3.5" />
            Spotify
          </p>
        </div>
        <Waveform playing={playing} className="h-6" />
      </div>
      <div className="mt-4 flex items-center gap-3 text-[11px] font-semibold text-white/60 tabular-nums">
        <span className="w-7">{fmt(elapsed)}</span>
        <div className="h-1 flex-1 overflow-hidden rounded-full bg-white/15">
          <div className="h-full rounded-full bg-white/70 transition-[width] duration-1000 ease-linear" style={{ width: `${(elapsed / SONG_LENGTH) * 100}%` }} />
        </div>
        <span className="w-9 text-right">-{fmt(SONG_LENGTH - elapsed)}</span>
      </div>
      <div className="mt-3 flex items-center justify-center gap-10">
        <RewindIcon className="h-5 w-5" />
        <button type="button" aria-label={playing ? "Pausar" : "Tocar"} onClick={onToggle}>
          {playing ? <PauseIcon className="h-6 w-6" /> : <PlayIcon className="h-6 w-6" />}
        </button>
        <RewindIcon className="h-5 w-5 rotate-180" />
      </div>
    </div>
  );
}

function ConnectionsPanel() {
  return (
    <div>
      <div className="flex items-start justify-between gap-3">
        <h3 className="flex flex-wrap items-baseline gap-x-2.5 text-[20px] font-bold tracking-[-0.02em] sm:text-[22px]">
          Conexões
          <span className="text-[13px] font-medium tracking-normal text-white/55 sm:text-[14px]">2 de 14 conectadas</span>
        </h3>
        <button type="button" className="shrink-0 rounded-full bg-[#2a2a2c] px-3.5 py-1.5 text-[12px] font-semibold text-white/90 transition-colors hover:bg-[#333336] sm:text-[13px]">
          Gerenciar
        </button>
      </div>
      <div className="mt-4 grid grid-cols-7 gap-x-2 gap-y-3 sm:gap-x-4">
        {connections.map((c) => (
          <span
            key={c.name}
            title={c.name}
            className={`mx-auto flex h-8 w-8 items-center justify-center rounded-[9px] sm:h-10 sm:w-10 sm:rounded-[11px] ${
              c.on === "spotify"
                ? "bg-[#1ed760] text-black"
                : c.on === "github"
                  ? "border border-white/15 bg-[#161b22] text-white"
                  : "bg-[#2e2e30] text-white/35"
            }`}
          >
            <svg viewBox="0 0 24 24" className="h-[18px] w-[18px] sm:h-5 sm:w-5" aria-hidden="true">
              {c.glyph}
            </svg>
          </span>
        ))}
      </div>
    </div>
  );
}

const glyphStroke = { fill: "none", stroke: "currentColor", strokeWidth: 2, strokeLinecap: "round" as const, strokeLinejoin: "round" as const };

// Simplified glyphs for the connection tiles.
const connections: { name: string; on?: "github" | "spotify"; glyph: ReactNode }[] = [
  { name: "Google Calendar", glyph: <><rect x="4" y="4" width="16" height="16" rx="3" {...glyphStroke} /><text x="12" y="16" textAnchor="middle" fontSize="8" fontWeight="700" fill="currentColor">31</text></> },
  { name: "Gmail", glyph: <path d="M4 18V7l8 6 8-6v11" {...glyphStroke} strokeWidth={2.6} /> },
  { name: "Google Drive", glyph: <path d="M9 4h6l6 10-3 5H6l-3-5 6-10Zm0 0 6 10H3m12-10L9 19" {...glyphStroke} /> },
  { name: "GitHub", on: "github", glyph: <path d="M12 3a9 9 0 0 0-2.8 17.5c.4.1.6-.2.6-.4v-1.6c-2.5.5-3-1.1-3-1.1-.4-1-1-1.3-1-1.3-.8-.6.1-.6.1-.6.9.1 1.4 1 1.4 1 .8 1.4 2.2 1 2.7.8.1-.6.3-1 .6-1.2-2-.2-4.1-1-4.1-4.4 0-1 .4-1.8.9-2.4-.1-.2-.4-1.1.1-2.4 0 0 .8-.2 2.5.9a8.6 8.6 0 0 1 4.5 0c1.7-1.1 2.5-.9 2.5-.9.5 1.3.2 2.2.1 2.4.6.6.9 1.4.9 2.4 0 3.4-2.1 4.2-4.1 4.4.3.3.6.8.6 1.6v2.4c0 .2.2.5.6.4A9 9 0 0 0 12 3Z" fill="currentColor" /> },
  { name: "Notion", glyph: <><rect x="4" y="4" width="16" height="16" rx="2.5" {...glyphStroke} /><path d="M9 16V8l6 8V8" {...glyphStroke} /></> },
  { name: "Obsidian", glyph: <path d="M10 3 6 10l2 8 5 3 4-5-1-7-6-6Z" fill="currentColor" /> },
  { name: "Todoist", glyph: <path d="M5 8.5 12 12l7-3.5M5 12.5 12 16l7-3.5M5 16.5 12 20l7-3.5M5 4.5h14" {...glyphStroke} /> },
  { name: "Linear", glyph: <><circle cx="12" cy="12" r="8" fill="currentColor" /><path d="m6 10 8 8M5 13.5l5.5 5.5M7.5 7.5l9 9" stroke="#2e2e30" strokeWidth="1.3" /></> },
  { name: "Slack", glyph: <path d="M9.5 4v16M14.5 4v16M4 9.5h16M4 14.5h16" {...glyphStroke} strokeWidth={2.4} /> },
  { name: "Discord", glyph: <><path d="M6 7c4-2 8-2 12 0 1.5 3 2 6 1.7 9.5-1.5 1.2-3 1.8-4.2 2.1l-1-1.8a10 10 0 0 1-5 0l-1 1.8c-1.2-.3-2.7-.9-4.2-2.1C4 13 4.5 10 6 7Z" fill="currentColor" /><circle cx="9.5" cy="12.5" r="1.4" fill="#2e2e30" /><circle cx="14.5" cy="12.5" r="1.4" fill="#2e2e30" /></> },
  { name: "WhatsApp", glyph: <><path d="M4.5 19.5 5.6 16A8 8 0 1 1 8.4 18.6Z" {...glyphStroke} /><path d="M9 9c0 3 2.5 5.8 5.8 6l1-1.4-1.8-1-1 .8c-1-.4-2-1.4-2.4-2.4l.8-1-1-1.8L9 9Z" fill="currentColor" /></> },
  { name: "Figma", glyph: <path d="M12 3H9.5a2.5 2.5 0 0 0 0 5H12m0-5h2.5a2.5 2.5 0 0 1 0 5H12m0-5v15.5a2.5 2.5 0 1 1-2.5-2.5H12m0-8H9.5a2.5 2.5 0 0 0 0 5H12m0-5a2.5 2.5 0 1 1 0 5" {...glyphStroke} strokeWidth={1.6} /> },
  { name: "Spotify", on: "spotify", glyph: <><circle cx="12" cy="12" r="9" fill="black" /><path d="M7 9.5c3.5-1 7-.6 10 1M7.8 12.6c2.8-.8 5.6-.4 8 .9M8.5 15.5c2.2-.5 4.3-.2 6 .7" stroke="#1ed760" strokeWidth="1.6" strokeLinecap="round" fill="none" /></> },
  { name: "Nubank", glyph: <path d="M4 16V9.5a2.5 2.5 0 0 1 5 0V16M13 8v5.5a2.5 2.5 0 0 0 5 0V8" {...glyphStroke} strokeWidth={2.2} /> },
];

/* ---------- Agents ---------- */

// Avatars are cropped from the app's own screenshots (public/agents).
const agents: Record<Agent, { name: string; role: string }> = {
  jason: { name: "Jason", role: "Gerente de projetos" },
  lucia: { name: "Lucia", role: "Analista de tasks" },
  trevor: { name: "Trevor", role: "Engenheiro de Software" },
  link: { name: "Link", role: "Analista de operações" },
};

function AgentBadge({ agent }: { agent: Agent }) {
  const a = agents[agent];
  return (
    <div className="hidden w-[110px] shrink-0 flex-col items-center pt-6 text-center sm:flex">
      <img
        src={`/agents/${agent}.png`}
        alt=""
        width={66}
        height={66}
        draggable={false}
        className="h-[66px] w-[66px] rounded-full border border-white/10"
      />
      <p className="mt-2.5 text-[15px] font-bold">{a.name}</p>
      <p className="mt-0.5 text-[12px] font-medium leading-[1.3] text-white/60">{a.role}</p>
    </div>
  );
}

/* ---------- Small pieces ---------- */

function AlbumArt({ className = "" }: { className?: string }) {
  return <img src="/album-art.jpg" alt="" draggable={false} className={`block object-cover ${className}`} />;
}

function Waveform({ playing, className = "" }: { playing: boolean; className?: string }) {
  const bars = [0.45, 0.8, 1, 0.7];
  return (
    <span className={`flex items-center gap-[3px] ${className}`} aria-hidden="true">
      {bars.map((h, i) => (
        <span
          key={i}
          className="w-[3px] origin-center rounded-full bg-[#8fa8e0] sm:w-1"
          style={{
            height: `${h * 100}%`,
            animation: playing ? `island-wave 0.9s ease-in-out ${i * 0.13}s infinite` : "none",
            transform: playing ? undefined : "scaleY(0.4)",
          }}
        />
      ))}
    </span>
  );
}

const iconProps = { viewBox: "0 0 24 24", className: "h-[18px] w-[18px]", "aria-hidden": true } as const;

const tabs: { id: Tab; label: string; icon: ReactNode }[] = [
  {
    id: "calendar",
    label: "Calendário",
    icon: (
      <svg {...iconProps}>
        <rect x="3.5" y="4.5" width="17" height="15" rx="2.5" {...glyphStroke} strokeWidth={1.7} />
        <path d="M3.5 8.5h17" {...glyphStroke} strokeWidth={1.7} />
        <path d="M7.5 11.5h.01M10.5 11.5h.01M13.5 11.5h.01M16.5 11.5h.01M7.5 14.5h.01M10.5 14.5h.01M13.5 14.5h.01M16.5 14.5h.01M7.5 17h.01M10.5 17h.01" {...glyphStroke} strokeWidth={1.8} />
      </svg>
    ),
  },
  {
    id: "tasks",
    label: "Tarefas",
    icon: (
      <svg {...iconProps}>
        <path d="m4 6.5 1.5 1.5L8 5.2M12 6.5h8M12 16.5h8" {...glyphStroke} strokeWidth={1.7} />
        <circle cx="6" cy="16.5" r="2.2" {...glyphStroke} strokeWidth={1.7} />
      </svg>
    ),
  },
  { id: "focus", label: "Foco", icon: <TimerIcon className="h-[18px] w-[18px]" /> },
  {
    id: "chat",
    label: "Chat",
    icon: (
      <svg {...iconProps}>
        <path d="M5 4.5h14a2 2 0 0 1 2 2V15a2 2 0 0 1-2 2h-7l-4.5 3.5V17H5a2 2 0 0 1-2-2V6.5a2 2 0 0 1 2-2Z" {...glyphStroke} strokeWidth={1.7} />
      </svg>
    ),
  },
  {
    id: "music",
    label: "Música",
    icon: (
      <svg {...iconProps}>
        <path d="M10 18V5l6-1.5V7l-6 1.5" {...glyphStroke} strokeWidth={1.9} />
        <ellipse cx="7.5" cy="18" rx="2.5" ry="2.2" fill="currentColor" />
      </svg>
    ),
  },
  {
    id: "connections",
    label: "Conexões",
    icon: (
      <svg {...iconProps}>
        <path d="M2.5 12h4M9 7.5h5a4.5 4.5 0 0 1 0 9H9ZM18.5 9.5h3M18.5 14.5h3M6.5 9.5h2.5v5H6.5Z" {...glyphStroke} strokeWidth={1.7} />
      </svg>
    ),
  },
  {
    id: "notices",
    label: "Avisos",
    icon: (
      <svg {...iconProps}>
        <path d="M6 16V11a6 6 0 0 1 12 0v5l1.5 2h-15Z" {...glyphStroke} strokeWidth={1.7} />
        <path d="M10 20.5a2.2 2.2 0 0 0 4 0" {...glyphStroke} strokeWidth={1.7} />
      </svg>
    ),
  },
];

function TimerIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
      <path d="M12 3.5a8.5 8.5 0 1 1-6 2.5" {...glyphStroke} strokeWidth={2} />
      <path d="M12 3.5v3M8.5 9l3.5 3.5" {...glyphStroke} strokeWidth={2} />
    </svg>
  );
}

function WindowIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-[18px] w-[18px]" aria-hidden="true">
      <rect x="3" y="5" width="18" height="14" rx="2.5" {...glyphStroke} strokeWidth={1.7} />
      <path d="M6 8h.01M8 8h.01" {...glyphStroke} strokeWidth={1.5} />
    </svg>
  );
}

function ChevronUpIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-[18px] w-[18px]" aria-hidden="true">
      <path d="m6 15 6-6 6 6" {...glyphStroke} strokeWidth={1.9} />
    </svg>
  );
}

function ChevronIcon({ dir }: { dir: "left" | "right" }) {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4" aria-hidden="true">
      <path d={dir === "left" ? "m15 5-7 7 7 7" : "m9 5 7 7-7 7"} {...glyphStroke} strokeWidth={2} />
    </svg>
  );
}

function PlayIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden="true">
      <path d="M7 4.5v15l12.5-7.5Z" />
    </svg>
  );
}

function PauseIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden="true">
      <rect x="5.5" y="4" width="4.5" height="16" rx="1.2" />
      <rect x="14" y="4" width="4.5" height="16" rx="1.2" />
    </svg>
  );
}

function SkipIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden="true">
      <path d="M4.5 4.5v15L16 12Z" />
      <rect x="16.5" y="4.5" width="3" height="15" rx="1" />
    </svg>
  );
}

function RewindIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden="true">
      <path d="M12 6v12L3 12Zm9 0v12l-9-6Z" />
    </svg>
  );
}

function BroadcastIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
      <circle cx="12" cy="12" r="1.8" fill="currentColor" />
      <path d="M8.5 8.5a5 5 0 0 0 0 7M15.5 8.5a5 5 0 0 1 0 7M5.5 5.5a9.2 9.2 0 0 0 0 13M18.5 5.5a9.2 9.2 0 0 1 0 13" {...glyphStroke} strokeWidth={1.6} />
    </svg>
  );
}
