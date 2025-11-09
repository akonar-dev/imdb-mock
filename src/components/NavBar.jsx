import React from "react";
import { Link } from "react-router";
import NavIcon from "../assets/nav_icon.png";
import SearchBar from "./SearchBar";

const NavBar = () => {
  return (
    <>
      <nav className="bg-black flex justify-between">
      <Link to="/">
       <img className="h-15 w-auto self-center pl-5" src={NavIcon} alt="navbar-imdb-logo"/>
      </Link>
      <SearchBar/>
        <ul className="flex justify-end items-center">
          <Link to="/menu">
            <li className="px-10 text-amber-50">Menu</li>
          </Link>
          <Link to="/about">
            <li className="px-10 text-amber-50">WatchList</li>
          </Link>
        </ul>
      </nav>
    </>
  );
};

export default NavBar;
