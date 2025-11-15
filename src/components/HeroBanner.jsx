import React, { useState, useEffect } from "react";

const HeroBanner = () => {
  const [carouselData, setCarouselData] = useState([]);
  const [page, setPage] = useState(0);
  const handlePrevious = () => {
    if (page === 0) return;
    setPage(page - 1);
  };
  const handleNext = () => {
    if (page === carouselData.length - 1) return;
    setPage(page + 1);
  };
  const fetchPopularMovies = async () => {
    const url =
      "https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=1";
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
      setCarouselData(data.results);
      console.log(data.results);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchPopularMovies();
  }, []);

  return (
  <div id="default-carousel" className="relative w-full" data-carousel="slide">
    <div className="relative h-64 sm:h-80 md:h-[500px] overflow-hidden rounded-lg">
      <div
        key={carouselData[page]?.id}
        className="relative w-full h-full"
        data-carousel-item
      >
        <img
          src={`https://image.tmdb.org/t/p/original${carouselData[page]?.backdrop_path}`}
          alt={carouselData[page]?.title}
          className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 ease-in-out"
        />
        <div className="absolute inset-0 bg-linear-to-t from-black/70 via-black/40 to-transparent" />

        <div className="absolute bottom-8 left-8 z-20 max-w-[70%] sm:max-w-[60%]">
          <h1 className="text-white text-2xl sm:text-3xl md:text-4xl font-bold drop-shadow-md">
            {carouselData[page]?.title}
          </h1>
          {carouselData[page]?.overview && (
            <p className="mt-2 text-sm sm:text-base text-gray-200 line-clamp-3">
              {carouselData[page]?.overview}
            </p>
          )}
        </div>
      </div>
    </div>

    <button
      onClick={handlePrevious}
      type="button"
      className="absolute top-1/2 left-4 -translate-y-1/2 z-30 flex items-center justify-center w-10 h-10 rounded-full bg-black/30 hover:bg-black/50 transition focus:outline-none focus:ring-2 focus:ring-white"
    >
      <svg
        className="w-5 h-5 text-white"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
      >
        <path
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M15 18L9 12l6-6"
        />
      </svg>
    </button>

    <button
      onClick={handleNext}
      type="button"
      className="absolute top-1/2 right-4 -translate-y-1/2 z-30 flex items-center justify-center w-10 h-10 rounded-full bg-black/30 hover:bg-black/50 transition focus:outline-none focus:ring-2 focus:ring-white"
    >
      <svg
        className="w-5 h-5 text-white"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
      >
        <path
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M9 6l6 6-6 6"
        />
      </svg>
    </button>

    {/* Optional Dots Indicator */}
    <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-30 flex gap-2">
      {carouselData.map((_, idx) => (
        <button
          key={idx}
          onClick={() => setPage(idx)}
          className={`w-3 h-3 rounded-full ${
            idx === page ? "bg-white" : "bg-white/40"
          } transition`}
        />
      ))}
    </div>
  </div>
);

};

export default HeroBanner;
