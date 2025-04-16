import AttendanceChart from "@/app/components/AttendanceChart";
import Announcements from "../../components/Announcements";
import EventCalendar from "../../components/EventCalendar";
import FinanceChart from "@/app/components/FinanceChart";
import Image from "next/image";

const StudentPage = () => {
  return (
    <div className="p-4 flex gap-4 flex-row xl:flex-col">
      <div className="p-4 flex gap-4 flex-col xl:flex-row">
        {/* LEFT */}
        <div className="w-full xl:w-1/2">
          <div className="h-screen bg-white p-4 rounded-md">
               <div className="h-full relative">
                 <Image
                  src="/Graduate.png" // Change To Background
                  alt="Graduate celebrating"
                  width={600}
                  height={400}
                  className="object-cover h-full w-full"/>
                </div>
          </div>
        </div>
        {/* RIGHT */}
        <div className="w-full xl:w-1/2 flex flex-col gap-8">
        <FinanceChart />
        </div>
      </div>
      <AttendanceChart/>
      <Announcements />

      <div className="p-4 flex gap-4 flex-col xl:flex-row">
        {/* LEFT */}
        <div className="w-full xl:w-1/2">
          <div className="h-screen bg-white p-4 rounded-md">
            <FinanceChart />
          </div>
        </div>
        {/* RIGHT */}
        <div className="w-full xl:w-1/2 flex flex-col gap-8">
          <EventCalendar />
        </div>
      </div>

    </div>
  );
};

export default StudentPage;