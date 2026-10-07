const plans = [
  {
    name: "Pessoal",
    price: "Grátis",
    period: "",
    body: "Para quem só quer a tela travando e acordando sozinha.",
    items: [
      "Apagar e travar ao sair",
      "Acordar a tela automaticamente",
      "Indicador de câmera na barra de menu",
    ],
    cta: "Baixar grátis",
    featured: false,
  },
  {
    name: "Pro",
    price: "R$ 14",
    period: "/mês",
    body: "Para quem trabalha em foco e quer ajustar cada detalhe.",
    items: [
      "Tudo do plano Pessoal",
      "Silêncio automático em modo foco",
      "Sensibilidade e atraso personalizados",
      "Até 3 Macs na mesma licença",
    ],
    cta: "Testar 14 dias grátis",
    featured: true,
  },
];

export default function Pricing() {
  return (
    <section id="preco" className="bg-night text-bg py-20 md:py-28">
      <div className="container-x">
        <div className="max-w-[560px]">
          <h2 className="font-display text-[30px] md:text-[36px] tracking-[-0.02em]">
            Comece de graça, hoje
          </h2>
          <p className="mt-4 text-[16px] leading-[1.65] text-bg/60">
            Sem cartão de crédito para instalar. Mude de plano quando quiser,
            direto no app.
          </p>
        </div>

        <div className="mt-14 grid grid-cols-1 md:grid-cols-2 gap-6 max-w-[820px]">
          {plans.map((p) => (
            <div
              key={p.name}
              className={`rounded-2xl p-8 border ${
                p.featured
                  ? "bg-bg text-ink border-bg"
                  : "border-white/15 text-bg"
              }`}
            >
              <p className="text-[14px] font-medium opacity-80">{p.name}</p>
              <p className="mt-3 font-display text-[36px] tracking-[-0.02em]">
                {p.price}
                <span className="text-[16px] font-body opacity-60">
                  {p.period}
                </span>
              </p>
              <p
                className={`mt-2 text-[14.5px] ${
                  p.featured ? "text-ink-muted" : "text-bg/60"
                }`}
              >
                {p.body}
              </p>

              <ul className="mt-6 flex flex-col gap-2.5">
                {p.items.map((it) => (
                  <li
                    key={it}
                    className={`text-[14px] leading-[1.5] flex gap-2.5 ${
                      p.featured ? "text-ink" : "text-bg/85"
                    }`}
                  >
                    <span className="mt-[7px] h-1 w-1 rounded-full bg-current shrink-0" />
                    {it}
                  </li>
                ))}
              </ul>

              <a
                href="#"
                className={`mt-8 inline-flex w-full items-center justify-center rounded-full px-6 py-3 text-[14.5px] font-medium transition-colors ${
                  p.featured
                    ? "bg-ink text-bg hover:bg-night-soft"
                    : "bg-white/10 hover:bg-white/15 text-bg"
                }`}
              >
                {p.cta}
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
