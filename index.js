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

app.use(express.urlencoded({ extended: true}));
// app.use(express.static("public"));
app.use('/public', express.static('public'));


async function showMovies(){
    const result = await db.query("SELECT * FROM public.new_movies")
    // let movies = [];
    // result.rows.forEach((movie) => {
    //     movies.push(movie.title)
    // });
    return result.rows
}

app.get("/", async (req, res) => {
    try {
        const movies = await showMovies();
        res.render("movies.ejs", { movies: movies });
    } catch (error) {
        console.error("Error fetching movies:", error);
        res.status(500).send("Internal Server Error");
    }
});


app.listen(port, () => {
    console.log(`Successfully started server on port ${port}.`);
});

