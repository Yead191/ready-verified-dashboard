"use client";
import Image from "next/image";
import React from "react";

const Spinner = () => {
  return (
    <div className="flex flex-col items-center justify-center h-[calc(100vh-64px)] gap-4 w-full bg-[#F8FAFF] rounded-xl">
      {/* Logo with scale animation */}
      <div className="scale-pulse">
        <Image
          src={"/images/logo.png"}
          alt="Ready Verified Logo"
          width={200}
          height={100}
        />
      </div>

      {/* Optional: Spinner below logo */}
      {/* <div className="w-8 h-8 border-4 border-dashed rounded-full border-gray-400 border-t-transparent animate-spin"></div> */}

      {/* Custom animation style */}
      <style jsx>{`
        @keyframes scalePulse {
          0%,
          100% {
            transform: scale(1);
          }
          50% {
            transform: scale(1.2);
          }
        }

        .scale-pulse {
          animation: scalePulse 1.5s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
};

export default Spinner;
