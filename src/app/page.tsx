import HeroSection from "@/components/medium/HeroSection";
import LatestPuppies from "@/components/medium/LatestPuppies";

// export const dynamic = 'force-dynamic'

export default async function Home() {
  const res = await fetch('http://localhost:3000/api/product');
  console.log({res});
  const data = await res.json();
  console.log({data});
  

  return (
    <main>
      <HeroSection />
      <LatestPuppies />


      <br /><br /><br /><br /><br /><br />
      <br /><br /><br /><br /><br /><br />
      <br /><br /><br /><br /><br /><br />
      <br /><br /><br /><br /><br /><br />
    </main>
  );
}
