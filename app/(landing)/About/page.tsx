import MobileAppDownload from '@/components/landing/MobileApp';
import AlumniSection from './sections/whoweare';
import WhatWeDoSection from './sections/whatwedo';
import SupportingPriorities from './sections/priorities';
import PhilanthropySection from './sections/philantropy';


export default function About() {
  return (
    <>
    <AlumniSection />
    <WhatWeDoSection/>
    <SupportingPriorities/>
    <PhilanthropySection/>
    <MobileAppDownload />
    </>
  );
}


