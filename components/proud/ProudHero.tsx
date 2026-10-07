import { AppleLogo, BadgeCheckIcon } from "./icons";
import ProudShowcase from "./ProudShowcase";
import DownloadMacLabel from "./DownloadMacLabel";

export default function ProudHero() {
  return (
    <section id="top" className="flex flex-col items-center px-4 pt-20 md:pt-[110px]">
      <h1 data-reveal="120" className="text-center text-[44px] font-bold leading-[1.02] tracking-[-0.05em] text-[#1c1c1e] sm:text-[64px] md:text-[96px]">
        Dynamic Island.
        <br />
        Stay focused on your{" "}
        <span className="relative inline-flex items-baseline whitespace-nowrap">
          <span
            aria-hidden="true"
            className="absolute -left-[0.08em] -right-[0.06em] bottom-[-0.04em] top-[0.52em] bg-[#c7a6f7]"
          />
          <AppleLogo className="relative mr-[0.04em] h-[0.84em] w-[0.7em] self-center -translate-y-[0.04em]" />
          <span className="relative">Mac</span>
        </span>
      </h1>

      <div id="download" data-reveal="260" className="mt-10 flex flex-col items-center gap-4 sm:mt-[50px] sm:flex-row sm:gap-[30px]">
        <a
          href="/download"
          className="group flex items-center rounded-[14px] bg-[#1c1c1e] px-6 py-[17px] text-[18px] font-semibold text-white shadow-[0_14px_30px_-8px_rgba(28,28,30,0.45)] transition-transform hover:-translate-y-0.5"
        >
          <DownloadMacLabel />
        </a>
        <a
          href="#purchase"
          className="flex items-center gap-3 rounded-[14px] bg-[#e8e8ed] px-6 py-[13px] text-[18px] font-semibold text-[#1c1c1e] transition-colors hover:bg-[#dddde3]"
        >
          <BadgeCheckIcon className="h-[22px] w-[22px] text-[#b3b3be]" />
          Purchase
          <span className="ml-1 rounded-md bg-[#1c1c1e] px-2 py-1 text-[14px] font-bold text-white">Free</span>
        </a>
      </div>

      <ProudShowcase />
    </section>
  );
}
