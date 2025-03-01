const express = require ('express');
const router = express.Router();
const Book = require('../models/book')

// This route fetches the 10 most recently created books from the database 
// and renders the home page with these books.
router.get('/', async(req, res) => {
    let books
    try {
        books = await Book.find().sort({ createdAt: 'desc'}).limit(10).exec()

    } catch {
        books = []

    }
    res.render('index', {books: books })
})

module.exports = router;
