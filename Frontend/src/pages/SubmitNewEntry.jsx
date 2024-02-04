import React, { useState } from "react";
import Header from "../components/Header";

const SubmitNewEntry = () => {
    const [formData, setFormData] = useState({
        title: "",
        year: "",
        director: "",
        genre: "",
        rating: "",
        url: "",
        description: "",
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleFormSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch(
                "http://localhost:3001/api/v1/movies",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(formData),
                }
            );
            if (!response.ok) {
                throw new Error("Failed to add movie");
            }
            const data = await response.json();
            console.log("Movie added successfully with ID:", data.insertedId);
        } catch (error) {
            console.error("Error:", error.message);
        }
    };

    return (
        <div>
            <Header />
            <form onSubmit={handleFormSubmit}>
                <label>Title:</label>
                <input
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleInputChange}
                    required
                />

                <label>Year:</label>
                <input
                    type="text"
                    name="year"
                    value={formData.year}
                    onChange={handleInputChange}
                    required
                />

                <label>Director:</label>
                <input
                    type="text"
                    name="director"
                    value={formData.director}
                    onChange={handleInputChange}
                    required
                />

                <label>Genre:</label>
                <input
                    type="text"
                    name="genre"
                    value={formData.genre}
                    onChange={handleInputChange}
                    required
                />

                <label>Rating:</label>
                <input
                    type="text"
                    name="rating"
                    value={formData.rating}
                    onChange={handleInputChange}
                    required
                />

                <label>URL:</label>
                <input
                    type="text"
                    name="url"
                    value={formData.url}
                    onChange={handleInputChange}
                    required
                />

                <label>Description:</label>
                <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    required
                />

                <button type="submit">Add Movie</button>
            </form>
        </div>
    );
};

export default SubmitNewEntry;
