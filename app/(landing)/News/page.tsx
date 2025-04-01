import CampusNewsSection from "./sections/CampusNews";
import AtikuAbubakarInterview from "./sections/interview";
import LegacySlider from "./sections/legacy";
import NewsPage from "./sections/NewsPage";
import AlumniTestimonialSection from "./sections/testimonial";

export default function News() {
  return (
    <div>
      <AlumniTestimonialSection/>
      <AtikuAbubakarInterview/>
      <LegacySlider/>
      <CampusNewsSection/>
      <NewsPage/>
    </div>
  );
}