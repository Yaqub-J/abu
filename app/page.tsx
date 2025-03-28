
import {
  HeroSection,
  WhoWeAreSection,
  QuoteSection,
  AlumniSuccessSection,
  SupportingChangeSection,
  DownloadAppSection,
  Footer,
} from "@/app/(landing)/landing";

export default function Home() {
  return (
    <div>
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