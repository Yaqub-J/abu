import AboutSection from "@/components/landing/About";
import AlumniAssociation from "@/components/landing/Alumni";
import AlumniFooter from "@/components/landing/Footer";
import Hero from "@/components/landing/Hero";
import Initiatives from "@/components/landing/Initiatives";
import MobileAppDownload from "@/components/landing/MobileApp";
import AlumniSuccessStories from "@/components/landing/Stories";

export function HeroSection() {
    return (
      <Hero />
    );
  }

  export function WhoWeAreSection() {
    return (
      <AboutSection />
    );
  }

  export function QuoteSection() {
    return (
      <Initiatives />
    );
  }

  export function AlumniSuccessSection() {
    return (
      <AlumniSuccessStories />
    );
  }

  export function SupportingChangeSection() {
    return (
      <AlumniAssociation />
    );
  }

  export function DownloadAppSection() {
    return (
      <MobileAppDownload />
    );
  }


  export function Footer() {
    return (
      <AlumniFooter />
    );
  }