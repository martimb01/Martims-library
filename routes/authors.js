const express = require('express');
const router = express.Router();
const Author = require('../models/author'); 
const Book = require('../models/book')


//GET All Authors
router.get('/', async (req,res) => {
    let searchOptions = {}
    if (req.query.name != null && req.query.name !== '') {
        searchOptions.name = new RegExp(req.query.name, 'i')
    }
    try {
        const authors = await Author.find(searchOptions)
        res.render('authors/index', {
            authors: authors, 
            searchOptions: req.query})
        

    } catch {
        res.redirect('/')
    }
    
})

// GET Create Author Page (renders the page)
router.get('/new', (req,res) => {
    res.render('authors/new', { author: new Author() })
})

// POST to create a new Author
router.post('/', async (req,res) => {
    console.log('post called')
    const author = new Author({
        name: req.body.name
    })
    try {
        const newAuthor = await author.save();
        res.redirect(`authors/${newAuthor.id}`)

    } catch {
        res.render('authors/new', {
            author:author,
            errorMessage: 'Error creating an Author!'
        })
    }
})


// GET Author by Id (renders his books page)
router.get('/:id', async (req,res) => {
    try{
        const author = await Author.findById(req.params.id)
        const books = await Book.find({ author: author.id }).limit(6).exec()
        res.render('authors/show',
            {
                author: author,
                booksByAuthor: books
            })

    } catch {
        res.redirect('/')
    }
})


//GET Author by Id to edit the author (renders authors edit page)
router.get('/:id/edit', async (req,res) => {
    try{
        const author = await Author.findById(req.params.id)
        res.render('authors/edit', { author: author })


    } catch {
        res.redirect('/authors')
    }
    
})

//PUT that updates the Author data (name)
router.put('/:id', async (req,res) => {
    let author
    try {
        author = await Author.findById(req.params.id)
        author.name = req.body.name
        await author.save()
        res.redirect(`/authors/${author.id}`)

    } catch {
        if (author == null) {
            res.redirect('/')
        } else {
            res.render('authors/edit', {
                author: author,
                errorMessage: 'Error updating the Author!'
            })
        }
    }
})

//DELETE Author by Id
router.delete('/:id', async (req, res) => {
    let author;
    try {
        console.log('Deleted worked')
        author = await Author.findById(req.params.id);
        await author.deleteOne();
        res.redirect('/authors');
    } catch (err) {
        console.log(err)
        console.log('Deleted not worked')
        if (author == null) {
            res.redirect('/');
        } else {
            res.redirect(`/authors/${author.id}`);
        }
    }
});




module.exports = router;


