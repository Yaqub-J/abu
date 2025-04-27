"use client";

import React, { useState } from 'react';
import { 
  CalendarIcon, 
  CheckIcon, 
  BookmarkIcon, 
  LightbulbIcon, 
  ChevronDownIcon,
  FlipHorizontalIcon,
} from 'lucide-react';
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer,
  } from "recharts";
  
import Calendar from 'react-calendar';
import "react-calendar/dist/Calendar.css";
import FinanceChart from '@/app/components/FinanceChart';

const data = [
  {
    name: "2019",
    male: 600,
    female: 400,
  },
  {
    name: "2020",
    male: 700,
    female: 600,
  },
  {
    name: "2021",
    male: 900,
    female: 750,
  },
  {
    name: "2022",
    male: 900,
    female: 750,
  },
  {
    name: "2023",
    male: 650,
    female: 550,
  },
];


interface AlumniActivityData {
  day: string;
  thisMonth: number;
  lastMonth: number;
}

interface ScoreActivityData {
  month: string;
  thisMonth: number;
  lastMonth: number;
}

const AlumniDashboard: React.FC = () => {
  const [selectedMonth, setSelectedMonth] = useState('This Month');
  
  // Sample data for Alumni Activity chart
  const alumniActivityData: AlumniActivityData[] = [
    { day: 'Mon', thisMonth: 40, lastMonth: 60 },
    { day: 'Tue', thisMonth: 50, lastMonth: 70 },
    { day: 'Wed', thisMonth: 40, lastMonth: 80 },
    { day: 'Thu', thisMonth: 60, lastMonth: 50 },
    { day: 'Fri', thisMonth: 90, lastMonth: 60 },
    { day: 'Sat', thisMonth: 95, lastMonth: 90 },
  ];

  // Sample data for Score Activity chart
  const scoreActivityData: ScoreActivityData[] = [
    { month: 'Jan', thisMonth: 120, lastMonth: 70 },
    { month: 'Feb', thisMonth: 90, lastMonth: 50 },
    { month: 'Mar', thisMonth: 70, lastMonth: 15 },
    { month: 'Apr', thisMonth: 40, lastMonth: 70 },
    { month: 'May', thisMonth: 50, lastMonth: 40 },
    { month: 'Jun', thisMonth: 15, lastMonth: 70 },
    { month: 'Jul', thisMonth: 70, lastMonth: 100 },
    { month: 'Aug', thisMonth: 90, lastMonth: 50 },
    { month: 'Sep', thisMonth: 70, lastMonth: 15 },
    { month: 'Oct', thisMonth: 40, lastMonth: 40 },
    { month: 'Nov', thisMonth: 50, lastMonth: 50 },
    { month: 'Dec', thisMonth: 15, lastMonth: 100 },
  ];

  // Calculate max value for proper scaling of the charts
  const maxAlumniValue = Math.max(
    ...alumniActivityData.flatMap(item => [item.thisMonth, item.lastMonth])
  );
  
  const maxScoreValue = Math.max(
    ...scoreActivityData.flatMap(item => [item.thisMonth, item.lastMonth])
  );

  // Calendar data
  const calendarDays = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];
  const calendarDates = [
    [23, 24, 25, 26, 27, 28, 1],
    [2, 3, 4, 5, 6, 7, 8],
    [9, 10, 11, 12, 13, 14, 15],
    [16, 17, 18, 19, 20, 21, 22],
    [23, 24, 25, 26, 27, 28, 29],
    [30, 31, 1, 2, 3, 4, 5]
  ];

  return (
    <div className="bg-gray-100 min-h-screen">
      {/* Content */}
      <div className="p-4 space-y-4">

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          {/* Join Now Banner */}
          <div className="bg-gradient-to-br from-green-600 to-green-500 text-white p-6 rounded-lg shadow lg:col-span-1">
            <div className="flex justify-between">
              <div className="space-y-4">
                <h2 className="text-2xl font-bold">Join Now and get connected to top ABU Alumni network</h2>
                <p className="text-sm opacity-90">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt.</p>
              </div>
              <div className="flex-shrink-0 relative">
                {/* Calendar decoration */}
                <div className="absolute top-0 right-0 opacity-20">
                  <CalendarIcon className="h-16 w-16" />
                </div>
              </div>
            </div>
            <div className="mt-6">
              <img 
                src="/Student-with-glasses.png" 
                alt="Student with glasses" 
                className="rounded-lg max-w-full h-auto"
              />
            </div>
          </div>

          {/* Alumni Activity Chart */}
          <FinanceChart/>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Alumni Count */}
          <div className="bg-white rounded-lg shadow overflow-hidden">
            <div className="p-4 bg-green-100 flex justify-between">
              <div className="flex items-center">
                <div className="bg-green-500 text-white p-2 rounded">
                  <CheckIcon className="h-5 w-5" />
                </div>
                <div className="ml-4">
                  <h3 className="text-2xl font-bold text-green-800">1,500</h3>
                  <p className="text-green-600">Alumni</p>
                </div>
              </div>
              <div className="flex items-center justify-center">
                <div className="w-12 h-12 bg-green-200 flex items-center justify-center rounded">
                  <CheckIcon className="h-6 w-6 text-green-600" />
                </div>
              </div>
            </div>
          </div>

          {/* Publications Count */}
          <div className="bg-white rounded-lg shadow overflow-hidden">
            <div className="p-4 bg-green-50 flex justify-between">
              <div className="flex items-center">
                <div className="bg-green-400 text-white p-2 rounded">
                  <BookmarkIcon className="h-5 w-5" />
                </div>
                <div className="ml-4">
                  <h3 className="text-2xl font-bold text-green-700">1,112</h3>
                  <p className="text-green-500">Publications</p>
                </div>
              </div>
              <div className="flex items-center justify-center">
                <div className="w-12 h-12 bg-green-100 flex items-center justify-center rounded">
                  <BookmarkIcon className="h-6 w-6 text-green-500" />
                </div>
              </div>
            </div>
          </div>

          {/* Events Count */}
          <div className="bg-white rounded-lg shadow overflow-hidden">
            <div className="p-4 bg-green-600 flex justify-between">
              <div className="flex items-center">
                <div className="bg-green-700 text-white p-2 rounded">
                  <LightbulbIcon className="h-5 w-5" />
                </div>
                <div className="ml-4">
                  <h3 className="text-2xl font-bold text-white">903</h3>
                  <p className="text-green-100">Events</p>
                </div>
              </div>
              <div className="flex items-center justify-center">
                <div className="w-12 h-12 bg-green-500 flex items-center justify-center rounded">
                  <LightbulbIcon className="h-6 w-6 text-white" />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Score Activity Chart */}
        <div className="bg-white p-6 rounded-lg shadow h-[400px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart width={500} height={300} data={data} barSize={20}>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#ddd" />
                      <XAxis
                        dataKey="name"
                        axisLine={false}
                        tick={{ fill: "#d1d5db" }}
                        tickLine={false}
                      />
                      <YAxis axisLine={false} tick={{ fill: "#d1d5db" }} tickLine={false} />
                      <Tooltip
                        contentStyle={{ borderRadius: "10px", borderColor: "lightgray" }}
                      />
                      <Legend
                        align="left"
                        verticalAlign="top"
                        wrapperStyle={{ paddingTop: "20px", paddingBottom: "40px" }}
                      />
                      <Bar
                        dataKey="female"
                        fill="#A2F8CD"
                        legendType="circle"
                        radius={[10, 10, 0, 0]}
                      />
                      <Bar
                        dataKey="male"
                        fill="#00AD6F"
                        legendType="circle"
                        radius={[10, 10, 0, 0]}
                      />
                    </BarChart>
                  </ResponsiveContainer>
        </div>

        {/* Bottom Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Progress Card */}
          <div className="bg-white p-6 rounded-lg shadow">
            <div className="flex flex-col items-center">
              <div className="relative w-32 h-32">
                <svg className="w-32 h-32" viewBox="0 0 100 100">
                  <circle 
                    cx="50" 
                    cy="50" 
                    r="40" 
                    fill="none" 
                    stroke="#e6ffef" 
                    strokeWidth="10" 
                  />
                  <circle 
                    cx="50" 
                    cy="50" 
                    r="40" 
                    fill="none" 
                    stroke="#16a34a" 
                    strokeWidth="10" 
                    strokeDasharray="251.2" 
                    strokeDashoffset="62.8" 
                    transform="rotate(-90 50 50)" 
                  />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-3xl font-bold">75%</span>
                </div>
              </div>
              
              <h3 className="mt-4 text-lg font-medium">My Progress</h3>
              <p className="mt-2 text-sm text-gray-500 text-center">
                Lorem ipsum dolor sit amet, consectetur
              </p>
              <button className="mt-4 bg-green-600 text-white py-2 px-4 rounded">
                More Details
              </button>
            </div>
          </div>

          {/* Calendar */}
          <div className="bg-green-600 p-6 rounded-lg shadow">
            <Calendar 
              className="!bg-green-600 border-0 rounded" 
              tileClassName={() => "!text-white hover:!bg-green-500"}
              calendarType="gregory"
              navigationLabel={({ date }) => (
                <span className="text-white">
                  {date.toLocaleString('default', { month: 'long', year: 'numeric' })}
                </span>
              )}
              formatDay={(locale, date) => date.toLocaleDateString(locale, { weekday: 'short' }).slice(0, 2)}
            />
          </div>
      </div>
    </div>
    </div>
  );
};

export default AlumniDashboard;