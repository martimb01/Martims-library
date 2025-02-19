const express = require('express');
const router = express.Router();
const Book = require('../models/book');
const Author = require('../models/author') 


//GET all books
router.get('/', async (req,res) => {
    res.send('All books')

})

// GET new book
router.get('/new', async (req,res) => {
    try {
        const authors = await Author.find({})
        const  book = new Book()
        res.render('books/new', {book: book, authors: authors})
    } catch {
        res.redirect('/books')
    }
  
})

// Create new book
router.post('/', async (req,res) => {
    res.send('Create za book')

})


module.exports = router;