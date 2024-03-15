## NEXT TO DO
- set up basic text input box that saves data to the database
- set up basic delete button that removes data from database

## Local Run Instructions
1. run ```npm install```
2. run ```nodemon index.js```
3. Start Postgres local server
4. Open pgAdmin4
    - Create a new database called "Movies". MAKE SURE YOU CAPITALIZE THE FIRST LETTER.
    - Create a new table called "new_movies". To do this, you have to write in query tool CREATE TABLE newMovies ( id SERIAL PRIMARY KEY, title TEXT, description TEXT, director TEXT, producer TEXT, release_date INTEGER, running_time INTEGER). then press the play icon. 
    - After table is created, you'll see it under 'tables.' Right-click "new_movies" and import the new_movies.csv file, keep the header on. 

## Dependencies
- [ExpressJS](https://expressjs.com/en/starter/installing.html)