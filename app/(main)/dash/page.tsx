"use client";

import React, { useState } from 'react';
import { 
  CalendarIcon, 
  CheckIcon, 
  BookmarkIcon, 
  LightbulbIcon, 
  ChevronDownIcon,
  FlipHorizontalIcon,
  MarsIcon
} from 'lucide-react';


import AttendanceChart from "@/app/components/AttendanceChart";
import Announcements from "../../components/Announcements";
import EventCalendar from "../../components/EventCalendar";
import FinanceChart from "@/app/components/FinanceChart";
import Image from "next/image";
import AlumniDashboard from "./AlumniDashboard";

const StudentPage = () => {

    const [welcomeVisible, setWelcomeVisible] = useState(true);
  
  return (
    <div className="p-4 flex gap-4 flex-row xl:flex-col">
              {/* Welcome Banner */}
              {welcomeVisible && (
          <div className="bg-white rounded-lg shadow p-4 relative">
            <button 
              onClick={() => setWelcomeVisible(false)}
              className="absolute right-4 top-4"
            >
              <MarsIcon className="h-5 w-5 text-gray-500" />
            </button>
            <p className="text-gray-600">Welcome To Admin Dashboard</p>
          </div>
        )}

      <AlumniDashboard/>
    </div>
  );
};

export default StudentPage;