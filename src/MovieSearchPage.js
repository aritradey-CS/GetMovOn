import React, { useState } from "react";

const MovieSearchPage = ({ onSearch }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  const posterBaseUrl = "https://image.tmdb.org/t/p/w200"; // Add the base URL for movie posters

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleSearch = async () => {
    try {
      const apiKey = "842d4a2f338037341134f35512f14bea"; // Add your actual API key here
      const response = await fetch(
        `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${searchQuery}`
      );
      const data = await response.json();
      if (data.results.length > 0) {
        setSearchResults(data.results);
        setErrorMessage("");
        onSearch(searchQuery); // Add this line to update the search history
      } else {
        setSearchResults([]);
        setErrorMessage("No movies found.");
      }
    } catch (error) {
      console.error("Error occurred while fetching search results:", error);
    }
  };

  const handleBack = () => {
    setSearchQuery("");
    setSearchResults([]);
    setErrorMessage("");
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <div className="movie-search-page">
      {searchResults.length === 0 ? (
        <div className="search-bar">
          <input
            type="text"
            placeholder="Search movies..."
            value={searchQuery}
            onChange={handleSearchChange}
            onKeyPress={handleKeyPress}
          />
          <button className="search-button" onClick={handleSearch}>
            Search
          </button>
        </div>
      ) : (
        <div className="search-results">
          <button className="back-button" onClick={handleBack}>
            Back
          </button>
          <h2>Search Results</h2>
          {errorMessage && <p className="error-message">{errorMessage}</p>}
          {searchResults.length > 0 && (
            <div className="movie-cards">
              {searchResults.map((result) => (
                <div className="movie-card" key={result.id}>
                  {result.poster_path && (
                    <img
                      src={`${posterBaseUrl}${result.poster_path}`}
                      alt={result.title}
                      className="movie-poster"
                    />
                  )}
                  <div className="movie-details">
                    <h3 className="movie-title">{result.title}</h3>
                    <p className="movie-overview">{result.overview}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default MovieSearchPage;
