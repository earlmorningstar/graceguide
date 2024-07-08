import { useState } from "react";
import { BiSearch } from "react-icons/bi";

function SearchBar({ onSearch }) {
  const [query, setQuery] = useState("");

  const handleInputChange = (e) => {
    setQuery(e.target.value);
  };

  const handleSearchClick = () => {
    onSearch(query);
  };

  console.log(onSearch);

  return (
    <div className="search-btn">
      <input
        type="text"
        value={query}
        onChange={handleInputChange}
        placeholder="Search..."
      />
      <span onClick={handleSearchClick}>
        <BiSearch size={20} />
      </span>
    </div>
  );
}

export default SearchBar;
