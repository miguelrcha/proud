const stats = [
  { value: "0,4s", label: "para a tela acordar quando você volta" },
  { value: "100%", label: "do processamento feito no seu Mac" },
  { value: "0", label: "quadros de vídeo salvos ou enviados" },
];

export default function Stats() {
  return (
    <section className="py-14 md:py-16 border-y border-line">
      <div className="container-x">
        <div className="grid grid-cols-1 sm:grid-cols-3 divide-y sm:divide-y-0 sm:divide-x divide-line">
          {stats.map((s) => (
            <div key={s.label} className="py-6 sm:py-0 sm:px-8 first:pl-0 text-center sm:text-left">
              <p className="font-display text-[34px] md:text-[38px] tracking-[-0.02em] text-ink">
                {s.value}
              </p>
              <p className="mt-1.5 text-[14px] text-ink-muted max-w-[220px] mx-auto sm:mx-0">
                {s.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
