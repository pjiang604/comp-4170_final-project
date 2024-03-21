# My Ghibli Library
- Final Project for BCIT COMP 4170 Course
- Digital Design and Development Program - Set F (Monday Afternoon, course #90685)
- Created by Patricia Jiang, Hedieh Kaharaqani, and Glenda Cheung

## Local Run Instructions
1. run ```npm install```
2. run ```nodemon index.js```
3. Start Postgres local server
4. Open pgAdmin4
    - Create a new database called "Movies". Make sure to capitalize the first letter (case-sensitive)
    - Create a new table called "new_movies". To do this, you have to write in query tool CREATE TABLE new_movies ( id SERIAL PRIMARY KEY, title TEXT, description TEXT, director TEXT, producer TEXT, release_date INTEGER, running_time INTEGER, url text). Press the play icon to run the query. 
    - After table is created, you'll see it under 'tables.' Right-click the "new_movies" table and import the new_movies.csv file that is included in this project folder. In the settings, keep the header on. 
5. On your browser, go to "localhost:3000" to view the web app.
