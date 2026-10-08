"use client";

import { useEffect, useLayoutEffect, useMemo, useRef, useState, type ReactNode } from "react";

// Live recreation of the Proud dashboard (replaces the old /proud-app.jpg screenshot).
// It is laid out at the app's real logical size and scaled to fit the window, so it
// keeps the native proportions at any width.
const W = 1456;
const H = 824;

const mono = { fontFamily: '"SF Mono", "JetBrains Mono", ui-monospace, Menlo, monospace' };
const accent = "#a48cf5";

type Task = { id: number; title: string; time?: string; done: boolean; flagged?: boolean };
type Nav = (typeof NAV)[number]["items"][number]["name"];

const NAV = [
  {
    label: "Principal",
    items: [
      { name: "Dashboard", icon: "dashboard" },
      { name: "Calendário", icon: "calendar" },
      { name: "Chat", icon: "chat" },
      { name: "Conexões", icon: "plug" },
    ],
  },
  {
    label: "Organização",
    items: [
      { name: "Tarefas", icon: "tasks" },
      { name: "Estudos", icon: "cap" },
      { name: "Finanças", icon: "wallet" },
      { name: "Metas", icon: "target" },
      { name: "Conquistas", icon: "trophy" },
    ],
  },
  {
    label: "Ferramentas",
    items: [
      { name: "GitHub", icon: "code" },
      { name: "Terminal", icon: "terminal" },
    ],
  },
] as const;

const NAV_ICON = Object.fromEntries(
  NAV.flatMap((g) => g.items.map((i): [string, string] => [i.name, i.icon])),
) as Record<Nav, string>;

const SEED: Task[] = [
  { id: 1, title: "Revisar o pull request do dock", time: "10:00", done: true },
  { id: 2, title: "Lista de limites de Cálculo", time: "14:00", done: false, flagged: true },
  { id: 3, title: "Treino de perna", time: "18:30", done: false },
];

function useScale() {
  const ref = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(0);
  useLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;
    const ro = new ResizeObserver(([entry]) => setScale(entry.contentRect.width / W));
    ro.observe(el);
    return () => ro.disconnect();
  }, []);
  return { ref, scale };
}

function useNow() {
  const [now, setNow] = useState<Date | null>(null);
  useEffect(() => {
    setNow(new Date());
    const id = setInterval(() => setNow(new Date()), 30_000);
    return () => clearInterval(id);
  }, []);
  return now;
}

const cap = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);

