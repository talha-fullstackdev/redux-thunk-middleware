
import React from "react";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import { useSelector } from "react-redux";
import "react-loading-skeleton/dist/skeleton.css"; // Import Skeleton CSS
const Card = () => {
  const { moviesData, isLoading } = useSelector((state) => state.MoviesSlice);

  if (isLoading) {
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
    );
  }

  if (!moviesData || !moviesData.results) {   // Display movie cards if data is available
    return <p className="text-lg mt-2 ">click the button to fetch movies</p>;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6 p-4">
      {moviesData.results.map((movie) => (
        <div
          key={movie.id}
          className="bg-white shadow-lg rounded-lg overflow-hidden"
        >
          <img
            src={
              movie.poster_path
                ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
                : "https://via.placeholder.com/150"
            }
            alt={movie.title || "Movie Poster"}
            className="w-full h-64 object-cover"
          />
          <div className="p-4">
            <h2 className="text-lg font-semibold mb-2">{movie.title || "No Title"}</h2>
            <p className="text-sm text-gray-600 mb-2">
              {movie.overview || "No Description Available"}
            </p>
            <p className="text-sm text-gray-500">
              <strong>Release Date:</strong> {movie.release_date || "N/A"}
            </p>
            <p className="text-sm text-gray-500">
              <strong>Rating:</strong> {movie.vote_average || "N/A"} / 10
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Card;
