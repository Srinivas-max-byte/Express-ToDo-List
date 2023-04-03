// Importing Express Framework
const express = require('express')
// Initializing express instance
const app = express()
port = 8000
// Using Layout support for ejs in express
const expressLayout = require('express-ejs-layouts')
app.use(expressLayout)
// Using Mongoose ODM
const db = require('./config/mongoose')
// const TodoLists = require('./models/todo_list')
// Used to handle middleware here we are using express.urlencode to use the parser.
app.use(express.urlencoded())
app.use('/', require('./routes'))
app.use(express.static('./assets')) //for getting static
app.set('layout extractStyles', true)// for extracting CSS lines of code
app.set('layout extractScripts', true)// for extracting js lines of code
app.set('view engine', 'ejs');
app.set('views', './views')
app.listen(port, function (err) {
    if (err) {
        console.log(`error in running the ${port}`)
        return;
    }
    console.log(`Server is running @ ${port}`)
})
