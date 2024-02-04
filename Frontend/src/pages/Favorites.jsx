import React, { useEffect, useState } from "react";
import Header from "../components/Header";

const Favorites = () => {
    const [favorites, setFavorites] = useState([]);

    useEffect(() => {
        const fetchFavorites = async () => {
            try {
                const response = await fetch(
                    "http://localhost:3001/api/v1/favorites"
                );
                if (response.ok) {
                    const data = await response.json();
                    setFavorites(data.favorites);
                }
            } catch (error) {
                console.error("Error fetching favorites:", error);
            }
        };

        fetchFavorites();
    }, []);

    const removeFavorite = async (id) => {
        try {
            const response = await fetch(
                `http://localhost:3001/api/v1/favorites/${id}`,
                {
                    method: "POST",
                }
            );
            if (response.ok) {
                const newData = favorites.filter((item) => item._id !== id);
                setFavorites(newData);
            }
        } catch (error) {
            console.error("Error removing favorite:", error);
        }
    };

    return (
        <>
            <Header />
            <h1>Favorite Movies</h1>
            <div>
                {favorites.map((movie) => (
                    <div key={movie._id}>
                        <h2>{movie.title}</h2>
                        <img src={movie.poster} alt={`${movie.title} Poster`} />
                        <p>Director: {movie.director}</p>
                        <button onClick={() => removeFavorite(movie._id)}>
                            Remove from Favorites
                        </button>
                    </div>
                ))}
            </div>
        </>
    );
};

export default Favorites;