export default function ProudApp({ open, onClose }: { open: boolean; onClose: () => void }) {
  const { ref, scale } = useScale();
  const now = useNow();
  const [nav, setNav] = useState<Nav>("Dashboard");
  const [sidebar, setSidebar] = useState(true);
  const [tasks, setTasks] = useState<Task[]>(SEED);
  const [weekDone, setWeekDone] = useState(false);
  const searchRef = useRef<HTMLInputElement>(null);

  // ⌘K focuses search, like the real app.
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setSidebar(true);
        searchRef.current?.focus();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const pending = tasks.filter((t) => !t.done);
  const toggle = (id: number) => setTasks((ts) => ts.map((t) => (t.id === id ? { ...t, done: !t.done } : t)));
  const remove = (id: number) => setTasks((ts) => ts.filter((t) => t.id !== id));
  const add = (title: string) =>
    setTasks((ts) => [...ts, { id: Date.now(), title, done: false }]);

  const date = now
    ? `${cap(now.toLocaleDateString("pt-BR", { weekday: "long" }))}, ${now.getDate()} de ${cap(
        now.toLocaleDateString("pt-BR", { month: "long" }),
      )}`
    : " ";
  const hour = now?.getHours() ?? 9;
  const hello = hour < 12 ? "Bom dia" : hour < 18 ? "Boa tarde" : "Boa noite";

  return (
    <div ref={ref} className="relative aspect-[2912/1648] w-full overflow-hidden bg-[#0b0b0c]">
      <div
        className="absolute left-0 top-0 flex text-[#ececec] antialiased"
        style={{ ...mono, width: W, height: H, transform: `scale(${scale})`, transformOrigin: "0 0" }}
      >
        {/* Traffic lights */}
        <div className="absolute left-[11px] top-[14px] z-20 flex gap-[9px]">
          <button type="button" aria-label="Fechar Proud" onClick={onClose} className="group h-[13px] w-[13px] rounded-full bg-[#ff5f57]">
            <span className="block text-center text-[10px] font-bold leading-[13px] text-black/60 opacity-0 group-hover:opacity-100">×</span>
          </button>
          <span className="h-[13px] w-[13px] rounded-full bg-[#febc2e]" />
          <span className="h-[13px] w-[13px] rounded-full bg-[#28c840]" />
        </div>

        {/* Sidebar */}
        <aside
          className={`relative flex shrink-0 flex-col overflow-hidden rounded-r-[14px] border-r border-white/[0.08] bg-[#111112] transition-[width] duration-300 ${
            sidebar ? "w-[228px]" : "w-[74px]"
          }`}
        >
          <button
            type="button"
            aria-label="Alternar barra lateral"
            onClick={() => setSidebar((s) => !s)}
            className={`absolute top-[9px] z-20 grid h-[24px] w-[24px] place-items-center rounded-md text-white/60 hover:bg-white/10 hover:text-white ${
              sidebar ? "right-[10px]" : "left-[25px] top-[34px]"
            }`}
          >
            <Icon name="panel" className="h-[17px] w-[17px]" />
          </button>

          <div className={`w-[228px] px-[8px] pt-[64px] ${sidebar ? "" : "pointer-events-none opacity-0"} transition-opacity`}>
            <div className="flex items-center gap-[9px] px-[8px]">
              <img src="/proud-logo.png" alt="" className="h-[24px] w-[24px]" draggable={false} />
              <span className="text-[18px] font-bold tracking-[-0.01em]" style={{ fontFamily: "Inter, sans-serif" }}>
                Proud
              </span>
            </div>

            <label className="mt-[12px] flex h-[28px] items-center gap-[7px] rounded-[7px] border border-white/[0.09] bg-white/[0.03] px-[9px] text-[12px] text-white/70 focus-within:border-[#a48cf5]/60">
              <Icon name="search" className="h-[12px] w-[12px] shrink-0" />
              <input
                ref={searchRef}
                placeholder="Buscar"
                className="min-w-0 flex-1 bg-transparent text-white placeholder:text-white/70 focus:outline-none"
              />
              <kbd className="rounded-[4px] border border-white/10 px-[4px] text-[9px] text-white/50">⌘ + K</kbd>
            </label>

            <nav className="mt-[14px]">
              {NAV.map((group) => (
                <div key={group.label} className="mb-[10px]">
                  <p className="px-[8px] pb-[6px] text-[10.5px] uppercase tracking-[0.08em] text-white/45">{group.label}</p>
                  {group.items.map((item) => {
                    const active = nav === item.name;
                    const badge = item.name === "Tarefas" && pending.length ? pending.length : null;
                    return (
                      <button
                        key={item.name}
                        type="button"
                        onClick={() => setNav(item.name)}
                        className={`flex h-[30px] w-full items-center gap-[12px] rounded-[7px] px-[8px] text-left text-[14px] transition-colors ${
                          active ? "bg-white/[0.07] text-white" : "text-white/85 hover:bg-white/[0.04]"
                        }`}
                      >
                        <Icon name={item.icon} className={`h-[16px] w-[16px] ${active ? "text-[#a48cf5]" : "text-white/50"}`} />
                        <span className="flex-1">{item.name}</span>
                        {badge && <span className="text-[10px] text-white/45">{badge}</span>}
                      </button>
                    );
                  })}
                </div>
              ))}
            </nav>

            <p className="px-[8px] pb-[6px] text-[10.5px] uppercase tracking-[0.08em] text-white/45">Hoje</p>
            <ul className="space-y-[3px] px-[8px]">
              {pending.slice(0, 4).map((t) => (
                <li key={t.id} className="flex items-center gap-[8px] text-[11px] text-white/60">
                  <Check done={false} onClick={() => toggle(t.id)} size={11} />
                  <span className="flex-1 truncate">{t.title}</span>
                  {t.time && <span className="tabular-nums">{t.time}</span>}
                </li>
              ))}
            </ul>
          </div>

          <div
            className={`mt-auto flex h-[62px] w-[228px] items-center gap-[10px] border-t border-white/[0.07] px-[16px] ${
              sidebar ? "" : "opacity-0"
            } transition-opacity`}
          >
            <span className="grid h-[30px] w-[30px] place-items-center rounded-full bg-gradient-to-br from-[#6b5bd6] to-[#a48cf5] text-[13px] font-bold text-white">
              M
            </span>
            <div className="leading-tight">
              <p className="text-[13px] font-semibold">Miguel</p>
              <p className="text-[10px] text-white/50">Pro</p>
            </div>
            <Icon name="chevronDown" className="ml-[6px] h-[12px] w-[12px] text-white/50" />
            <Icon name="apps" className="ml-auto h-[17px] w-[17px] text-white/50" />
          </div>
        </aside>

        {/* Main */}
        <main className="flex min-w-0 flex-1 flex-col pb-[10px] pl-[24px] pr-[9px] pt-[12px]">
          <h1 className="text-[25px] font-bold tracking-[-0.01em]">
            {nav === "Dashboard" ? (
              <>
                Como você está hoje, Miguel Rocha? 👋
              </>
            ) : (
              nav
            )}
          </h1>
          <p className="mt-[1px] text-[11px] text-white/50">{date}</p>

          {nav === "Dashboard" ? (
            <div className="mt-[17px] grid min-h-0 flex-1 grid-cols-[1fr_1fr_220px] grid-rows-[394px_1fr] gap-[13px]">
              <TodayCard
                tasks={tasks}
                onToggle={toggle}
                onRemove={remove}
                onAdd={add}
                weekDone={weekDone}
                onWeekToggle={() => setWeekDone((d) => !d)}
              />
              <div className="flex min-h-0 flex-col gap-[13px]">
                <FocusCard tasks={pending} />
                <RecentCard />
              </div>
              <AgentsCard hello={hello} pending={pending.length} />
              <GitHubCard />
              <FinanceCard />
            </div>
          ) : (
            <div className="mt-[17px] grid flex-1 place-items-center rounded-[12px] border border-white/[0.08] bg-[#141415]">
              <div className="text-center">
                <Icon name={NAV_ICON[nav]} className="mx-auto h-[28px] w-[28px] text-[#a48cf5]" />
                <p className="mt-[12px] text-[13px] text-white/70">{nav} está disponível no app para Mac.</p>
                <button type="button" onClick={() => setNav("Dashboard")} className="mt-[10px] text-[11px] text-white/50 hover:text-white">
                  ← Voltar ao Dashboard
                </button>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}

/* ---------- Cards ---------- */

function Card({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <section className={`flex min-h-0 flex-col rounded-[12px] border border-white/[0.08] bg-[#141415] px-[15px] py-[13px] ${className}`}>
      {children}
    </section>
  );
}

function CardTitle({ icon, children, action }: { icon: string; children: ReactNode; action?: ReactNode }) {
  return (
    <div className="flex items-center gap-[9px]">
      <Icon name={icon} className="h-[15px] w-[15px] text-white/80" />
      <h2 className="flex-1 text-[13.5px] font-semibold">{children}</h2>
      {action}
    </div>
  );
}

function Label({ children, action }: { children: ReactNode; action?: ReactNode }) {
  return (
    <div className="flex items-center justify-between text-[10px] uppercase tracking-[0.08em] text-white/50">
      <span>{children}</span>
      {action}
    </div>
  );
}

function LinkAction({ children, onClick }: { children: ReactNode; onClick?: () => void }) {
  return (
    <button type="button" onClick={onClick} className="flex items-center gap-[4px] text-[10.5px] normal-case tracking-normal text-white/50 hover:text-white">
      {children}
    </button>
  );
}

function TodayCard({
  tasks,
  onToggle,
  onRemove,
  onAdd,
  weekDone,
  onWeekToggle,
}: {
  tasks: Task[];
  onToggle: (id: number) => void;
  onRemove: (id: number) => void;
  onAdd: (title: string) => void;
  weekDone: boolean;
  onWeekToggle: () => void;
}) {
  const [adding, setAdding] = useState(false);
  const [draft, setDraft] = useState("");

  const submit = () => {
    if (draft.trim()) onAdd(draft.trim());
    setDraft("");
    setAdding(false);
  };

  return (
    <Card className="row-span-1">
      <CardTitle icon="listTodo">Hoje</CardTitle>
      <div className="mt-[14px]">
        <Label
          action={
            <LinkAction onClick={() => setAdding(true)}>
              <Icon name="plus" className="h-[11px] w-[11px]" /> Nova tarefa
            </LinkAction>
          }
        >
          Tarefas
        </Label>
      </div>

      <div className="-mx-[4px] mt-[10px] min-h-0 flex-1 space-y-[6px] overflow-y-auto px-[4px] [scrollbar-width:none]">
        {tasks.length === 0 && !adding && (
          <p className="text-[11.5px] text-white/60">Nenhuma tarefa ainda. Use “Nova tarefa” para começar o dia.</p>
        )}
        {tasks.map((t) => (
          <div key={t.id} className="group flex items-center gap-[10px] rounded-[7px] border-l-2 border-white/20 bg-white/[0.035] px-[12px] py-[7px]">
            <Check done={t.done} onClick={() => onToggle(t.id)} />
            <div className="min-w-0 flex-1">
              <p className={`truncate text-[12px] font-semibold ${t.done ? "text-white/40 line-through" : ""}`}>{t.title}</p>
              <p className="text-[9.5px] text-white/40">{t.time ?? "Sem horário"}</p>
            </div>
            {t.flagged && <Icon name="flag" className="h-[11px] w-[11px] text-[#ff5f57]" />}
            <button
              type="button"
              aria-label="Excluir tarefa"
              onClick={() => onRemove(t.id)}
              className="text-[14px] leading-none text-white/40 opacity-0 hover:text-white group-hover:opacity-100"
            >
              ×
            </button>
          </div>
        ))}
        {adding && (
          <div className="flex items-center gap-[10px] rounded-[7px] border border-[#a48cf5]/50 bg-white/[0.035] px-[12px] py-[9px]">
            <Check done={false} />
            <input
              autoFocus
              value={draft}
              onChange={(e) => setDraft(e.target.value)}
              onBlur={submit}
              onKeyDown={(e) => {
                if (e.key === "Enter") submit();
                if (e.key === "Escape") {
                  setDraft("");
                  setAdding(false);
                }
              }}
              placeholder="O que precisa ser feito?"
              className="flex-1 bg-transparent text-[12px] placeholder:text-white/35 focus:outline-none"
            />
          </div>
        )}
      </div>

      <div className="mt-[10px] border-t-2 border-white/[0.08] pt-[12px]">
        <Label action={<LinkAction>Ver todas (1)</LinkAction>}>Vencem esta semana</Label>
        <div className="mt-[8px] flex items-center gap-[9px] rounded-[7px] bg-white/[0.035] px-[8px] py-[6px]">
          <span className="h-[4px] w-[4px] rounded-full bg-[#7c8cf8]" />
          <Check done={weekDone} onClick={onWeekToggle} />
          <span className={`flex-1 truncate text-[11.5px] font-semibold ${weekDone ? "text-white/40 line-through" : ""}`}>
            Power Automate – Intel Risk III p/ Power BI
          </span>
          <span className="text-[9.5px] text-white/45">Sáb, 10</span>
        </div>
      </div>
    </Card>
  );
}

const MODES = { foco: { label: "Foco", min: 25 }, pausa: { label: "Pausa", min: 5 }, longa: { label: "Longa", min: 15 } } as const;
type Mode = keyof typeof MODES;

function FocusCard({ tasks }: { tasks: Task[] }) {
  const [mode, setMode] = useState<Mode>("foco");
  const [left, setLeft] = useState(MODES.foco.min * 60);
  const [running, setRunning] = useState(false);
  const [cycle, setCycle] = useState(1);
  const [taskId, setTaskId] = useState("");

  const total = MODES[mode].min * 60;

  const switchTo = (m: Mode) => {
    setMode(m);
    setLeft(MODES[m].min * 60);
    setRunning(false);
  };

  // Pomodoro flow: 4 focus cycles with short breaks, then a long break.
  const next = () => {
    if (mode === "foco") switchTo(cycle % 4 === 0 ? "longa" : "pausa");
    else {
      setCycle((c) => (mode === "longa" ? 1 : c + 1));
      switchTo("foco");
    }
  };

  useEffect(() => {
    if (!running) return;
    const id = setInterval(() => setLeft((l) => Math.max(0, l - 1)), 1000);
    return () => clearInterval(id);
  }, [running]);

  useEffect(() => {
    if (left === 0 && running) next();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [left, running]);

  const r = 46;
  const c = 2 * Math.PI * r;
  const mm = String(Math.floor(left / 60)).padStart(2, "0");
  const ss = String(left % 60).padStart(2, "0");

  return (
    <Card className="h-[232px] shrink-0">
      <CardTitle icon="timer">Foco</CardTitle>
      <div className="mt-[24px] flex items-center gap-[14px]">
        <div className="relative h-[106px] w-[106px] shrink-0">
          <svg viewBox="0 0 106 106" className="absolute inset-0 -rotate-90">
            <circle cx="53" cy="53" r={r} fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="3.5" />
            <circle
              cx="53"
              cy="53"
              r={r}
              fill="none"
              stroke={accent}
              strokeWidth="3.5"
              strokeLinecap="round"
              strokeDasharray={c}
              strokeDashoffset={c * (1 - left / total)}
              className="transition-[stroke-dashoffset] duration-1000 ease-linear"
            />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-[21px] font-bold tabular-nums leading-none">
              {mm}:{ss}
            </span>
            <span className="mt-[4px] text-[8px] text-white/50">{MODES[mode].label}</span>
            <span className="text-[8px] text-white/50">Ciclo {cycle} de 4</span>
          </div>
        </div>

        <div className="min-w-0 flex-1 space-y-[7px]">
          <div className="grid grid-cols-3 rounded-[8px] bg-white/[0.05] p-[3px]">
            {(Object.keys(MODES) as Mode[]).map((m) => (
              <button
                key={m}
                type="button"
                onClick={() => switchTo(m)}
                className={`h-[24px] rounded-[6px] text-[10px] transition-colors ${
                  mode === m ? "bg-black/60 text-white" : "text-white/50 hover:text-white/80"
                }`}
              >
                {MODES[m].label}
              </button>
            ))}
          </div>
          <label className="relative flex h-[26px] items-center gap-[8px] rounded-[7px] bg-white/[0.05] px-[10px] text-[11px]">
            <span className="h-[9px] w-[9px] rounded-full border border-white/40" />
            <select
              value={taskId}
              onChange={(e) => setTaskId(e.target.value)}
              className="min-w-0 flex-1 appearance-none bg-transparent font-semibold focus:outline-none"
            >
              <option value="">Sem tarefa</option>
              {tasks.map((t) => (
                <option key={t.id} value={t.id}>
                  {t.title}
                </option>
              ))}
            </select>
            <Icon name="upDown" className="pointer-events-none h-[10px] w-[10px] text-white/50" />
          </label>
          <div className="flex gap-[6px]">
            <button
              type="button"
              onClick={() => setRunning((x) => !x)}
              className="flex h-[28px] flex-1 items-center justify-center gap-[6px] rounded-[6px] bg-[#ececec] text-[11.5px] font-semibold text-black hover:bg-white"
            >
              <Icon name={running ? "pause" : "play"} className="h-[11px] w-[11px]" />
              {running ? "Pausar" : left < total ? "Retomar" : "Iniciar"}
            </button>
            <button
              type="button"
              aria-label="Pular"
              onClick={next}
              className="grid h-[28px] w-[30px] place-items-center rounded-[6px] bg-white/[0.06] hover:bg-white/[0.12]"
            >
              <Icon name="skip" className="h-[10px] w-[10px]" />
            </button>
          </div>
        </div>
      </div>
    </Card>
  );
}

function RecentCard() {
  return (
    <Card className="flex-1">
      <CardTitle icon="history" action={<LinkAction>Ver todos <Icon name="arrow" className="h-[10px] w-[10px]" /></LinkAction>}>
        Últimos itens
      </CardTitle>
      <p className="mt-[10px] text-[10.5px] leading-[1.45] text-white/60">
        Quando você conectar GitHub, Notion e outras ferramentas, os itens recentes aparecem aqui.
      </p>
    </Card>
  );
}

const AGENTS = [
  { name: "Jason", role: "Gerente de projetos", img: "/agents/jason.png", cat: "Produtividade" },
  { name: "Lucia", role: "Analista de tasks", img: "/agents/lucia.png", cat: "Produtividade" },
  { name: "Link", role: "Analista de operações", img: "/agents/link.png", cat: "Finanças" },
  { name: "Trevor", role: "Engenheiro de Software", img: "/agents/trevor.png", cat: "Desenvolvimento" },
] as const;
const CATEGORIES = ["Todos", "Produtividade", "Desenvolvimento", "Finanças"];

function AgentsCard({ hello, pending }: { hello: string; pending: number }) {
  const [cat, setCat] = useState("Todos");
  const messages: Record<string, string> = useMemo(
    () => ({
      Jason: `${hello} Miguel, hoje temos ${pending} ${pending === 1 ? "tarefa" : "tarefas"} para fechar!`,
      Lucia: `${hello} Miguel, hoje temos 0 revisões para olharmos!`,
      Link: `${hello} Miguel, seu gasto do mês está em R$ 0,00!`,
      Trevor: `${hello} Miguel, temos 0 PR's seus, 0 revisões pedidas e 0 falhas no Actions!`,
    }),
    [hello, pending],
  );

  return (
    <Card className="row-span-2 px-[12px]">
      <CardTitle icon="bot">Agentes</CardTitle>
      <p className="mt-[12px] text-[10px] uppercase tracking-[0.08em] text-white/50">Categorias</p>
      <div className="-mr-[12px] mt-[10px] flex gap-[6px] overflow-x-auto pr-[12px] [scrollbar-width:none]">
        {CATEGORIES.map((c) => (
          <button
            key={c}
            type="button"
            onClick={() => setCat(c)}
            className={`shrink-0 rounded-[6px] border px-[9px] py-[4px] text-[9.5px] transition-colors ${
              cat === c ? "border-[#a48cf5]/40 bg-[#a48cf5]/20 text-white" : "border-white/[0.08] bg-white/[0.04] text-white/55 hover:text-white"
            }`}
          >
            {c}
          </button>
        ))}
      </div>
      <div className="mt-[12px] min-h-0 flex-1 space-y-[10px] overflow-y-auto [scrollbar-width:none]">
        {AGENTS.filter((a) => cat === "Todos" || a.cat === cat).map((a) => (
          <div key={a.name} className="rounded-[9px] border border-white/[0.08] bg-white/[0.025] px-[11px] py-[10px] hover:border-white/20">
            <div className="flex items-start gap-[9px]">
              <img src={a.img} alt="" className="h-[33px] w-[33px] shrink-0" draggable={false} />
              <div className="leading-[1.3]">
                <p className="text-[11px] font-bold">{a.name}</p>
                <p className="text-[10px]">{a.role}</p>
              </div>
            </div>
            <p className="mt-[9px] text-[8.5px] leading-[1.35] text-white/60">{messages[a.name]}</p>
          </div>
        ))}
      </div>
    </Card>
  );
}

function GitHubCard() {
  const rows = [
    { icon: "xCircle", color: "#ff5f57", title: "CI falhando", count: 0, empty: "Nenhum build falhando nos seus repositórios recentes. 🎉" },
    { icon: "eye", color: accent, title: "Revisões pedidas a você", count: 0, empty: "Ninguém pediu sua revisão agora." },
    { icon: "pr", color: accent, title: "Seus PRs abertos", count: 0, empty: "Nenhum PR seu aberto." },
  ];
  return (
    <Card>
      <CardTitle icon="code" action={<LinkAction>Ver tudo <Icon name="arrow" className="h-[10px] w-[10px]" /></LinkAction>}>
        GitHub
      </CardTitle>
      <div className="mt-[22px] flex min-h-0 flex-1 flex-col justify-between">
        {rows.map((r) => (
          <div key={r.title}>
            <GitHubHeading {...r} />
            <p className="mt-[3px] text-[10.5px] text-white/60">{r.empty}</p>
          </div>
        ))}
        <div>
          <GitHubHeading icon="dot" color={accent} title="Issues atribuídas a você" count={2} />
          <div className="mt-[8px] flex items-center gap-[10px] border-l-2 border-[#a48cf5] pl-[10px]">
            <div className="min-w-0 flex-1">
              <p className="truncate text-[12px] font-semibold">feat: AI gap narrative for the folio</p>
              <p className="text-[8.5px] text-white/50">miguelrcha/folio#17 · há 43 d</p>
            </div>
            <button type="button" className="flex items-center gap-[5px] rounded-full bg-white/[0.06] px-[8px] py-[4px] text-[10px] hover:bg-white/[0.12]">
              <img src="/agents/trevor.png" alt="" className="h-[12px] w-[12px]" />
              Perguntar ao Trevor
            </button>
            <Icon name="external" className="h-[11px] w-[11px] text-white/50" />
          </div>
        </div>
      </div>
    </Card>
  );
}

function GitHubHeading({ icon, color, title, count }: { icon: string; color: string; title: string; count: number }) {
  return (
    <div className="flex items-center gap-[7px] text-[11.5px] font-semibold">
      <span style={{ color }}>
        <Icon name={icon} className="h-[12px] w-[12px]" />
      </span>
      {title}
      <span className="rounded-[4px] bg-white/[0.06] px-[5px] text-[8.5px] font-normal text-white/50">{count}</span>
    </div>
  );
}

function FinanceCard() {
  return (
    <Card>
      <CardTitle icon="wallet">Finanças do mês</CardTitle>
      <div className="mt-[8px] flex items-start justify-between">
        <div>
          <p className="text-[21px] font-bold leading-tight" style={{ color: accent }}>
            R$ 0,00
          </p>
          <p className="text-[9.5px] text-white/50">Saldo do mês</p>
        </div>
        <div className="flex gap-[14px] pt-[4px] text-[10px] font-semibold">
          <div>
            R$ 0,00<p className="text-[8.5px] font-normal text-white/50">Entradas</p>
          </div>
          <div>
            R$ 0,00<p className="text-[8.5px] font-normal text-white/50">Saídas</p>
          </div>
        </div>
      </div>
      <p className="mt-[14px] text-[10px] uppercase tracking-[0.08em] text-white/50">Contas</p>
      <p className="mt-[8px] text-[10.5px] text-white/60">Nenhuma conta. Adicione em Finanças.</p>
      <p className="mt-[60px] text-[10px] uppercase tracking-[0.08em] text-white/50">Últimos lançamentos</p>
      <p className="mt-[8px] text-[10.5px] text-white/60">Nenhum lançamento este mês.</p>
    </Card>
  );
}

/* ---------- Bits ---------- */

function Check({ done, onClick, size = 13 }: { done: boolean; onClick?: () => void; size?: number }) {
  return (
    <button
      type="button"
      aria-label={done ? "Desmarcar tarefa" : "Concluir tarefa"}
      onClick={onClick}
      style={{ width: size, height: size }}
      className={`grid shrink-0 place-items-center rounded-full border transition-colors ${
        done ? "border-white/50 bg-white/50 text-black" : "border-white/50 hover:border-white"
      }`}
    >
      {done && <Icon name="check" className="h-[70%] w-[70%]" strokeWidth={3.5} />}
    </button>
  );
}

// Lucide-style strokes, drawn on a 24 grid.
const PATHS: Record<string, ReactNode> = {
  dashboard: <path d="M3 3v16a2 2 0 0 0 2 2h16M18 17V9M13 17V5M8 17v-3" />,
  calendar: (
    <>
      <rect x="3" y="4" width="18" height="18" rx="2" />
      <path d="M16 2v4M8 2v4M3 10h18" />
    </>
  ),
  chat: <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />,
  plug: <path d="M12 22v-5M9 8V2M15 8V2M18 8v5a4 4 0 0 1-4 4h-4a4 4 0 0 1-4-4V8Z" />,
  tasks: (
    <>
      <rect x="8" y="2" width="8" height="4" rx="1" />
      <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2M12 11h4M12 16h4M8 11h.01M8 16h.01" />
    </>
  ),
  cap: <path d="M22 10v6M2 10l10-5 10 5-10 5zM6 12v5c3 3 9 3 12 0v-5" />,
  wallet: (
    <path d="M19 7V4a1 1 0 0 0-1-1H5a2 2 0 0 0 0 4h15a1 1 0 0 1 1 1v4h-3a2 2 0 0 0 0 4h3a1 1 0 0 0 1-1v-2a1 1 0 0 0-1-1M3 5v14a2 2 0 0 0 2 2h15a1 1 0 0 0 1-1v-4" />
  ),
  target: (
    <>
      <circle cx="12" cy="12" r="10" />
      <circle cx="12" cy="12" r="6" />
      <circle cx="12" cy="12" r="2" />
    </>
  ),
  trophy: (
    <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6M18 9h1.5a2.5 2.5 0 0 0 0-5H18M4 22h16M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22M18 2H6v7a6 6 0 0 0 12 0V2Z" />
  ),
  code: <path d="m18 16 4-4-4-4M6 8l-4 4 4 4M14.5 4l-5 16" />,
  terminal: (
    <>
      <rect x="3" y="3" width="18" height="18" rx="2" />
      <path d="m7 11 2-2-2-2M11 13h4" />
    </>
  ),
  panel: (
    <>
      <rect x="3" y="3" width="18" height="18" rx="2" />
      <path d="M9 3v18" />
    </>
  ),
  search: (
    <>
      <circle cx="11" cy="11" r="8" />
      <path d="m21 21-4.3-4.3" />
    </>
  ),
  listTodo: (
    <>
      <rect x="3" y="5" width="6" height="6" rx="1" />
      <path d="m3 17 2 2 4-4M13 6h8M13 12h8M13 18h8" />
    </>
  ),
  timer: (
    <>
      <circle cx="12" cy="14" r="8" />
      <path d="M10 2h4M12 14l3-3" />
    </>
  ),
  history: <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8M3 3v5h5M12 7v5l4 2" />,
  bot: (
    <>
      <rect x="4" y="8" width="16" height="12" rx="2" />
      <path d="M12 8V4H8M2 14h2M20 14h2M15 13v2M9 13v2" />
    </>
  ),
  plus: <path d="M5 12h14M12 5v14" />,
  arrow: <path d="M5 12h14m-7-7 7 7-7 7" />,
  play: <path d="M6 3l14 9-14 9z" />,
  pause: <path d="M7 4v16M17 4v16" />,
  skip: <path d="M5 4l10 8-10 8zM19 5v14" />,
  upDown: <path d="m7 15 5 5 5-5M7 9l5-5 5 5" />,
  chevronDown: <path d="m6 9 6 6 6-6" />,
  check: <path d="M20 6 9 17l-5-5" />,
  flag: <path d="M4 22V4a1 1 0 0 1 .4-.8A6 6 0 0 1 8 2c3 0 5 2 7.33 2q2 0 3.67-.8a1 1 0 0 1 1 .8v11a1 1 0 0 1-.4.8A6 6 0 0 1 16 16c-3 0-5-2-8-2a6 6 0 0 0-4 1.53" />,
  xCircle: (
    <>
      <circle cx="12" cy="12" r="10" />
      <path d="m15 9-6 6M9 9l6 6" />
    </>
  ),
  eye: (
    <>
      <path d="M2.06 12.35a1 1 0 0 1 0-.7 10.75 10.75 0 0 1 19.88 0 1 1 0 0 1 0 .7 10.75 10.75 0 0 1-19.88 0" />
      <circle cx="12" cy="12" r="3" />
    </>
  ),
  pr: (
    <>
      <circle cx="6" cy="6" r="3" />
      <path d="M6 9v12" />
    </>
  ),
  dot: (
    <>
      <circle cx="12" cy="12" r="10" />
      <circle cx="12" cy="12" r="2" fill="currentColor" />
    </>
  ),
  external: <path d="M15 3h6v6M10 14 21 3M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />,
  apps: (
    <>
      <circle cx="7" cy="7" r="3.5" />
      <circle cx="17" cy="7" r="3.5" />
      <circle cx="7" cy="17" r="3.5" />
      <path d="M17 13v8M13 17h8" />
    </>
  ),
};

function Icon({ name, className, strokeWidth = 2 }: { name: string; className?: string; strokeWidth?: number }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      {PATHS[name]}
    </svg>
  );
}
