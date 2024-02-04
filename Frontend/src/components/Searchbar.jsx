import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Searchbar = () => {
    const [searchValue, setSearchValue] = useState("");
    const navigate = useNavigate();

    const handleSearch = () => {
        navigate(`/search?term=${encodeURIComponent(searchValue)}`);
    };

    return (
        <div>
            <input
                type="text"
                placeholder="Search for movies..."
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
            />
            <button onClick={handleSearch}>Search</button>
        </div>
    );
};

export default Searchbar;
