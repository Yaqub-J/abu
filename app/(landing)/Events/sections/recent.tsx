'use client'; 
import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper/modules';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';

interface EventProps {
  id: string;
  title: string;
  date: string;
  attendees?: string;
  image?: string;
  isLatest?: boolean;
  url?: string;
}

const EventCard: React.FC<EventProps> = ({ title, date, attendees, image, isLatest, url }) => {
  return (
    <Link
      href={url || '#'}
      className="block h-full"
    >
      <div className="flex flex-col h-full rounded-lg overflow-hidden bg-green-50">
        <div className="relative aspect-[16/10] w-full">
          {image ? (
            <Image
              src={image}
              alt={title || "Event image"}
              className="object-cover"
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          ) : (
            <div className="w-full h-full bg-white"></div>
          )}
          {isLatest && (
            <div className="absolute top-4 right-4 bg-green-700 text-white py-1 px-4 rounded-full text-sm font-medium z-10">
              Latest
            </div>
          )}
        </div>
        <div className="p-6 flex-grow">
          {title && <h3 className="text-2xl font-bold text-gray-900 mb-2">{title}</h3>}
          {date && <p className="text-gray-600 mb-1">{date}</p>}
          {attendees && <p className="text-gray-600">{attendees}</p>}
        </div>
      </div>
    </Link>
  );
};

const RecentEventsWithSwiper: React.FC = () => {
  const events: EventProps[] = [
    {
        id: "1",
        title: "Set of 1996 Reunion",
        date: "25 MARCH 2022",
        attendees: "300+ Attendees",
        image: "/1996-reunion.png",
        isLatest: true,
        url: "/events/1996-reunion"
      },
      {
        id: "2",
        title: "",
        date: "25 MARCH 2022",
        image: "/1996-reunion.png",

        isLatest: true,
        url: "/events/alumni-gala"
      },
      {
        id: "3",
        title: "Faculty Awards Night",
        date: "10 APRIL 2022",
        attendees: "150+ Attendees",
        image: "/1996-reunion.png",
        url: "/events/faculty-awards"
      },
      {
        id: "4",
        title: "Homecoming Weekend",
        date: "15 MAY 2022",
        attendees: "500+ Attendees",
        image: "/1996-reunion.png",
        url: "/events/homecoming"
      }
    ];

  return (
    <section className="py-16">
      <div className="container mx-auto px-4 max-w-7xl">
        <h2 className="text-4xl font-bold mb-12">Recent Events</h2>
        
        <Swiper
          modules={[Pagination]}
          spaceBetween={24}
          slidesPerView={1}
          breakpoints={{
            768: {
              slidesPerView: 2,
            },
            1024: {
              slidesPerView: 3,
            },
          }}
          pagination={{
            clickable: true,
            el: '.swiper-pagination',
            bulletClass: 'w-3 h-3 inline-block mx-1 rounded-full bg-gray-200',
            bulletActiveClass: '!bg-green-500',
          }}
          className="mySwiper"
        >
          {events.map((event) => (
            <SwiperSlide key={event.id}>
              <EventCard {...event} />
            </SwiperSlide>
          ))}
          <div className="swiper-pagination mt-10 text-center"></div>
        </Swiper>
      </div>
    </section>
  );
};

export default RecentEventsWithSwiper;
