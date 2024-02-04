import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Header from "../components/Header";

const Detailpage = () => {
    const [singleMovieData, setSingleMovieData] = useState({});
    const { id } = useParams();
    const [isFavorite, setIsFavorite] = useState(false);

    useEffect(() => {
        const dataFetch = async () => {
            try {
                const singleMovieFetch = await fetch(
                    `http://localhost:3001/api/v1/movies/detailpage/${id}`
                );
                if (singleMovieFetch.ok) {
                    const jsonData = await singleMovieFetch.json();
                    setSingleMovieData(jsonData.result);
                }
            } catch (error) {
                console.error("Error fetching data:", error.message);
            }
        };

        dataFetch();
    }, [id]);

    useEffect(() => {
        const checkFavorite = async () => {
            try {
                const response = await fetch(
                    `http://localhost:3001/api/v1/favorites/${id}`
                );
                setIsFavorite(response.ok);
            } catch (error) {
                console.error("Error checking if movie is favorite:", error);
            }
        };

        checkFavorite();
    }, [id]);

    const toggleFavorite = async () => {
        try {
            const response = await fetch(
                `http://localhost:3001/api/v1/favorites/${id}`,
                {
                    method: "POST",
                }
            );

            if (response.ok) {
                setIsFavorite(!isFavorite);
            }
        } catch (error) {
            console.error("Error toggling favorite:", error);
        }
    };

    return (
        <>
            <Header />
            <div>
                <h2>{singleMovieData.title}</h2>
                <img
                    src={singleMovieData.poster}
                    alt={`${singleMovieData.title} Poster`}
                />
                <p>Director: {singleMovieData.director}</p>
                <button onClick={toggleFavorite}>
                    {isFavorite ? "Remove from Favorites" : "Add to Favorites"}
                </button>
            </div>
        </>
    );
};

export default Detailpage;
