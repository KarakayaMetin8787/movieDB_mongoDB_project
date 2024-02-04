const express = require("express");
const cors = require("cors");
const { MongoClient, ObjectId } = require("mongodb");
const dotenv = require("dotenv");

dotenv.config();

const url = process.env.MONGODB_URL;
const client = new MongoClient(url);

async function findAllMovies() {
    await client.connect();
    const db = client.db("MongoDB_MovieDB_Project");
    const movieList = await db.collection("moviesCol").find({}).toArray();
    return movieList;
}

async function findSingleMovie(id) {
    await client.connect();
    const db = client.db("MongoDB_MovieDB_Project");
    const movie = await db.collection("moviesCol").findOne({ _id: id });
    return movie;
}

async function insertMovie(movieData) {
    await client.connect();
    const db = client.db("MongoDB_MovieDB_Project");
    const result = await db.collection("moviesCol").insertOne(movieData);
    return result.insertedId;
}

async function connectDB() {
    try {
        await client.connect();
        console.log("Connected to MongoDB");
    } catch (error) {
        console.error("Error connecting to MongoDB:", error);
    }
}

async function searchMovies(phrase) {
    await client.connect();
    const db = client.db("MongoDB_MovieDB_Project");

    const searchResults = await db
        .collection("moviesCol")
        .find({
            title: { $regex: phrase, $options: "i" },
        })
        .toArray();

    return searchResults;
}

connectDB();

const app = express();

app.use(cors());

app.use((req, _, next) => {
    console.log("new request", req.method, req.url);
    next();
});

app.use(express.json());

app.get("/api/v1/movies", async (_, res) => {
    try {
        const resultMoviestArray = await findAllMovies();
        res.status(200).json({ success: true, result: resultMoviestArray });
    } catch (err) {
        console.error(err);
        res.status(500).json({
            success: false,
            error: "failed loading guestbook entries",
        });
    }
});

app.get("/api/v1/search", async (req, res) => {
    try {
        const { term } = req.query;
        const searchResults = await searchMovies(term);
        res.status(200).json({ success: true, result: searchResults });
    } catch (err) {
        console.error(err);
        res.status(500).json({
            success: false,
            error: "Failed to fetch search results",
        });
    }
});

app.get("/api/v1/movies/detailpage/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const resultMovieObject = await findSingleMovie(id);
        if (!resultMovieObject) {
            res.status(404).json({
                success: false,
                error: "Movie not found",
            });
            return;
        }
        res.status(200).json({ success: true, result: resultMovieObject });
    } catch (err) {
        console.error(err);
        res.status(500).json({
            success: false,
            error: "Failed loading movie details",
        });
    }
});

app.post("/api/v1/movies", async (req, res) => {
    try {
        const { title, year, director, genre, rating, url, description } =
            req.body;
        const movieData = {
            title,
            year,
            director,
            genre,
            rating,
            url,
            description,
        };
        const insertedId = await insertMovie(movieData);
        res.status(201).json({
            success: true,
            message: "Movie added successfully",
            insertedId,
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({
            success: false,
            error: "Failed to add movie",
        });
    }
});

app.get("/api/v1/favorites", async (_, res) => {
    try {
        const db = client.db("MongoDB_MovieDB_Project");
        const favorites = await db
            .collection("favoritesCol")
            .find({})
            .toArray();
        res.status(200).json({ success: true, favorites });
    } catch (error) {
        console.error("Error retrieving favorite movies:", error);
        res.status(500).json({
            success: false,
            error: "Failed to retrieve favorite movies",
        });
    }
});

app.post("/api/v1/favorites/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const db = client.db("MongoDB_MovieDB_Project");
        const collection = db.collection("favoritesCol");
        const existingMovie = await collection.findOne({ _id: ObjectId(id) });
        if (existingMovie) {
            await collection.deleteOne({ _id: ObjectId(id) });
            res.status(200).json({
                success: true,
                message: "Movie removed from favorites",
            });
        } else {
            const movie = await db
                .collection("moviesCol")
                .findOne({ _id: ObjectId(id) });
            if (movie) {
                await collection.insertOne(movie);
                res.status(201).json({
                    success: true,
                    message: "Movie added to favorites",
                });
            } else {
                res.status(404).json({
                    success: false,
                    error: "Movie not found",
                });
            }
        }
    } catch (error) {
        console.error("Error adding/removing movie from favorites:", error);
        res.status(500).json({
            success: false,
            error: "Failed to add/remove movie from favorites",
        });
    }
});

app.use((_, res) => {
    res.status(404).json({ success: false, error: "route not found" });
});

const PORT = 3001;
app.listen(PORT, () => {
    console.log("Server is ready on Port: " + PORT);
});
