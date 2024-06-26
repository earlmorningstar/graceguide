import { useState } from "react";
import { BiSearch } from "react-icons/bi";


function SearchBar({ onSearch }) {
    const [query, setQuery] = useState("");
  
    const handleInputChange = (e) => {
      setQuery(e.target.value);
    };
  
   
  
    return (
      <>
        <div className="search-btn">
          <input
            type="text"
            value={query}
            onChange={handleInputChange}
            placeholder="Search articles..."
          />
          <span><BiSearch size={20}/></span>
        </div>
      </>
    );
  }
  
  export default SearchBar;