const express = require('express');
const router = express.Router();
const Author = require('../models/author'); 


//GET all authors
router.get('/', (req,res) => {
    res.render('authors/index')
})

// GET new author
router.get('/new', (req,res) => {
    res.render('authors/new', { author: new Author() })
})

// Create new author
router.post('/', (req,res) => {
    const author = new Author({
        name: req.body.name
    })
    author.save().then(() => {
        res.redirect('authors')
    }).catch((err) => {
        res.render('authors/new' , {
            author: author,
            errorMessage: 'Error creating an author'
        })
    })
})


module.exports = router;