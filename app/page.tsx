import ProudHeader from "@/components/proud/ProudHeader";
import ProudHero from "@/components/proud/ProudHero";
import ProudFeatures from "@/components/proud/ProudFeatures";
import ProudCards from "@/components/proud/ProudCards";
import ProudFooter from "@/components/proud/ProudFooter";

export default function Home() {
  return (
    <main className="min-h-screen bg-[#f4f4f6]">
      <ProudHeader />
      <ProudHero />
      <ProudFeatures />
      <ProudCards />
      <ProudFooter />
    </main>
  );
}
