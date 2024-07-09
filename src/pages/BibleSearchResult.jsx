// import { useState } from "react";
// import SearchBar from "./SearchBar";
// import "./AllStyles.css";

// function BibleSearchResult() {
//   const [searchResults, setSearchResults] = useState([]);

//   const handleSearch = async (query) => {
//     if (!query) return;

//     const versionId = "7142879509583d59-01";
//     try {
//       const response = await fetch(
//         `https://api.scripture.api.bible/v1/bibles/${versionId}/search?query=${query}`,
//         {
//           headers: { "api-key": "8b8e15ab30542ab6ae60737cc6482eed" },
//         }
//       );
//       const data = await response.json();
//       setSearchResults(data.data.verses);
//     } catch (error) {
//       console.error("Error fetching search results:", error);
//     }
//   };
//   return (
//     <div className="parent-component">
//       <h1>Search the Bible</h1>
//       <SearchBar onSearch={handleSearch} />
//       <div className="search-results">
//         {searchResults.length > 0 ? (
//           searchResults.map((verse) => (
//             <div key={verse.id}>
//               <p>{verse.reference}</p>
//               <p>{verse.text}</p>
//             </div>
//           ))
//         ) : (
//           <p>No results found</p>
//         )}
//       </div>
//     </div>
//   );
// }

// export default BibleSearchResult;
