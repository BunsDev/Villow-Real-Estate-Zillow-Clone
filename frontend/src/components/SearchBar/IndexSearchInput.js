import { createContext, useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";

import HomeListingType from "./FilterButtons/HomeListingType/HomeListingType";
import PriceRange from "./FilterButtons/PriceRange/PriceRange";
import SuggestionItem from "./SuggestionItem";
import BedsAndBaths from "./FilterButtons/BedsAndBaths/BedsAndBaths";
import HomeType from "./FilterButtons/HomeType/HomeType";

import { SearchInputContainer } from "./SearchInputContainer";
import { getSearchWord, setSearchWord } from "../../store/searchFilters";
import { cleanSearchSuggestions } from "../../store/search";

import "./IndexSearchInput.scss";
import InitialSearchBox from "./InitialSearchBox";
import { getLocation, getUserCity } from "./utils/userLocation";
import { fetchSearchListings } from "../../store/listingsReducer";


export const SearchContext = createContext();

const IndexSearch = ({
  handleSearchOnChange,
  value,
  term,
  setSuggestionsBox,
  suggestionsBox,
  suggestions,
  focuseSearch,
  setFocuseSearch,
  searchRef,
  setValue,
}) => {
  const dispatch = useDispatch();
  const inputRef = useRef();
  const searchWord = useSelector(getSearchWord());

  const [closeDropDown, setCloseDropDown] = useState({ isClosed: false });

  useEffect(() => {
    dispatch(cleanSearchSuggestions());
  }, [closeDropDown]);

  const handleItemClick = (e) => {
    e.preventDefault();

    setValue("");
    setCloseDropDown({ isClosed: true });
  };

  const handleOnClick = (e) => {
    e.preventDefault();
    e.stopPropagation();

    if (inputRef.current) inputRef.current.focus();

    setFocuseSearch(true);
  };

  async function handleCurrentLocation(e) {
		e.preventDefault();
    debugger

		const userLocation = await getLocation();
		const userCity = await getUserCity(userLocation);
    debugger

    dispatch(setSearchWord)

		dispatch(fetchSearchListings("city", userCity));
	};

  return (
    <div className="search-component-wrapper">
      <div
        className={
          "search-input-wrapper " +
          (focuseSearch && searchWord ? "focused-wrapper" : "")
        }
      >
        <div
          className={"search-input " + (focuseSearch ? "focused" : "")}
          onClick={handleOnClick}
          ref={searchRef}
        >
          <SearchInputContainer
            inputRef={inputRef}
            searchWord={searchWord}
            focuseSearch={focuseSearch}
            value={value}
            handleSearchOnChange={handleSearchOnChange}
            setSuggestionsBox={setSuggestionsBox}
          />
        </div>

        {suggestionsBox ? (
          <InitialSearchBox handleCurrentLocation={handleCurrentLocation}/>

        ) : (
          <div className="indexSearchDropdown" onClick={handleItemClick}>
            <ul>
              {suggestions &&
                suggestions.map((suggestion, idx) => {
                  return (
                    <SuggestionItem
                      key={idx}
                      term={term}
                      value={value}
                      suggestion={suggestion}
                    />
                  );
                })}
            </ul>
          </div>
        )}
      </div>
        <div className="filter-buttons">
          <HomeListingType />
        </div>
        <div className="filter-buttons">
          <PriceRange />
        </div>
      <div className="filter-buttons">
        <BedsAndBaths />
      </div>
      <div className="filter-buttons">
        <HomeType />
      </div>
    </div>
  );
};

export default IndexSearch;
