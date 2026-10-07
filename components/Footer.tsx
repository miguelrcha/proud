import Image from "next/image";

const columns = [
  {
    title: "Produto",
    links: ["Recursos", "Como funciona", "Preço", "Novidades"],
  },
  {
    title: "Empresa",
    links: ["Sobre", "Privacidade", "Termos", "Contato"],
  },
];

export default function Footer() {
  return (
    <footer className="bg-night text-bg pt-16 pb-10 border-t border-white/10">
      <div className="container-x">
        <div className="flex flex-col md:flex-row md:items-start justify-between gap-12">
          <div className="max-w-[280px]">
            <div className="flex items-center gap-2.5">
              <Image
                src="/icon-180.png"
                alt="Feyce"
                width={30}
                height={30}
                className="rounded-[8px]"
              />
              <span className="font-display text-[17px] tracking-[-0.01em]">
                Feyce
              </span>
            </div>
            <p className="mt-4 text-[13.5px] leading-[1.6] text-bg/55">
              Feyce percebe quando você está por perto e cuida da tela do seu
              Mac por você.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-12 md:gap-20">
            {columns.map((col) => (
              <div key={col.title}>
                <p className="text-[13px] font-medium text-bg/50">
                  {col.title}
                </p>
                <ul className="mt-4 flex flex-col gap-2.5">
                  {col.links.map((l) => (
                    <li key={l}>
                      <a
                        href="#"
                        className="text-[14px] text-bg/80 hover:text-bg transition-colors"
                      >
                        {l}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-14 pt-6 border-t border-white/10 flex flex-col sm:flex-row gap-3 items-center justify-between">
          <p className="text-[13px] text-bg/45">
            © {new Date().getFullYear()} Feyce. Feito para macOS.
          </p>
          <p className="text-[13px] text-bg/45">
            Nenhum dado de câmera sai do seu Mac.
          </p>
        </div>
      </div>
    </footer>
  );
}
