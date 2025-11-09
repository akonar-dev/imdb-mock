import React from "react";

const SearchBar = () => {
    const handleChange =(e)=>{
        console.log(e.target.value)
    }
  return (
    <>
      <input
        className="w-md border-amber-50 rounded-md bg-white h-fit self-center p-1"
        type="text"
        placeholder="Search for Movies"
        onChange={handleChange}
      />
    </>
  );
};

export default SearchBar;
