import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Header from "../components/Header";

const Home = () => {
    const [allMoviesData, setAllMoviesData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(
                    "http://localhost:3001/api/v1/movies"
                );

                if (!response.ok) {
                    throw new Error("Failed to fetch data");
                }

                const jsonData = await response.json();
                setAllMoviesData(jsonData.result);
            } catch (error) {
                console.error(error.message);
            }
        };

        fetchData();
    }, []);

    return (
        <>
            <Header />
            <h1>All Movies:</h1>
            <div>
                {allMoviesData.map((item) => (
                    <Link
                        to={`/detailpage/${encodeURIComponent(
                            item.title.replace(/\s/g, "")
                        )}/${item._id}`}
                        key={item._id}
                        className="movie-link">
                        <img
                            src={
                                item.poster
                                    ? item.poster.replace("http://", "https://")
                                    : "./src/assets/images/unavailable.jpg"
                            }
                            alt={`${item.title} poster`}
                            onError={(e) => {
                                e.target.src =
                                    "./src/assets/images/unavailable.jpg";
                            }}
                        />
                        <p>{item.title}</p>
                        <p>{item.director}</p>
                    </Link>
                ))}
            </div>
        </>
    );
};

export default Home;
