import PastEvents from "./sections/past";
import RecentEventsWithSwiper from "./sections/recent";
import UpcomingEvents from "./sections/upcoming";

export default function Events() {
  return (
    <div>
      <RecentEventsWithSwiper/>
      <UpcomingEvents/>
      <PastEvents/>
    </div>
  );
}