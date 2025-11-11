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
  // return (
  //   <div
  //     id="default-carousel"
  //     className="relative w-full"
  //     data-carousel="slide"
  //   >
  //     <div className="relative  h-96 overflow-hidden rounded-lg md:h-96">
  //       <div key={carouselData[page]?.id} className="" data-carousel-item>
  //         <img
  //           className="absolute pt-96 block w-full -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2"
  //           alt="movie"
  //           src={`https://image.tmdb.org/t/p/original${carouselData[page]?.backdrop_path}`}
  //         />
  //         <h1 className="z-2 absolute text-yellow-300 text-2xl font-bold top-4/5 left-1/12">{carouselData[page]?.title}</h1>
  //       </div>
  //     </div>
  //     <button
  //       onClick={handlePrevious}
  //       type="button"
  //       className=" absolute top-0 start-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none"
  //       data-carousel-prev
  //     >
  //       <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/30 dark:bg-gray-800/30 group-hover:bg-white/50 dark:group-hover:bg-gray-800/60 group-focus:ring-4 group-focus:ring-white dark:group-focus:ring-gray-800/70 group-focus:outline-none">
  //         <svg
  //           className="w-4 h-4 text-white dark:text-gray-800 rtl:rotate-180"
  //           aria-hidden="true"
  //           xmlns="http://www.w3.org/2000/svg"
  //           fill="none"
  //           viewBox="0 0 6 10"
  //         >
  //           <path
  //             stroke="currentColor"
  //             strokeLinecap="round"
  //             strokeLinejoin="round"
  //             strokeWidth="2"
  //             d="M5 1 1 5l4 4"
  //           />
  //         </svg>
  //         <span className="sr-only">Previous</span>
  //       </span>
  //     </button>
  //     <button
  //       onClick={handleNext}
  //       type="button"
  //       className="absolute top-0 end-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none"
  //       data-carousel-next
  //     >
  //       <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/30 dark:bg-gray-800/30 group-hover:bg-white/50 dark:group-hover:bg-gray-800/60 group-focus:ring-4 group-focus:ring-white dark:group-focus:ring-gray-800/70 group-focus:outline-none">
  //         <svg
  //           className="w-4 h-4 text-white dark:text-gray-800 rtl:rotate-180"
  //           aria-hidden="true"
  //           xmlns="http://www.w3.org/2000/svg"
  //           fill="none"
  //           viewBox="0 0 6 10"
  //         >
  //           <path
  //             stroke="currentColor"
  //             strokeLinecap="round"
  //             strokeLinejoin="round"
  //             strokeWidth="2"
  //             d="m1 9 4-4-4-4"
  //           />
  //         </svg>
  //         <span className="sr-only">Next</span>
  //       </span>
  //     </button>
  //   </div>
  // );
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
