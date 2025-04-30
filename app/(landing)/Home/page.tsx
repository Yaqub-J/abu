import AboutSection from "./landing/About";
import AlumniAssociation from "./landing/Alumni";
import Hero from "./landing/Hero";
import Initiatives from "./landing/Initiatives";
import MobileAppDownload from "./landing/MobileApp";
import AlumniSuccessStories from "./landing/Stories";

export default function Page() {
    return (
      <>
      <Hero />
      <AboutSection />
      <Initiatives />
      <AlumniAssociation />
      <MobileAppDownload />
      </>
    );
  }

