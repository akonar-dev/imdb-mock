import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes,Route } from "react-router";
import "./index.css";
import App from "./App.jsx";
import Menu from "./components/Menu.jsx";
//import Users from "./components/Users.jsx";
import NavBar from "./components/NavBar.jsx";
import Watchlist from "./components/WatchList.jsx";

createRoot(document.getElementById("root")).render(
    <BrowserRouter>
    <NavBar/>
      <Routes>
        <Route index element={<App/>} />
        <Route path="watch-list" element={<Watchlist/>} />
        <Route path="menu" element={<Menu/>} />
        {/* <Route path="/users/:id" element={<Users/>}/> */}
      </Routes>
    </BrowserRouter>
);
