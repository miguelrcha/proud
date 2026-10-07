import { AppleLogo } from "./icons";

// Content for a "Download for Mac" link. The parent <a> needs the `group` class:
// on hover the Apple logo slides out and an arrow slides in after "Mac".
export default function DownloadMacLabel() {
  return (
    <>
      <span className="mr-[0.55em] flex w-[1.25em] overflow-hidden transition-all duration-300 ease-out group-hover:mr-0 group-hover:w-0 group-hover:opacity-0">
        <AppleLogo className="h-[1.25em] w-[1.25em] shrink-0 -translate-y-px transition-all duration-300 ease-out group-hover:-translate-x-full group-hover:blur-[4px]" />
      </span>
      Download for Mac
      <span className="flex w-0 -translate-x-1 overflow-hidden opacity-0 blur-[4px] transition-all duration-300 ease-out group-hover:ml-[0.5em] group-hover:w-[1em] group-hover:translate-x-0 group-hover:opacity-100 group-hover:blur-0">
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.6"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="h-[1em] w-[1em] shrink-0"
          aria-hidden="true"
        >
          <path d="M4 12h16M13 5l7 7-7 7" />
        </svg>
      </span>
    </>
  );
}
