import React, { useState } from "react";
import searchIcon from "./icons8-search.svg";
import {useNavigate } from 'react-router-dom'
import { Link } from 'react-router-dom'
import sussy from './sussy.png'

import "./TopBar.css";

function TopBar(props) {
  const [searchInput, setSearchInput] = useState("");
  const navigate = useNavigate();

  const handleInputChange = (event) => {
    setSearchInput(event.target.value);
  };

  const submitSearch = () => {
    navigate('/' + searchInput, {replace: true})
    setSearchInput("");
  };
  const handelEnter = (e) => {
    if (e.key === "Enter") submitSearch();
  };
  return (
    <div className="top-bar">
      <span className="top-bar__logo">
        <Link to={'/'}>
          <img src={sussy} alt={'sussy logo'}></img>
        </Link>
        
      </span>
      <span className="top-bar__input">
        <input
          className="search-input"
          onKeyDown={handelEnter}
          type={"text"}
          
          placeholder="Wyszukaj"
          value={searchInput}
          onChange={handleInputChange}
        ></input>
        <img
          className="search-icon"
          alt="wyszukaj"
          onClick={submitSearch}
          src={searchIcon}
        ></img>
      </span>
    </div>
  );
}

export default TopBar;
