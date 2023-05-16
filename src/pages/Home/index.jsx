import React, { useEffect, useState } from "react";
import "../../App.css";
import "./Home.css";
import Header from "../../components/Header";
import axios, { all } from "axios";
import CountriesList from "./CountriesList";
import Pagination from "../../components/Pagination";

function Home() {
  const [allContries, setAllCountries] = useState([]);
  const [currentPage, setCurrentPage] = useState(
    Number(sessionStorage.getItem("pageNum"))
  );
  const [filtredCountries, setFiltredCountries] = useState([]);
  const [countItems, setCountItems] = useState(10);
  const [flagSortAB, setFlagSortAB] = useState(false)
  const [flagSortId, setFlagSortId] = useState(false)
  const [activeButton, setActiveButton] = useState(null);
  const regions = allContries.reduce((acc, country) => {
    const { continents, subregion } = country;
    if (acc[continents]) {
      acc[continents].add(subregion);
    } else {
      acc[continents] = new Set([subregion]);
    }
    return acc;
  }, {});

  const countPages = Math.ceil(filtredCountries.length === 0 ? allContries.length / countItems : filtredCountries.length / countItems);

  const lastCountryIndex = currentPage * countItems;
  const firstCountryIndex = lastCountryIndex - countItems;
  const currentCountry = (filtredCountries.length === 0 ? allContries : filtredCountries).slice(firstCountryIndex, lastCountryIndex);

  const paginate = (page) => {
    setCurrentPage(page);
    sessionStorage.setItem("pageNum", page);
  };

  const sortAlph = () => {
    setFlagSortId(false)
    setActiveButton(1);
    setFlagSortAB(!flagSortAB);
    if (flagSortAB){
            const tmp = (filtredCountries.length === 0 ? allContries : filtredCountries).slice().sort(function(a, b) {
              if (a.name.common < b.name.common) {
                return 1;
              }
              if (a.name.common > b.name.common) {
                return -1;
              }
              return 0;
            });
    setFiltredCountries(tmp);
    }
    else {
            const tmp = (filtredCountries.length === 0 ? allContries : filtredCountries).slice().sort(function(a, b) {
              if (a.name.common < b.name.common) {
                return -1;
              }
              if (a.name.common > b.name.common) {
                return 1;
              }
              return 0;
            });
    setFiltredCountries(tmp);
    }
  };
  console.log(regions)
  const sortId = () => {
    setFlagSortAB(true)
    setActiveButton(2);
    setFlagSortId(!flagSortId);
    if (flagSortId){
            const tmp = (filtredCountries.length === 0 ? allContries : filtredCountries).slice().sort(function(a, b) {
              if (a.id < b.id) {
                return -1;
              }
              if (a.id > b.id) {
                return 1;
              }
              return 0;
            });
    setFiltredCountries(tmp);
    }
    else {
            const tmp = (filtredCountries.length === 0 ? allContries : filtredCountries).slice().sort(function(a, b) {
              if (a.id < b.id) {
                return 1;
              }
              if (a.id > b.id) {
                return -1;
              }
              return 0;
            });
    setFiltredCountries(tmp);
    }
  };
  const resetSort = () => {
    setFiltredCountries(allContries)
    setActiveButton(null)
  }
  const sortContinents = (continent) => {
    const tmp = allContries.filter((item) => String(item.continents) === String(continent))
    setCurrentPage(1)
    setFiltredCountries(tmp);
  }
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
      <Header allContries={allContries} />
      <div className="container">
        <div className="btnsSort_container">
          <div className={`btn ${activeButton === 1 ? "active_btn" : ''}`} onClick={() => sortAlph()}>Sort {flagSortAB ? "A-Z" : 'Z-A'}</div>
          <div className={`btn ${activeButton === 2 ? "active_btn" : ''}`} onClick={() => sortId()}>Sort by index </div>
          <div className={`btn`} onClick={() => resetSort()}>Reset sort</div>
        </div>
        
        
        <div className="contries">
          <CountriesList contriesOnPage={currentCountry} />
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
