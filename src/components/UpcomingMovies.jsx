import React, { useEffect, useState } from "react";
import MovieCard from "./MovieCard";

const UpcomingMovies = () => {
  const [page, setPage] = useState(1);
  const handlePrevious = () => {
    if (page === 1) return;
    setPage(page - 1);
  };
  const handleNext = () => {
    if (page === upcomingMovies.length) return;
    setPage(page + 1);
  };
  const [upcomingMovies, setUpcomingMovies] = useState([]);
  const fetchUpcomingMovies = async () => {
    const url = `https://api.themoviedb.org/3/movie/upcoming?language=en-US&page=${page}`;
    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkZjE0ZmE4MzJjNmVjMTBkNmFlODg5MTlkNTljMDhhZCIsIm5iZiI6MTc2MjY5MTg2Ni4zODgsInN1YiI6IjY5MTA4YjFhYzdkZGE1YzgxM2EwYzYwNyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.VhVNIUr0cSYi1xgbhI2hf0QGYLqn8bkmHnHnE4ywfiU",
      },
    };

    try {
      const res = await fetch(url, options);
      const data = await res.json();
      setUpcomingMovies(data.results);
    } catch (error) {
      console.error(error);
    }
  };

  const [watchList, setWatchList] = useState([]);

  useEffect(() => {
    fetchUpcomingMovies();
  }, [page]);

  useEffect(() => {
  const moviesFromLocalStorage = localStorage.getItem("watchList");
  if (moviesFromLocalStorage) {
    setWatchList(JSON.parse(moviesFromLocalStorage));
  }
}, []);

  const handleAddToWatchList = (upcomingMovie) => {
    const updatedList = [...watchList, upcomingMovie];
    setWatchList(updatedList);
    localStorage.setItem("watchList", JSON.stringify(updatedList));
  };
  const handleRemoveFromWatchList = (upcomingMovie) => {
    let updatedList = watchList.filter((watch)=> watch.id !== upcomingMovie.id)
    setWatchList(updatedList);
    localStorage.setItem("watchList", JSON.stringify(updatedList));
  }
  function inWathcList(movieObj) {
  return watchList.some((movie) => movie.id === movieObj.id);
  }

  return (
    <div>
      <h1
        className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-center my-6 
             bg-linear-to-r from-indigo-500 via-purple-500 to-pink-500 
             bg-clip-text text-transparent drop-shadow-md tracking-tight leading-normal"
      >
        🎬 Upcoming Movies
      </h1>

      <div className="p-6 md:p-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {upcomingMovies.map((upcomingMovie) => (
          <MovieCard
            key={upcomingMovie.id}
            upcomingMovie={upcomingMovie}
            handleAddToWatchList={handleAddToWatchList}
            handleRemoveFromWatchList={handleRemoveFromWatchList}
            inWathcList={inWathcList}
          />
        ))}
      </div>
      <div className="w-full">
        <div className="mx-auto flex items-center justify-center gap-4 py-6 max-w-xs sm:max-w-sm md:max-w-md">
          {/* Previous Button */}
          <button
            onClick={handlePrevious}
            className="px-4 py-2 rounded-full bg-gray-800 text-white text-lg font-semibold 
                 hover:bg-gray-700 transition-all duration-300 
                 disabled:opacity-50 disabled:cursor-not-allowed 
                 active:scale-95 shadow-md"
          >
            ‹
          </button>

          {/* Page Number */}
          <span
            className="text-base sm:text-lg md:text-xl font-medium text-gray-800 
                 bg-gray-100 px-4 py-2 rounded-lg shadow-sm select-none"
          >
            {page}
          </span>

          {/* Next Button */}
          <button
            onClick={handleNext}
            className="px-4 py-2 rounded-full bg-gray-800 text-white text-lg font-semibold 
                 hover:bg-gray-700 transition-all duration-300 
                 disabled:opacity-50 disabled:cursor-not-allowed 
                 active:scale-95 shadow-md"
          >
            ›
          </button>
        </div>
      </div>
    </div>
  );
};

export default UpcomingMovies;
