import React, {} from "react";
import { Link } from "react-router-dom";

import "./ContryInfo.css"

function CountryInfo({chosenCountry}) {

    const currenciesKeys = chosenCountry.currencies === undefined ? null : Object.keys(chosenCountry.currencies);
    const langKeys = Object.keys(chosenCountry.languages);
    const nativeNames = Object.keys(chosenCountry.name.nativeName);

  return (
    <>
    <div className="container_info_about_country">
        <div className="country_information_box">
                <div className="flags_block">
                    <img className="flags" src={chosenCountry.flags.png}></img>
                </div>
                <div className="country_information">
                <div className="name_country">
                    {chosenCountry.name.common}
                </div>
                <div className="info_block">
                    <div className="info">
                        <div>
                            <p>Native names: <span>{nativeNames.map((item, index) => `${chosenCountry.name.nativeName[item].common}${nativeNames[index+1] === undefined? "" : ","} `)}</span></p>
                            <p>Population: <span>{chosenCountry.population  === undefined ? "-" : chosenCountry.population }</span></p>
                            <p>Region: <span>{chosenCountry.region === undefined ? "-" : chosenCountry.region}</span></p>
                            <p>Sub Region: <span>{chosenCountry.subregion  === undefined ? "-" : chosenCountry.subregion }</span></p>
                            <p>Capital: <span>{chosenCountry.capital === undefined ? "-" : chosenCountry.capital}</span></p>
                        </div>
                        <div className="languages">
                            <p>Curiencies: <span>{currenciesKeys === null ? "-" : currenciesKeys.map((item, index) => `${chosenCountry.currencies[item].name}${currenciesKeys[index+1] === undefined? "" : ","} `)}</span></p>
                            <p>Languages: <span>{langKeys.map((item, index) => `${chosenCountry.languages[item]}${langKeys[index+1] === undefined? "" : ","} `)}</span></p>
                        </div>
                    </div>
                
                </div>
                </div>
            </div>
    </div>
        
    </>
  );

}
export default CountryInfo;