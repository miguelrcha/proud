import type { Metadata } from "next";
import type { ReactNode } from "react";
import ProudHeader from "@/components/proud/ProudHeader";
import ProudFooter from "@/components/proud/ProudFooter";
import { ChangelogIcon } from "@/components/proud/icons";
import { changelog, changelogUpdated } from "@/components/proud/changelog";

export const metadata: Metadata = {
  title: "Proud — Changelog",
};

function SparkleIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="h-[18px] w-[18px]" aria-hidden="true">
      <path d="M10 3.5c.6 4.4 2.1 5.9 6.5 6.5-4.4.6-5.9 2.1-6.5 6.5-.6-4.4-2.1-5.9-6.5-6.5 4.4-.6 5.9-2.1 6.5-6.5Z" />
      <path d="M18 13.5c.3 2.1 1 2.8 3 3-2 .3-2.7 1-3 3-.3-2-1-2.7-3-3 2-.2 2.7-.9 3-3Z" />
      <path d="M18 2c.2 1.3.7 1.8 2 2-1.3.2-1.8.7-2 2-.2-1.3-.7-1.8-2-2 1.3-.2 1.8-.7 2-2Z" />
    </svg>
  );
}

function BugIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" className="h-[18px] w-[18px]" aria-hidden="true">
      <path d="M8 7.5a4 4 0 0 1 8 0" />
      <rect x="7" y="8" width="10" height="12" rx="5" fill="currentColor" stroke="none" />
      <path d="M12 9v11M3.5 10.5 7 12M20.5 10.5 17 12M3 15.5h4M21 15.5h-4M4 20.5l3.5-2M20 20.5l-3.5-2M9.5 3.5 10.5 5M14.5 3.5 13.5 5" />
      <path d="M12 10v9" stroke="#f4f4f6" strokeWidth="1.4" />
    </svg>
  );
}

function ChangeGroup({ title, icon, items }: { title: string; icon: ReactNode; items?: string[] }) {
  if (!items?.length) return null;
  return (
    <div>
      <h3 className="flex items-center gap-2 text-[18px] font-bold text-[#1c1c1e]">
        {icon}
        {title} ({items.length})
      </h3>
      <ul className="mt-3 space-y-2 text-[17px] leading-[1.5] text-[#6b6b75]">
        {items.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </div>
  );
}

export default function ChangelogPage() {
  return (
    <main className="min-h-screen bg-[#f4f4f6]">
      <ProudHeader />

      <section className="mx-auto w-full max-w-[800px] px-5 pt-20 md:pt-[110px]">
        <div data-reveal="120">
          <h1 className="text-[56px] font-bold leading-[1.02] tracking-[-0.05em] text-[#1c1c1e] md:text-[96px]">
            Changelog
          </h1>
          <p className="mt-3 flex items-center gap-2 text-[18px] text-[#83838f]">
            <ChangelogIcon id="changelog-icon-page" play="load" delay={700} className="h-[18px] w-[18px] text-[#b3b3be]" />
            Updated {changelogUpdated}
          </p>
        </div>

        {changelog.map((major, i) => (
          <div key={major.version} data-reveal={i === 0 ? "240" : "0"} className="mt-14 md:mt-16">
            <h2 className="text-[34px] font-bold tracking-[-0.03em] text-[#1c1c1e]">{major.version}</h2>
            <p className="mt-5 max-w-[720px] text-[18px] leading-[1.6] text-[#1c1c1e]">{major.summary}</p>

            <ul className="mt-8">
              {major.releases.map((release) => (
                <li key={release.version} className="border-b border-[#e3e3e9]">
                  <details className="group">
                    <summary className="flex cursor-pointer list-none items-center gap-4 py-5 [&::-webkit-details-marker]:hidden">
                      <svg
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.8"
                        strokeLinecap="round"
                        className="h-[22px] w-[22px] shrink-0 text-[#83838f]"
                        aria-hidden="true"
                      >
                        <path d="M12 4v16" className="transition-opacity duration-200 group-open:opacity-0" />
                        <path d="M4 12h16" />
                      </svg>
                      <span className="text-[24px] font-semibold tracking-[-0.02em] text-[#4a4a52] transition-colors group-open:text-[#1c1c1e] group-hover:text-[#1c1c1e]">
                        {release.version}
                      </span>
                      <span className="ml-auto text-[16px] text-[#a3a3ad]">{release.date}</span>
                    </summary>
                    <div className="space-y-6 pb-7 pl-[38px]">
                      <ChangeGroup title="Features" icon={<SparkleIcon />} items={release.features} />
                      <ChangeGroup title="Fixes" icon={<BugIcon />} items={release.fixes} />
                    </div>
                  </details>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </section>

      <ProudFooter />
    </main>
  );
}
