import { ChangelogIcon, ChatIcon } from "./icons";
import DownloadMacLabel from "./DownloadMacLabel";

export default function ProudHeader() {
  return (
    <header data-reveal="0" className="sticky top-0 z-50 flex w-full items-center justify-between bg-[#f4f4f6]/85 px-5 py-4 backdrop-blur-xl md:px-20 md:py-5">
      <div className="flex items-center gap-8">
        <a href="/" className="group flex items-center gap-3">
          <span className="relative flex h-[42px] w-[42px] items-center justify-center">
            <img
              src="/proud-logo.png"
              alt=""
              width={42}
              height={42}
              className="h-[42px] w-[42px] transition-all duration-300 ease-out group-hover:scale-75 group-hover:opacity-0 group-hover:blur-[4px]"
            />
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.4"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="absolute h-[22px] w-[22px] translate-x-1 text-[#1c1c1e] opacity-0 blur-[4px] transition-all duration-300 ease-out group-hover:translate-x-0 group-hover:opacity-100 group-hover:blur-0"
              aria-hidden="true"
            >
              <path d="M20 12H4M11 5l-7 7 7 7" />
            </svg>
          </span>
          <span
            className="text-[22px] font-semibold tracking-[-0.02em] text-[#1c1c1e]"
            style={{ fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", Inter, sans-serif' }}
          >
            Proud
          </span>
          <span className="-mt-5 rounded-md border border-[#b3b3be] px-1.5 text-[13px] font-semibold leading-[18px] text-[#5c5c66]">
            v1.0
          </span>
        </a>
        <span className="hidden -translate-y-1 items-center gap-2 text-[13px] font-medium text-[#83838f] md:flex">
          Powered by
          <img src="/rchlabs.png" alt="rchlabs" width={83} height={26} className="h-[26px] w-auto" />
        </span>
      </div>

      <nav className="flex items-center gap-2 md:gap-4">
        <a
          href="/#faqs"
          className="group/faqs hidden items-center gap-2 rounded-xl px-4 py-3 text-[18px] font-semibold text-[#1c1c1e] transition-colors hover:bg-[#e8e8ed] sm:flex"
        >
          <ChatIcon className="h-[26px] w-[26px]" />
          FAQs
        </a>
        <a
          href="/changelog"
          className="group/changelog hidden items-center gap-2 rounded-xl px-4 py-3 text-[18px] font-semibold text-[#1c1c1e] transition-colors hover:bg-[#e8e8ed] sm:flex"
        >
          <ChangelogIcon play="hover" className="h-[26px] w-[26px]" />
          Changelog
        </a>
        <a
          href="/download"
          className="group flex items-center rounded-2xl bg-[#e8e8ed] px-4 py-3 text-[14px] md:px-5 md:py-[17px] font-semibold text-[#1c1c1e] transition-colors hover:bg-[#dddde3] md:ml-6 md:text-[18px]"
        >
          <DownloadMacLabel />
        </a>
      </nav>
    </header>
  );
}
