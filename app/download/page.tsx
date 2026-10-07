import type { Metadata } from "next";
import ProudHeader from "@/components/proud/ProudHeader";
import ProudFooter from "@/components/proud/ProudFooter";
import { AppleLogo } from "@/components/proud/icons";
import Brand from "@/components/proud/Brand";

export const metadata: Metadata = {
  title: "Proud — Download Proud for Mac",
};

export default function DownloadPage() {
  return (
    <main className="min-h-screen bg-[#f4f4f6]">
      <ProudHeader />

      <section className="flex flex-col items-center px-4 pt-20 md:pt-[110px]">
        <h1 data-reveal="120" className="text-center text-[44px] font-bold leading-[1.02] tracking-[-0.05em] text-[#1c1c1e] sm:text-[64px] md:text-[96px]">
          Download <Brand />
          <br />
          for{" "}
          <span className="relative inline-flex items-baseline whitespace-nowrap">
            <span
              aria-hidden="true"
              className="absolute -left-[0.08em] -right-[0.06em] bottom-[-0.04em] top-[0.52em] bg-[#c7a6f7]"
            />
            <AppleLogo className="relative mr-[0.04em] h-[0.84em] w-[0.7em] self-center -translate-y-[0.04em]" />
            <span className="relative">Mac</span>
          </span>
        </h1>

        <p data-reveal="240" className="mt-10 max-w-[480px] text-center text-[18px] leading-[1.6] text-[#1c1c1e] md:mt-14">
          Once downloaded, run the DMG and move{" "}
          <span translate="no" className="notranslate inline-flex items-center gap-1.5 whitespace-nowrap align-middle font-semibold">
            <img src="/proud-logo.png" alt="" width={22} height={22} className="h-[22px] w-[22px]" />
            Proud
          </span>{" "}
          to your Applications folder <em>before</em> launching it.
        </p>

        <div data-reveal="360" className="mt-12 flex w-full max-w-[384px] flex-col items-center rounded-[24px] border border-[#e3e3e9] bg-[#ececf0] px-8 pb-8 pt-8 md:mt-16">
          <img src="/proud-disk.png" alt="" width={99} height={128} className="h-32 w-auto" />
          <h2 translate="no" className="notranslate mt-8 text-[22px] font-bold tracking-[-0.02em] text-[#1c1c1e]">Proud</h2>
          <p className="mt-1 text-[17px] font-semibold text-[#83838f]">Minimum macOS 15 Sequoia</p>
          <p className="mt-1 text-[15px] font-medium text-[#a3a3ad]">DMG · v1.0</p>
          <a
            href="#"
            className="mt-6 flex items-center gap-2.5 rounded-[12px] bg-[#1c1c1e] px-5 py-3 text-[18px] font-semibold text-white shadow-[0_14px_30px_-8px_rgba(28,28,30,0.45)] transition-transform hover:-translate-y-0.5"
          >
            <AppleLogo className="h-[18px] w-[18px] -translate-y-px" />
            Download
          </a>
        </div>
      </section>

      <ProudFooter />
    </main>
  );
}
