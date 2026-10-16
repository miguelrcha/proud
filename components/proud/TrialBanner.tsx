// Purple strip above the header announcing the free trial. Animated via .trial-banner in globals.css.
export default function TrialBanner() {
  return (
    <div className="trial-banner relative overflow-hidden bg-[#c7a6f7] px-4 py-2.5 text-center text-[14px] font-medium leading-snug text-[#1c1c1e] md:text-[15px]">
      <span className="relative">
        <span className="font-bold">Free trial period:</span> Proud is free to use for now. Once the trial ends, it will
        become a paid app.
      </span>
    </div>
  );
}
