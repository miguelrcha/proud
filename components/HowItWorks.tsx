const steps = [
  {
    n: "01",
    title: "Instale e fixe na barra de menu",
    body: "Baixe o Feyce, arraste para Aplicativos e conceda acesso à câmera uma única vez. Leva menos de um minuto.",
  },
  {
    n: "02",
    title: "Feyce aprende seu rosto",
    body: "Em poucos segundos, o app guarda um modelo do seu rosto direto no chip do Mac. Ele nunca é exportado nem enviado a servidor nenhum.",
  },
  {
    n: "03",
    title: "Deixe o Mac perceber por você",
    body: "A partir daí, Feyce cuida de apagar, travar e acordar a tela sozinho. Você ajusta a sensibilidade quando quiser, direto no menu.",
  },
];

export default function HowItWorks() {
  return (
    <section id="como-funciona" className="py-20 md:py-28 bg-bg-soft">
      <div className="container-x">
        <div className="max-w-[560px]">
          <h2 className="font-display text-[30px] md:text-[36px] tracking-[-0.02em] text-ink">
            Três minutos para configurar
          </h2>
          <p className="mt-4 text-[16px] leading-[1.65] text-ink-muted">
            Sem conta, sem nuvem, sem configuração complicada.
          </p>
        </div>

        <div className="mt-14 grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-8">
          {steps.map((s) => (
            <div key={s.n} className="md:pr-6">
              <span className="font-display text-[15px] text-ink-muted">
                {s.n}
              </span>
              <h3 className="mt-3 font-display text-[20px] tracking-[-0.01em] text-ink leading-[1.3]">
                {s.title}
              </h3>
              <p className="mt-3 text-[15px] leading-[1.65] text-ink-muted">
                {s.body}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
