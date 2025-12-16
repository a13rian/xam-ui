"use client";

import React from "react";
import Link from "next/link";

export const PageNotFound = () => {
  return (
    <div className="w-full h-screen flex flex-col items-center justify-center">
      <svg
        className="w-1/2 md:1/3 lg:w-1/4 text-gray-900"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 860.13137 571.14799"
        xmlnsXlink="http://www.w3.org/1999/xlink"
      >
        <path
          d="M605.66974,324.95306c-7.66934-12.68446-16.7572-26.22768-30.98954-30.36953-16.482-4.7965-33.4132,4.73193-47.77473,14.13453a1392.15692,1392.15692,0,0,0-123.89338,91.28311l.04331.49238q46.22556-3.1878,92.451-6.37554c22.26532-1.53546,45.29557-3.2827,64.97195-13.8156,7.46652-3.99683,14.74475-9.33579,23.20555-9.70782,10.51175-.46217,19.67733,6.87923,26.8802,14.54931,42.60731,45.371,54.937,114.75409,102.73817,154.61591A1516.99453,1516.99453,0,0,0,605.66974,324.95306Z"
          transform="translate(-169.93432 -164.42601)"
          fill="#f2f2f2"
        ></path>
        <circle cx="649.24878" cy="51" r="51" fill="currentColor"></circle>
        <path
          d="M1028.875,735.26666l-857.75.30733a1.19068,1.19068,0,1,1,0-2.38136l857.75-.30734a1.19069,1.19069,0,0,1,0,2.38137Z"
          transform="translate(-169.93432 -164.42601)"
          fill="#cacaca"
        ></path>
      </svg>
      <div className="flex flex-col items-center justify-center">
        <p className="text-3xl md:text-4xl lg:text-5xl text-gray-800 mt-12">
          Page Not Found
        </p>
        <p className="md:text-lg lg:text-xl text-gray-600 mt-8">
          Sorry, the page you are looking for could not be found.
        </p>
        <Link
          href="/"
          className="flex items-center space-x-2 bg-gray-900 hover:bg-gray-800 text-gray-100 px-4 py-2 mt-12 rounded transition duration-150"
          title="Return Home"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M9.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L7.414 9H15a1 1 0 110 2H7.414l2.293 2.293a1 1 0 010 1.414z"
              clipRule="evenodd"
            ></path>
          </svg>
          <span>Return Home</span>
        </Link>
      </div>
    </div>
  );
};
