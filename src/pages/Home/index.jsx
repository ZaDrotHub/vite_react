import React, { useEffect, useState } from "react";
import "../../App.css";
import "./Home.css";
import Header from "../../components/Header";
import axios from "axios";
import CountriesList from "./CountriesList";
import Pagination from "../../components/Pagination";

function Home() {
  const [allContries, setAllCountries] = useState([]);
  const [currentPage, setCurrentPage] = useState(
    Number(sessionStorage.getItem("pageNum"))
  );
  const [countItems, setCountItems] = useState(10);

  const countPages = allContries.length / countItems;

  const lastCountryIndex = currentPage * countItems;
  const firstCountryIndex = lastCountryIndex - countItems;
  const currentCountry = allContries.slice(
    firstCountryIndex,
    lastCountryIndex
  );

  const paginate = (page) => {
    setCurrentPage(page);
    sessionStorage.setItem("pageNum", page);
  };

  useEffect(
    () => async () => {
      try {
        const result = await axios("https://restcountries.com/v3.1/all");

        const resultId = result.data.map((item, i) => {
          return { ...item, id: i + 1 };
        });

        setAllCountries(resultId);
      } catch {
        setAllCountries("Error");
      }
    },
    []
  );

  return (
    <>
      <Header allContries={allContries}/>
      <div className="container">
        
        <div className="contries">
          <CountriesList contriesOnPage={currentCountry} Contries={allContries} />
        </div>
        <Pagination
          currentPage={currentPage}
          totalPages={countPages}
          onPageChange={paginate}
        />
      </div>
    </>
  );
}

export default Home;
