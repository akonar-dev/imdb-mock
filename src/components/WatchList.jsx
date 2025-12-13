import React,{useState, useEffect} from "react";
import { genre } from "../utils/constants";

const Watchlist = () => {

const [watchList, setWatchList] = useState([])
const [search, setSearch] = useState("")

const handleRemoveFromWatchList = (upcomingMovie) => {
    let updatedList = watchList.filter((watch)=> watch.id !== upcomingMovie.id)
    setWatchList(updatedList);
    localStorage.setItem("watchList", JSON.stringify(updatedList));
}
const handleSearch = (e)=>{
    setSearch(e.target.value)
}



const sortBy = (key, order = "asc") => {
  const direction = order === "asc" ? 1 : -1;
  setWatchList((prev) =>
    [...prev].sort((a, b) => direction * (a[key] - b[key]))
  );
};

const handleAscending = () => sortBy("vote_average", "asc");
const handleDescending = () => sortBy("vote_average", "desc");
const handleFilterWatchList = (value)=> {
    const watchList = JSON.parse(localStorage.getItem("watchList"))
    const filteredWatchList = watchList.filter((wl)=> (wl.genre_ids.map((id) => genre[id]).includes(value)))
    setWatchList([...filteredWatchList])
}
// const filteredWatchList = watchList.filter((wl) =>
//   wl.original_title.toLowerCase().includes(search.toLowerCase())
// );
useEffect(() => {
  const moviesFromLocalStorage = localStorage.getItem("watchList");
  if (moviesFromLocalStorage) {
    setWatchList(JSON.parse(moviesFromLocalStorage));
  }
}, []);

  return (
    <div className="p-6 md:p-10">
      <h1
        className="text-3xl sm:text-4xl font-extrabold text-center mb-8
                   bg-linear-to-r from-indigo-500 via-purple-500 to-pink-500
                   bg-clip-text text-transparent"
      >
        🎞️ My Watchlist
      </h1>
      <div className="max-w-lg mx-auto mb-8 relative">
        <input
          type="text"
          placeholder="Search in watchlist..."
          onChange={handleSearch}
          className="
            w-full
            px-5 py-3
            rounded-xl
            bg-gray-100
            text-gray-800
            placeholder-gray-500
            focus:bg-white
            focus:outline-none
            focus:ring-2 focus:ring-indigo-500
            transition-all
            shadow-sm
            "
        />
      </div>
      <div className="flex flex-wrap gap-3 justify-center mb-8">
        {Object.values(genre).map((value) => (
          <span
            key={value}
            onClick={()=>handleFilterWatchList(value)}
            className="
                px-4 py-1.5
                rounded-full
                bg-indigo-100 text-indigo-700
                text-sm font-medium
                shadow-sm
                hover:bg-indigo-200
                hover:scale-105
                transition-all duration-200
                cursor-pointer
            "
          >
            {value}
          </span>
        ))}
      </div>

      <div className="overflow-x-auto rounded-2xl shadow-lg">
        <table className="w-full border-collapse bg-white">
          <thead>
            <tr className="bg-gray-900 text-white text-sm sm:text-base">
              <th className="px-6 py-4 text-left font-semibold tracking-wide">
                Name
              </th>
              <th className="px-6 py-4 text-center font-semibold flex gap-2 align-middle">
                <div>Ratings</div>
                <div className="flex flex-col text-gray-300 leading-none">
                  <span className="text-xs cursor-pointer hover:text-white" onClick={handleAscending}>
                    ▲
                  </span>
                  <span className="text-xs cursor-pointer hover:text-white" onClick={handleDescending}>
                    ▼
                  </span>
                </div>
              </th>
              <th className="px-6 py-4 text-center font-semibold">
                Popularity
              </th>
              <th className="px-6 py-4 text-center font-semibold">Genre</th>
              <th className="px-6 py-4 text-center font-semibold">Remove</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-200">
            {/* Example Row */}
            {watchList?.filter((wl) =>
  wl.original_title.toLowerCase().includes(search.toLowerCase()))?.map((wl) => (
              <tr key={wl.id} className="hover:bg-gray-50 transition">
                <td className="px-6 py-4 font-medium text-gray-800 flex">
                  {
                    <img
                      src={`https://image.tmdb.org/t/p/w780${wl?.backdrop_path}`}
                      alt={wl?.title}
                      className="w-1/2 h-36 object-cover"
                    />
                  }
                  <div className="items-center p-10">{wl.original_title}</div>
                </td>
                <td className="px-6 py-4 text-center text-gray-600">
                  {wl.vote_average}
                </td>
                <td className="px-6 py-4 text-center text-gray-600">
                  {wl.popularity}
                </td>
                <td className="px-6 py-4 text-center text-gray-600">
                  {wl.genre_ids.map((id) => genre[id]).join(", ")}
                </td>
                <td className="px-6 py-4 text-center">
                  <button
                    onClick={() => handleRemoveFromWatchList(wl)}
                    className="
                        px-4 py-2
                        rounded-lg
                        bg-red-200 text-white text-sm font-semibold
                        hover:bg-red-600
                        active:scale-95
                        transition-all duration-200
                        shadow-sm
                        "
                  >
                    🗑️
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Watchlist;
