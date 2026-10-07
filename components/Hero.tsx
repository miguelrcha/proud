"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

const STATES = [
  {
    key: "presente",
    pill: "Você está por perto",
    sub: "Tela acesa, notificações silenciadas",
    dim: false,
  },
  {
    key: "ausente",
    pill: "Você saiu da mesa",
    sub: "Tela apagando e a sessão travando sozinha",
    dim: true,
  },
  {
    key: "retorno",
    pill: "Bem-vindo de volta",
    sub: "Um olhar e a tela já acordou",
    dim: false,
  },
];

export default function Hero() {
  const [step, setStep] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setStep((s) => (s + 1) % STATES.length);
    }, 3200);
    return () => clearInterval(id);
  }, []);

  const current = STATES[step];

  return (
    <section id="top" className="pt-16 md:pt-20 pb-8">
      <div className="container-x">
        <div className="max-w-[720px] mx-auto text-center">
          <h1 className="font-display text-[38px] leading-[1.12] tracking-[-0.02em] text-ink sm:text-[50px] md:text-[62px]">
            Sua tela só acorda quando você olha para ela
          </h1>
          <p className="mt-6 text-[17px] leading-[1.6] text-ink-muted md:text-[18px] max-w-[560px] mx-auto">
            Feyce fica na barra de menu do seu Mac e usa a câmera para saber
            se você está por perto. Some da mesa e a tela apaga e trava.
            Volte, e ela acorda antes da sua mão chegar ao teclado.
          </p>

          <div className="mt-9 flex flex-col sm:flex-row items-center justify-center gap-3">
            <a
              id="baixar"
              href="#preco"
              className="w-full sm:w-auto rounded-full bg-ink text-bg px-7 py-3.5 text-[15px] font-medium hover:bg-night-soft transition-colors"
            >
              Baixar para Mac — grátis
            </a>
            <a
              href="#como-funciona"
              className="w-full sm:w-auto rounded-full border border-line px-7 py-3.5 text-[15px] font-medium text-ink hover:border-ink transition-colors"
            >
              Ver como funciona
            </a>
          </div>
          <p className="mt-4 text-[13px] text-ink-muted">
            Requer macOS 13 ou mais recente · nenhum vídeo sai do seu Mac
          </p>
        </div>

        {/* Live demo mock */}
        <div className="mt-14 md:mt-16 max-w-[880px] mx-auto">
          <div className="rounded-[28px] bg-night-soft p-2.5 md:p-3 shadow-[0_30px_60px_-25px_rgba(20,19,16,0.45)]">
            <div className="relative rounded-[20px] overflow-hidden bg-night aspect-[16/10] sm:aspect-[16/9]">
              {/* menu bar */}
              <div className="flex items-center justify-between h-9 px-4 bg-[#0c0b0a]">
                <div className="flex items-center gap-1.5">
                  <span className="h-2.5 w-2.5 rounded-full bg-[#3a3733]" />
                  <span className="h-2.5 w-2.5 rounded-full bg-[#3a3733]" />
                  <span className="h-2.5 w-2.5 rounded-full bg-[#3a3733]" />
                </div>
                <div className="flex items-center gap-3.5 text-bg/70">
                  <span className="text-[11px] tracking-wide hidden sm:inline">
                    qui 13 set
                  </span>
                  <div className="relative h-[18px] w-[18px]">
                    <Image
                      src="/icon-180.png"
                      alt="Feyce ativo"
                      fill
                      sizes="18px"
                      className="rounded-[5px] animate-blink origin-center"
                    />
                  </div>
                </div>
              </div>

              {/* screen content */}
              <div
                className="relative h-[calc(100%-2.25rem)] w-full transition-[filter,opacity] duration-700 ease-out"
                style={{
                  background:
                    "radial-gradient(120% 140% at 20% 0%, #2a2723 0%, #171614 55%, #121110 100%)",
                  filter: current.dim ? "brightness(0.32) blur(0.5px)" : "brightness(1)",
                }}
              >
                <div className="absolute inset-0 flex items-center justify-center px-6">
                  <div className="flex items-center gap-3 rounded-2xl bg-[#1c1a17]/90 border border-white/10 px-5 py-4 backdrop-blur-sm transition-transform duration-700"
                       style={{ transform: current.dim ? "scale(0.97)" : "scale(1)" }}>
                    <span
                      className={`h-2.5 w-2.5 rounded-full shrink-0 ${
                        current.dim ? "bg-[#8a8781]" : "bg-[#e8e6e1]"
                      }`}
                    />
                    <div className="text-left">
                      <p className="text-[13.5px] font-medium text-bg">
                        {current.pill}
                      </p>
                      <p className="text-[12px] text-bg/55 mt-0.5">
                        {current.sub}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
