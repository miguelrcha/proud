const agents = [
  {
    id: "jason",
    name: "Jason",
    role: "Project Manager",
    bio: "Keeps your projects on track. Jason plans your day, sorts priorities and reminds you what needs to ship.",
  },
  {
    id: "lucia",
    name: "Lucia",
    role: "Task Analyst",
    bio: "Turns your to-dos into a clear plan. Lucia reviews your tasks, spots what is overdue and helps you close them.",
  },
  {
    id: "link",
    name: "Link",
    role: "Operations Analyst",
    bio: "Watches the numbers so you don't have to. Link tracks your spending and connected apps and flags anything off.",
  },
  {
    id: "trevor",
    name: "Trevor",
    role: "Software Engineer",
    bio: "Your engineering sidekick. Trevor follows your PRs, reviews and CI runs on GitHub and tells you what needs attention.",
  },
];

export default function ProudCards() {
  return (
    <section className="flex justify-center px-4 pt-24 md:pt-32">
      <div className="grid w-full max-w-[1400px] grid-cols-1 gap-[15px] sm:grid-cols-2 md:grid-cols-4">
        {agents.map((agent, i) => (
          <div
            key={agent.id}
            data-reveal={i * 90}
            className="flex h-[440px] flex-col justify-between rounded-[24px] bg-[#1c1c1e] p-7"
          >
            <img
              src={`/agents/${agent.id}.png`}
              alt=""
              width={112}
              height={112}
              className="h-28 w-28 rounded-full border border-white/10"
            />
            <div>
              <h3 className="text-[28px] font-bold tracking-[-0.02em] text-white">{agent.name}</h3>
              <p className="mt-1 text-[15px] font-semibold text-white/50">{agent.role}</p>
              <p className="mt-4 text-[16px] leading-[1.55] text-white/75">{agent.bio}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
