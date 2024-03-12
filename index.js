import express from "express";
import axios from "axios";
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
db.connect

app.use(express.urlencoded({ extended: true}));
app.use(express.static("public"));

app.get("/", async (req, res) => {
    try {
        const response = await axios.get("https://ghibliapi.vercel.app/films");
        const result = response.data;
        console.log(result);
        res.render("movies.ejs", { data: result });
    } catch (error) {
        console.error("Failed to make request:", error.message);
        res.render("movies.ejs", {
            error: error.message,
        });
    }
});


app.listen(port, () => {
    console.log(`Successfully started server on port ${port}.`);
});

