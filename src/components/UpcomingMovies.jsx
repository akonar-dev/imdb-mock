import React, { useEffect, useState } from "react";

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

  const [watchList, setWatchList] = useState(() => {
    const saved = localStorage.getItem("watchList");
    return saved ? JSON.parse(saved) : [];
  });

  const handleAddToWatchList = (upcomingMovie) => {
    const updatedList = [...watchList, upcomingMovie];
    setWatchList(updatedList);
    localStorage.setItem("watchList", JSON.stringify(updatedList));
  };
  const handleRemoveFromWatchList = (upcomingMovie) => {
    console.log("inside remove")
    let updatedList = watchList.filter((watch)=> watch.id !== upcomingMovie.id)
    setWatchList(updatedList);
    localStorage.setItem("watchList", JSON.stringify(updatedList));
  }
  function inWathcList(movieObj) {
    if(watchList.includes(movieObj)) return true
    else return false
  }
  useEffect(() => {
    fetchUpcomingMovies();
  }, [page]);
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
          <div
            key={upcomingMovie.id}
            className="bg-white shadow-md hover:shadow-xl transition-shadow rounded-xl overflow-hidden border border-gray-200"
          >
            <img
              src={`https://image.tmdb.org/t/p/w780${upcomingMovie?.backdrop_path}`}
              alt={upcomingMovie?.title}
              className="w-full h-52 object-cover"
            />
            <div className="p-4 flex flex-col justify-between h-[200px]">
              <h3 className="text-xl font-semibold text-gray-800 line-clamp-1">
                {upcomingMovie.title}
              </h3>
              <p className="text-lg text-gray-600 line-clamp-3">
                {upcomingMovie.overview}
              </p>
            </div>
            {/* Place this below each movie card or below the grid as needed */}
            {!inWathcList(upcomingMovie) ? (
              <div className="mt-4 flex justify-center">
                <button
                  onClick={() => handleAddToWatchList(upcomingMovie)}
                  type="button"
                  aria-label="Add to watchlist"
                  className="w-full max-w-xs sm:max-w-sm md:max-w-md inline-flex items-center justify-center gap-2 px-5 py-2 rounded-full 
               bg-linear-to-r from-indigo-600 to-purple-600 text-white font-semibold shadow-lg
               hover:from-indigo-500 hover:to-purple-500 hover:shadow-xl
               active:scale-95 transform transition-all duration-150
               focus:outline-none focus:ring-4 focus:ring-indigo-300"
                >
                  {/* optional icon */}
                  <svg
                    className="w-5 h-5"
                    viewBox="0 0 24 24"
                    fill="none"
                    aria-hidden
                  >
                    <path
                      d="M12 5v14M5 12h14"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  Add to Watchlist
                </button>
              </div>
            ) : (
              <div className="mt-4 flex justify-center">
                <button
                  type="button"
                  onClick={() => handleRemoveFromWatchList(upcomingMovie)}
                  aria-label="Remove from watchlist"
                  className="w-full max-w-xs sm:max-w-sm md:max-w-md inline-flex items-center justify-center gap-2 px-5 py-2 rounded-full 
               bg-linear-to-r from-red-600 to-rose-600 text-white font-semibold shadow-lg
               hover:from-red-500 hover:to-rose-500 hover:shadow-xl
               active:scale-95 transform transition-all duration-150
               focus:outline-none focus:ring-4 focus:ring-red-300"
                >
                  {/* optional icon */}
                  <svg
                    className="w-5 h-5"
                    viewBox="0 0 24 24"
                    fill="none"
                    aria-hidden
                  >
                    <path
                      d="M18 6L6 18M6 6l12 12"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  Remove from Watchlist
                </button>
              </div>
            )}
          </div>
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
