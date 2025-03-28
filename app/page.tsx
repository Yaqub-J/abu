
import {
  HeroSection,
  WhoWeAreSection,
  QuoteSection,
  AlumniSuccessSection,
  SupportingChangeSection,
  DownloadAppSection,
  Footer,
} from "@/app/(landing)/landing";
import Navbar from "@/components/landing/Navbar";

export default function Home() {
  return (
    <div>
      <Navbar />
      <HeroSection />
      <WhoWeAreSection />
      <QuoteSection />
      <AlumniSuccessSection />
      <SupportingChangeSection />
      <DownloadAppSection />
      <Footer />
    </div>
  );
}