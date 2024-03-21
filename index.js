import express from "express";
import pg from 'pg';

const app = express();
const port = 3000;

app.use(express.urlencoded({ extended: true }));

const db = new pg.Client({
    user: "postgres",
    host: "localhost",
    database: "Movies",
    password: "12345",
    port: 5432,
});

async function connectDB() {
    try {
        await db.connect();
        console.log("Connected to the database");
    } catch (error) {
        console.error("Error connecting to the database:", error);
    }
}
connectDB();

app.set("view engine", "ejs");

app.use(express.urlencoded({ extended: true }));
app.use('/public', express.static('public'));


async function showMovies() {
    const result = await db.query("SELECT * FROM public.new_movies")
    return result.rows
}

app.get("/", async (req, res) => {
    try {
        const movies = await showMovies();
        res.render("movies.ejs", { movies });
    } catch (error) {
        console.error("Error fetching movies:", error);
        res.status(500).send("Internal Server Error");
    }
});

app.post("/add", async (req, res) => {
    const { title, director, producer, description, url } = req.body;
    const running_time = parseInt(req.body.runningTime)
    const release_date = parseInt(req.body.releaseDate)

    try {
        const result = await db.query("SELECT MAX(id) AS max_id FROM new_movies"); //what's the highest id number
        let nextId = 1; //assign the id to 1 as default
        if (result.rows.length > 0 && result.rows[0].max_id !== null) {
            nextId = parseInt(result.rows[0].max_id) + 1; //add one to the highest id
        }

        const finalUrl = url.trim() === "" ? "https://d2bzx2vuetkzse.cloudfront.net/fit-in/0x450/unshoppable_producs/b2e20c7b-2d08-46fa-941c-5aad59893103.jpeg" : url;

        await db.query("INSERT INTO new_movies (id, title, director, producer, running_time, release_date, description, url) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)",
            [nextId, title, director, producer, running_time, release_date, description, finalUrl]);

        res.redirect("/");
    } catch (error) {
        console.error("Error inserting movie:", error);
        res.redirect("/");
    }
});

app.post("/edit", async (req, res) => {
    const title = req.body.updatedMovieTitle;
    const director = req.body.updatedMovieDirector;
    const producer = req.body.updatedMovieProducer;
    const runTime = parseInt(req.body.updatedMovieRunningTime);
    const description = req.body.updatedMovieDescription;
    const releaseDate = parseInt(req.body.updatedMovieReleaseDate);
    const url = req.body.updatedMovieUrl;

    const id = req.body.updatedMovieId;

    try {
        await db.query("UPDATE new_movies SET title = $1, director = $2, producer = $3, running_time = $4, description = $5, release_date = $6, url = $7 WHERE id = $8", [title, director, producer, runTime, description, releaseDate, url, id]);
        res.redirect("/");
    } catch (err) {
        console.log("Error editing movie:", err);
        res.redirect("/");

    }
});

app.post("/delete", async (req, res) => {
    const id = req.body.deleteMovieId;
    try {
        await db.query("DELETE FROM new_movies WHERE id = $1", [id]);
        res.redirect("/");
    } catch (err) {
        console.log("Error deleting movie", err);
        res.redirect("/");
    }
});


app.listen(port, () => {
    console.log(`Successfully started server on port ${port}.`);
});

