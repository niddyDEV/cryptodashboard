"use client";

import Image from "next/image";

export default function Loading() {
  return (
    <div className='loadingContainer bg-black'>
      <div className='spinner'>
        <Image
          src="/images/triangle.png"
          alt="Loading indicator"
          width={50}
          height={50}
          className="spinningTriangle"
        />
      </div>
    </div>
  );
}