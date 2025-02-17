const express = require('express');
const app = express();
const expressLayouts = require ('express-ejs-layouts')

const indexRouter = require('./routes/index.js')

// Setting our view engine (EJS) and layout

app.set('view engine', 'ejs');
app.set('views', __dirname + '/views')
app.set('layout', 'layouts/layout')
app.use(expressLayouts)

// Setting up the location of our static files
app.use(express.static('public'))

//Setting up server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log('Server is listening on port: ' + PORT);
})

//Setting up the routers in the routes folder
app.use('/', indexRouter);