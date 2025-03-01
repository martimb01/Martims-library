# Martim's Library

Martim's Library is a full stack web app for managing a collection of books and authors.
It allows users to add, edit, and delete books and authors, as well as search for books and authors.

The DB is created when the server is ran, so you have to change the DB url as shown in instructions

## Features

- Add, edit, and delete books
- Add, edit, and delete authors
- Search for books by title, publish date, and author
- Search for authors by name
- View details of books and authors
- Upload and display book cover images

## Technologies Used

- Node.js
- Express.js
- MongoDB
- Mongoose
- EJS 
- FilePond 

## Instructions

1. Clone the repository


2. Install the dependencies: 
    npm install


3. Change the DATABASE_URL on .env to a mongoDB cluster connection

4. Start the application:
    npm run start to run server.js with node
    OR
    npm run devStart to run server.js with nodemon
  

5. Open your browser and navigate to `http://localhost:3000`