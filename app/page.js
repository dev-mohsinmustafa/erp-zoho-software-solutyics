import Hero from "@/components/ui/Hero";
import Link from "next/link";
import Footer from "@/components/ui/Footer";
import Navbar from "@/components/ui/Navbar";

export default function Home() {
  return (
    <>
      <div>
        <Navbar />
        <Hero />
        <Footer />
        {/* <div className="flex flex-col items-center justify-center min-h-screen ">
          <h2 className="text-3xl mb-4 ">Inventory Management Software</h2>
          <Link href="/dashboard/home/overview">View Dashboard</Link>
        </div> */}
      </div>
    </>

  );
}
