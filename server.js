if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
}
console.log(process.env.NODE_ENV)


//Importing essencial libs for our app
const express = require('express');
const app = express();
const expressEjsLayouts = require ('express-ejs-layouts');
const bodyParser = require('body-parser')
const methodOverride = require('method-override')

//Importing our app routers
const indexRouter = require('./routes/index.js')
const authorsRouter = require('./routes/authors.js')
const booksRouter = require('./routes/books.js')

//Import and set up mongoDB
const mongoose = require('mongoose');
mongoose.connect(process.env.DATABASE_URL);
const db = mongoose.connection;
db.on('error', (error) => {console.error(error)});
db.once('open', () => {console.log('Connected to Mongoose')})



// Setting our view engine (EJS) and layout
app.set('view engine', 'ejs');
app.set('views', __dirname + '/views')
app.set('layout', 'layouts/layout')
app.use(expressEjsLayouts)
//Setting up body Parser with a size limit of 10mb (because of the cover image)
app.use(bodyParser.urlencoded({limit: '10mb', extended: false}))
//Seeting up method override
app.use(methodOverride('_method'))
// Setting up the location of our static files
app.use(express.static('public'))



//Setting up the routers in the routes folder
app.use('/', indexRouter);
app.use('/authors', authorsRouter);
app.use('/books', booksRouter);

//Setting up server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log('Server is listening on port: ' + PORT);
})