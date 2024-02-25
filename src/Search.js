import React, { useState } from "react";
import CardContainer from "./CardContainer";
import { debounce } from "./Utils/commonUtils";

const Search = ({ data }) => {
  const [searchResults, setSearchResults] = useState([]);
  const [searchItem, setSearchItem] = useState("");
  const [cardArray, setCardArray] = useState([]);
  const [isSubmitDisable, setSubmitDisable] = useState(true);
  const [showError, setShowError] = useState(false);
  const [searchedId, setSearchedID] = useState();

  const getResultDebounced = debounce((searchTerm) => {
    const results = getResult(searchTerm);
    setSearchResults(results);
  }, 300);

  const handleSearch = (term) => {
    let searchTerm = term;
    setSearchItem(term);
    setSubmitDisable(true);
    getResultDebounced(searchTerm);
  };

  const getResult = (searchTerm) => {
    const results = data?.summaries
      ?.map((summary) => {
        const occurrences =
          summary?.summary?.toLowerCase()?.split(searchTerm?.toLowerCase())
            ?.length - 1;
        return { id: summary.id, title: data.titles[summary.id], occurrences };
      })
      .filter((result) => result.occurrences > 0);

    results?.sort((a, b) => b.occurrences - a.occurrences);
    return results;
  };

  const addToList = (id, title) => {
    setSearchItem(title);
    setSearchedID(id);
    setSubmitDisable(false);
  };

  const handleSubmit = () => {
    if (isSubmitDisable) {
      setShowError(true);

      setTimeout(() => {
        setShowError(false);
      }, 2000);
    }
    cardArray?.push({
      title: data.titles[searchedId],
      summary: data.summaries[searchedId].summary,
      author: data.authors[searchedId].author,
    });
    setSearchItem("");
    setSearchResults([]);
    setSubmitDisable(true);
  };
  return (
    <div className="col-lg-12">
      {showError && <div className="errorText">Please select a title !!</div>}
      <div className="col-lg-6 offset-3 searchContainer">
        <input
          type="text"
          className="col-9 searchBox"
          placeholder="Enter search term"
          value={searchItem}
          onChange={(e) => handleSearch(e.target.value)}
        />
        <button className="col-3 searchButton" onClick={handleSubmit}>
          Submit
        </button>
      </div>
      <div className="col-6 offset-3 resultContainer">
        <ul className="col-9 ul-list">
          {searchResults?.map((result) => {
            const { id, title } = result;
            return (
              <li
                onClick={() => {
                  addToList(id, title);
                }}
                key={id}
                className="li-list"
              >
                {result.id} - {result.title}
              </li>
            );
          })}
        </ul>
      </div>
      <CardContainer card={cardArray} />
    </div>
  );
};

export default Search;
