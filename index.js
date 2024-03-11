import express from "express";
import axios from "axios";

const app = express();
const port = 3000;

app.use(express.urlencoded({ extended: true })); 

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

