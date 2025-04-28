import CampusNewsSection from "./sections/CampusNews";
import NewsPage from "./sections/NewsPage";
import AlumniTestimonialSection from "./sections/testimonial";

export default function News() {
  return (
    <div>
      <AlumniTestimonialSection/>
      <CampusNewsSection/>
      <NewsPage/>
    </div>
  );
}