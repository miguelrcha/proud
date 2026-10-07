type Feature = {
  eyebrow: string;
  title: string;
  body: string;
  visual: "lock" | "focus" | "wake" | "privacy";
};

const features: Feature[] = [
  {
    eyebrow: "Quando você sai",
    title: "A tela apaga e trava sozinha",
    body: "No momento em que você se afasta, Feyce escurece a tela e bloqueia a sessão. Ninguém que passe pela sua mesa vê o que estava aberto, e você nunca mais esquece de travar o Mac na saída.",
    visual: "lock",
  },
  {
    eyebrow: "Enquanto você trabalha",
    title: "Notificações somem quando você está concentrado",
    body: "Feyce percebe quando seus olhos estão fixos na tela e ativa o silêncio automaticamente. Assim que você olha para o lado, os avisos voltam a aparecer normalmente.",
    visual: "focus",
  },
  {
    eyebrow: "Quando você volta",
    title: "A tela acorda antes da sua mão chegar ao mouse",
    body: "Sem tocar em nada, sem digitar senha duas vezes. Feyce reconhece você em frações de segundo e devolve exatamente a tela de onde você parou.",
    visual: "wake",
  },
  {
    eyebrow: "Sobre a câmera",
    title: "Nada do que a câmera vê sai do seu Mac",
    body: "Todo o reconhecimento acontece localmente, no chip do seu aparelho. Nenhum quadro é gravado, enviado ou guardado — e um indicador na barra de menu mostra sempre que a câmera está ativa.",
    visual: "privacy",
  },
];

function Visual({ kind }: { kind: Feature["visual"] }) {
  return (
    <div className="relative aspect-[4/3] w-full rounded-2xl bg-night overflow-hidden">
      {kind === "lock" && (
        <svg viewBox="0 0 200 150" className="absolute inset-0 h-full w-full">
          <rect x="0" y="0" width="200" height="150" fill="#171614" />
          <rect x="30" y="20" width="140" height="90" rx="6" fill="#232019" />
          {[...Array(5)].map((_, i) => (
            <rect key={i} x={40 + i * 24} y="30" width="14" height="70" fill="#2c2822" />
          ))}
          <circle cx="100" cy="65" r="26" fill="#0c0b0a" stroke="#EAE9E5" strokeWidth="3" />
          <rect x="90" y="60" width="20" height="16" rx="2" fill="#EAE9E5" />
          <rect x="94" y="50" width="12" height="14" rx="6" fill="none" stroke="#EAE9E5" strokeWidth="3" />
        </svg>
      )}
      {kind === "focus" && (
        <svg viewBox="0 0 200 150" className="absolute inset-0 h-full w-full">
          <rect x="0" y="0" width="200" height="150" fill="#171614" />
          <circle cx="100" cy="70" r="8" fill="#EAE9E5" />
          <circle cx="100" cy="70" r="22" fill="none" stroke="#4a463f" strokeWidth="2" />
          <circle cx="100" cy="70" r="38" fill="none" stroke="#33302a" strokeWidth="2" />
          <g transform="translate(140,32)">
            <path
              d="M0 8 a8 8 0 0 1 16 0 v6 a8 8 0 0 1 -16 0 z"
              fill="none"
              stroke="#7a766e"
              strokeWidth="2.5"
            />
            <line x1="-6" y1="18" x2="22" y2="-4" stroke="#7a766e" strokeWidth="2.5" />
          </g>
        </svg>
      )}
      {kind === "wake" && (
        <svg viewBox="0 0 200 150" className="absolute inset-0 h-full w-full">
          <rect x="0" y="0" width="200" height="150" fill="#171614" />
          <g transform="translate(70,75)">
            <circle r="26" fill="#0c0b0a" stroke="#EAE9E5" strokeWidth="3" />
            <path d="M-9 -12 A16 16 0 1 0 -9 12 A12 12 0 1 1 -9 -12 Z" fill="#EAE9E5" />
          </g>
          <g transform="translate(126,75)">
            <circle r="26" fill="#0c0b0a" stroke="#EAE9E5" strokeWidth="3" />
            <path d="M-9 -12 A16 16 0 1 0 -9 12 A12 12 0 1 1 -9 -12 Z" fill="#EAE9E5" />
          </g>
          <path d="M40 30 q-14 0 -14 -14" fill="none" stroke="#4a463f" strokeWidth="2" />
          <path d="M160 30 q14 0 14 -14" fill="none" stroke="#4a463f" strokeWidth="2" />
        </svg>
      )}
      {kind === "privacy" && (
        <svg viewBox="0 0 200 150" className="absolute inset-0 h-full w-full">
          <rect x="0" y="0" width="200" height="150" fill="#171614" />
          <path
            d="M100 24 l38 14 v28 c0 30 -18 46 -38 54 c-20 -8 -38 -24 -38 -54 v-28 z"
            fill="#0c0b0a"
            stroke="#EAE9E5"
            strokeWidth="3"
          />
          <circle cx="100" cy="76" r="6" fill="#EAE9E5" />
          <rect x="97" y="80" width="6" height="14" rx="2" fill="#EAE9E5" />
        </svg>
      )}
    </div>
  );
}

export default function Features() {
  return (
    <section id="recursos" className="py-20 md:py-28">
      <div className="container-x">
        <div className="max-w-[560px]">
          <h2 className="font-display text-[30px] md:text-[36px] tracking-[-0.02em] text-ink">
            Um Mac que sabe se você está olhando
          </h2>
          <p className="mt-4 text-[16px] leading-[1.65] text-ink-muted">
            Feyce roda discretamente na barra de menu e reage à sua presença
            em tempo real, sem exigir nenhum atalho ou clique.
          </p>
        </div>

        <div className="mt-16 flex flex-col gap-20 md:gap-28">
          {features.map((f, i) => (
            <div
              key={f.title}
              className={`grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16 items-center ${
                i % 2 === 1 ? "md:[&>*:first-child]:order-2" : ""
              }`}
            >
              <div>
                <p className="text-[13px] text-ink-muted">{f.eyebrow}</p>
                <h3 className="mt-2 font-display text-[24px] md:text-[27px] tracking-[-0.01em] text-ink leading-[1.2]">
                  {f.title}
                </h3>
                <p className="mt-4 text-[15.5px] leading-[1.7] text-ink-muted max-w-[440px]">
                  {f.body}
                </p>
              </div>
              <Visual kind={f.visual} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
