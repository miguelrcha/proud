"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

const links = [
  { href: "#recursos", label: "Recursos" },
  { href: "#como-funciona", label: "Como funciona" },
  { href: "#privacidade", label: "Privacidade" },
  { href: "#preco", label: "Preço" },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 transition-colors duration-300 ${
        scrolled ? "bg-bg/90 backdrop-blur-md border-b border-line" : "bg-transparent"
      }`}
    >
      <div className="container-x flex h-[72px] items-center justify-between">
        <a href="#top" className="flex items-center gap-3">
          <Image
            src="/icon-180.png"
            alt="Feyce"
            width={36}
            height={36}
            className="rounded-[10px]"
            priority
          />
          <span className="font-display text-[19px] font-600 tracking-[-0.01em] text-ink">
            Feyce
          </span>
        </a>

        <nav className="hidden md:flex items-center gap-9">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="text-[14.5px] text-ink-muted hover:text-ink transition-colors"
            >
              {l.label}
            </a>
          ))}
        </nav>

        <a
          href="#baixar"
          className="rounded-full bg-ink text-bg text-[14px] font-medium px-5 py-2.5 hover:bg-night-soft transition-colors"
        >
          Baixar para Mac
        </a>
      </div>
    </header>
  );
}
