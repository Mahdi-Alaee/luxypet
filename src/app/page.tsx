import HeroSection from "@/components/medium/HeroSection";
import LatestPuppies from "@/components/medium/LatestPuppies";

// export const dynamic = 'force-dynamic'

export default async function Home() {
  return (
    <main>
      <HeroSection />
      <LatestPuppies />
    </main>
  );
}
