export default function Testimonial() {
  return (
    <section className="py-20 md:py-28">
      <div className="container-x">
        <div className="max-w-[720px] mx-auto text-center">
          <p className="font-display text-[24px] md:text-[30px] leading-[1.45] tracking-[-0.01em] text-ink">
            “Parei de pensar em travar a tela toda vez que levanto. Feyce faz
            isso por mim há meses e eu só percebo que existe quando alguém
            pergunta como o meu Mac acorda tão rápido.”
          </p>
          <div className="mt-7 flex items-center justify-center gap-3">
            <span className="h-9 w-9 rounded-full bg-night" />
            <div className="text-left">
              <p className="text-[14px] font-medium text-ink">Marina Costa</p>
              <p className="text-[13px] text-ink-muted">
                Designer de produto
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
