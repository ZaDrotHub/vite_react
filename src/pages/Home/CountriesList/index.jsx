import React, { useState } from "react";
import { Link } from "react-router-dom";

import "./CountriesList.css";

function CountriesList({ contriesOnPage}) {
  const [showDivAboutCountry, setShowDivAboutCountry] = useState({
    isVisible: false,
    object: null,
  });

  const handleMouseEnter = (contry) => {
    setShowDivAboutCountry({
      isVisible: true,
      object: contry,
    });
  };
  const handleMouseLeave = () => {
    setShowDivAboutCountry({
      isVisible: false,
      object: null,
    });
  };
  return (
    <>
      <div className="countries_container">
        {contriesOnPage.map((item) => (
          <Link
            onMouseEnter={() => handleMouseEnter(item)}
            onMouseLeave={() => handleMouseLeave()}
            key={item.name.common}
            to={`/about/${item.cca2}`}
          >
            <div className="country_box">
              <div className="index">{item.id}</div>
              <div className="country_info">
                <img src={item.flags.png} alt="" />
                <p>{item.name.common}</p>
              </div>
            </div>
          </Link>
        ))}
      </div>
      <div className="aboutCountry_container">      
        {showDivAboutCountry.isVisible && (
          <div className="short_info_container">
            <div className="about_country">
              <div className="flag">
                <img
                  src={showDivAboutCountry.object.flags.png}
                  alt={showDivAboutCountry.object.flags.alt}
                />
              </div>
              <div className="country_short_info">
                <p>Name: {showDivAboutCountry.object.name.common}</p>
                <p>Capital: {showDivAboutCountry.object.capital}</p>
                <p>Population: {showDivAboutCountry.object.population}</p>
                <p>Region: {showDivAboutCountry.object.region}</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default CountriesList;
