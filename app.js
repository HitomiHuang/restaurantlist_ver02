const express = require('express')
const app = express()
const port = 3000

const exphbs = require('express-handlebars')

const methodOverride = require('method-override')
const routes = require('./routes')

const mongoose = require('mongoose')
mongoose.connect('mongodb://localhost/restaurant-list')

const db = mongoose.connection

db.on('error', () => {
  console.log('mongodb error!')
})

db.once('open', () => {
  console.log('mongodb connected!')
})

app.engine('hbs', exphbs.engine({defaultLayout: 'main', extname: 'hbs'}))
app.set('view engine', 'hbs')
app.use(express.urlencoded({ extended:true }))

app.use(express.static('public'))
app.use(methodOverride('_method'))
app.use(routes)



app.listen(port, () => {
  console.log(`Express is running on http://localhost:${port}`)
})