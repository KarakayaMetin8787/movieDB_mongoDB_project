import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Header from "../components/Header";

const SearchResults = () => {
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const searchTerm = searchParams.get("term");

    const [searchResults, setSearchResults] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                if (!searchTerm) {
                    return;
                }
                const response = await fetch(
                    `http://localhost:3001/api/v1/search?term=${encodeURIComponent(
                        searchTerm
                    )}`
                );
                if (!response.ok) {
                    throw new Error("Error fetching data");
                }
                const jsonData = await response.json();
                console.log(jsonData);
                setSearchResults(jsonData.result);
            } catch (error) {
                console.error(error.message);
            }
        };

        fetchData();
    }, [searchTerm]);

    return (
        <div>
            <Header />
            <h2>Search Results for: {searchTerm}</h2>
            <ul>
                {searchResults.map((result) => (
                    <li key={result._id}>{result.title}</li>
                ))}
            </ul>
        </div>
    );
};

export default SearchResults;
