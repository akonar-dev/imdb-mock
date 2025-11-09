import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes,Route } from "react-router";
import "./index.css";
import App from "./App.jsx";
import About from "./components/About.jsx";
import Menu from "./components/Menu.jsx";
//import Users from "./components/Users.jsx";
import NavBar from "./components/NavBar.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
    <NavBar/>
      <Routes>
        <Route index element={<App/>} />
        <Route path="about" element={<About/>} />
        <Route path="menu" element={<Menu/>} />
        {/* <Route path="/users/:id" element={<Users/>}/> */}
      </Routes>
    </BrowserRouter>
  </StrictMode>
);
