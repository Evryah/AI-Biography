import React from 'react';

export default function Watermark() {
  return (
    <div className="absolute bottom-4 right-4 pointer-events-none opacity-[0.06] md:opacity-[0.08] lg:opacity-[0.10] w-[200px] h-[200px] select-none transition-all duration-700">
      <svg
        viewBox="0 0 100 100"
        fill="currentColor"
        className="w-full h-full text-legacy-gold"
      >
        {/* Ancient book with a quill watermark */}
        <path d="M20 80h60v-6H20v6z" />
        <path d="M25 74h50V25c0-5-4-9-9-9H34c-5 0-9 4-9 9v49z" fillRule="evenodd" clipRule="evenodd" />
        <path d="M34 20h32v4H34v-4zm0 10h32v4H34v-4zm0 10h20v4H34v-4z" fill="white" />
        {/* Quill overlaying the book */}
        <path
          d="M75 15c-6 0-12 6-15 11 3 1 6 3 8 6 5-3 11-9 11-15-2-1-3-2-4-2z"
          fill="currentColor"
        />
        <path
          d="M60 26l-12 18c-1 2-2 4-2 7l1 5 5-2c2-1 4-2 6-4l12-18-10-6z"
          fill="currentColor"
        />
        <path d="M48 51l-4 6 6-1-2-5z" fill="currentColor" />
      </svg>
    </div>
  );
}
