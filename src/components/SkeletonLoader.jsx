import React from 'react'
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css"; // Import Skeleton CSS
const SkeletonLoader = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6 p-4">
    {Array.from({ length: 16 }).map((_, index) => (
      <div
        key={index}
        className="shadow-lg rounded-lg overflow-hidden p-4"
      >
        <SkeletonTheme baseColor="#C0C0C0" highlightColor="#A9A9A9"  duration={1.2}>
          <Skeleton height="300px" width="100%" />
          <div className="mt-4">
            <Skeleton width="80%" height="25px" />
            <Skeleton width="60%" height="20px" className="mt-2" />
            <Skeleton width="50%" height="20px" className="mt-2" />
          </div>
        </SkeletonTheme>
      </div>
    ))}
  </div>
  )
}

export default SkeletonLoader