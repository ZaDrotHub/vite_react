import { Route, Routes } from "react-router";
import Home from "../pages/Home";
import AboutCountry from "../pages/AboutCountry";

function AppRouter() {
  sessionStorage.setItem("pageNum", 1);
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/about/:indexCountry" element={<AboutCountry />} />
    </Routes>
  );
}

export default AppRouter;
