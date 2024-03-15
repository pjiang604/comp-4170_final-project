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

app.post("/add", async (req, res) => {
    const { title, director, producer, running_time, release_date, description, url } = req.body;

    const result = await db.query("SELECT title FROM new_movies WHERE title = $1", [title]);

    if (result.rows.length === 0) {
        try {
            await db.query("INSERT INTO new_movies (title, director, producer, running_time, release_date, description, url) VALUES ($1, $2, $3, $4, $5, $6, $7)", [title, director, producer, running_time, release_date, description, url]);
            res.redirect("/");
        } catch (error) {
            console.error("Error inserting movie:", error);
            res.status(500).send("Internal Server Error");
            res.redirect("/");
        }
    } else {
        res.status(400).send("Movie already exists");
    }
});


app.get("/", async (req, res) => {
    try {
        const movies = await showMovies();
        res.render("movies.ejs", { movies: movies.reverse() });
    } catch (error) {
        console.error("Error fetching movies:", error);
        res.status(500).send("Internal Server Error");
    }
});


app.listen(port, () => {
    console.log(`Successfully started server on port ${port}.`);
});

