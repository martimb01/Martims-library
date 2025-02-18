const express = require('express');
const router = express.Router();
const Author = require('../models/author'); 


//GET all authors
router.get('/', async (req,res) => {
    let searchOptions = {}
    if (req.query.name != null && req.query.name !== '') {
        searchOptions.name = new RegExp(req.query.name, 'i')
    }
    try {
        console.log(searchOptions)
        const authors = await Author.find(searchOptions)
        res.render('authors/index', {
            authors: authors, 
            searchOptions: req.query})
        

    } catch {
        res.redirect('/')
    }
    
})

// GET new author
router.get('/new', (req,res) => {
    res.render('authors/new', { author: new Author() })
})

// Create new author
router.post('/', async (req,res) => {
    console.log('post called')
    const author = new Author({
        name: req.body.name
    })
    try {
        const newAuthor = await author.save();
        res.redirect('authors')

    } catch {
        res.render('authors/new', {
            author:author,
            errorMessage: 'Error creating an Author!'
        })
    }
})


module.exports = router;


