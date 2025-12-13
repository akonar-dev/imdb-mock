import React from 'react'

const MovieCard = ({upcomingMovie, inWathcList, handleAddToWatchList, handleRemoveFromWatchList}) => {
  return (
    <div
            //key={upcomingMovie.key}
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
  )
}

export default MovieCard