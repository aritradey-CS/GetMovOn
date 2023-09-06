import React from 'react';

const HistoryPage = ({ searchHistory }) => {
  return (
    <div className="history-page">
      <h2>Search History</h2>
      {searchHistory.length > 0 ? (
        <ul>
          {searchHistory.map((search, index) => (
            <li key={index}>{search}</li>
          ))}
        </ul>
      ) : (
        <p>No search history available.</p>
      )}
    </div>
  );
};

export default HistoryPage;
