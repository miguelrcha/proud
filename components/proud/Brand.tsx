import { Fragment } from "react";

// Keeps the brand name out of browser translation (Google Translate, Safari, etc.).
export const noTranslate = { translate: "no", className: "notranslate" } as const;

export default function Brand() {
  return <span {...noTranslate}>Proud</span>;
}

// Renders a plain string, protecting every "Proud" inside it from translation.
export function withBrand(text: string) {
  return text.split("Proud").map((part, i) => (
    <Fragment key={i}>
      {i > 0 && <Brand />}
      {part}
    </Fragment>
  ));
}
