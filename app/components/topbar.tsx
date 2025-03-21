"use client";
import * as React from "react";

/**
 * TopBar component that displays contact information and login/signup button
 * Uses semantic HTML for better accessibility
 */
function TopBar() {
  return (
    <header className="flex justify-between items-center px-5 py-0 w-full bg-zinc-700 h-[60px] max-sm:px-2.5 max-sm:py-0">
      <address className="flex gap-10 max-md:gap-5 max-sm:flex-col max-sm:gap-1.5 max-sm:text-sm not-italic">
        <p className="text-base font-medium text-white max-sm:text-sm">
          Email address: alumniabu@gmail.com
        </p>
        <p className="text-base font-medium text-white max-sm:text-sm">
          Contact no.: 0917689999965
        </p>
      </address>
      <button className="px-5 py-3 text-base text-black bg-blue-50 cursor-pointer max-sm:px-4 max-sm:py-2 max-sm:text-sm">
        Login/signup
      </button>
    </header>
  );
}

export default TopBar;
