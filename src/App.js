import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, NavLink } from "react-router-dom";
import "./App.css";
import MovieSearchPage from "./MovieSearchPage";
import HistoryPage from "./HistoryPage";
import ContactPage from "./ContactPage";
import HelpPage from "./HelpPage"; // Import the HelpPage component

import homeIcon from "../src/Images/Icons/home.png";
import historyIcon from "../src/Images/Icons/history1.png";
import envelopeIcon from "../src/Images/Icons/envelope.png";
import questionCircleIcon from "../src/Images/Icons/question-circle3.png";

const App = () => {
  const [isNavOpen, setIsNavOpen] = useState(false);
  const [searchResults, setSearchResults] = useState([]);
  const [searchHistory, setSearchHistory] = useState([]);

  const handleNavToggle = () => {
    setIsNavOpen(!isNavOpen);
  };

  const handleSearchResults = (results) => {
    setSearchResults(results);
  };

  const handleSearch = (query) => {
    setSearchHistory([...searchHistory, query]);
  };

  return (
    <Router>
      <div className="App">
        {/* Navigation Bar */}
        <div className={`navbar ${isNavOpen ? "open" : ""}`}>
          <div className="navbar-header">
            <div className="navbar-brand" onClick={handleNavToggle}>
              {isNavOpen ? (
                <>
                  <img src={homeIcon} alt="Home" className="nav-icon" />
                  <img src={historyIcon} alt="History" className="nav-icon" />
                  <img src={envelopeIcon} alt="Contact" className="nav-icon" />
                  <img src={questionCircleIcon} alt="Help" className="nav-icon" />
                </>
              ) : null}
            </div>
          </div>
          <div className="navbar-links">
            {!isNavOpen ? (
              <>
                <NavLink
                  exact
                  to="/"
                  className="nav-link"
                  activeClassName="active"
                  onClick={handleNavToggle}
                >
                  <img src={homeIcon} alt="Home" className="nav-icon" />
                  <span className="nav-label">Home</span>
                </NavLink>
                <NavLink
                  to="/history"
                  className="nav-link"
                  activeClassName="active"
                  onClick={handleNavToggle}
                >
                  <img src={historyIcon} alt="History" className="nav-icon" />
                  <span className="nav-label">History</span>
                </NavLink>
                <NavLink
                  to="/contact"
                  className="nav-link"
                  activeClassName="active"
                  onClick={handleNavToggle}
                >
                  <img src={envelopeIcon} alt="Contact" className="nav-icon" />
                  <span className="nav-label">Contact</span>
                </NavLink>
                <NavLink
                  to="/help"
                  className="nav-link"
                  activeClassName="active"
                  onClick={handleNavToggle}
                >
                  <img src={questionCircleIcon} alt="Help" className="nav-icon" />
                  <span className="nav-label">Help</span>
                </NavLink>
              </>
            ) : null}
          </div>
        </div>

        {/* Content */}
        <div className="content">
          <Routes>
            <Route
              path="/"
              element={
                <MovieSearchPage
                  onSearchResults={handleSearchResults}
                  onSearch={handleSearch}
                />
              }
            />
            <Route
              path="/history"
              element={<HistoryPage searchHistory={searchHistory} />}
            />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/help" element={<HelpPage />} /> // Add a route for the HelpPage component
          </Routes>
          {searchResults.length > 0 && (
            <div className="search-results">
              <h2>Search Results</h2>
              <ul>
                {searchResults.map((result) => (
                  <li key={result.id}>{result.title}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </Router>
  );
};

export default App;
