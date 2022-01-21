const express = require('express')
const app = express()
const port = 3000

const exphbs = require('express-handlebars')
const Restaurant = require('./models/restaurant')
const methodOverride = require('method-override')

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

app.get('/', (req, res) => {
  Restaurant.find()
  .lean()
  .sort({ _id: 'asc' })
  .then(restaurants => res.render('index', { restaurants }))
  .catch(error => console.error(error))
})

app.get('/restaurants/new', (req, res) => {
  return res.render('new')
})

app.post('/restaurants', (req, res) => {
  const { name, category, rating, location, google_map, phone, description, image }= req.body
  return Restaurant.create(
    {name,
    category,
    rating,
    location,
    google_map,
    phone,
    description,
    image}
  )
  .then(() => res.redirect('/'))
  .catch(error => console.log(error))
})

app.get('/restaurants/:id', (req, res) => {
  const id = req.params.id
  return Restaurant.findById(id)
    .lean()
    .then((restaurant) => res.render('show', {restaurant}))
    .catch(error => console.log(error))
})

app.get('/search', (req, res) => {
  if(!req.query.keyword){
    return res.redirect('/')
  }
  const keyword = req.query.keyword
  const lowerKeyword = keyword.trim().toLowerCase()

  Restaurant.find({})
    .lean()
    .then(restaurants => {
      const filterRestaurants = restaurants.filter(item => item.name.toLowerCase().includes(lowerKeyword) || item.category.includes(lowerKeyword)) 
      res.render('index', { restaurants: filterRestaurants, keyword})
    })
    .catch(error => console.log(error)) 
})

app.get('/restaurants/:id/edit', (req, res) => {
  const id = req.params.id
  return Restaurant.findById(id)
    .lean()
    .then((restaurant) => res.render('edit', {restaurant}))
    .catch(error => console.log(error))
})

app.put('/restaurants/:id', (req, res) => {
  const id = req.params.id
  const { name, category, rating, location, google_map, phone, description, image } = req.body
  return Restaurant.findById(id)
    .then(restaurant => {
      restaurant.name = name
      restaurant.category = category
      restaurant.rating = rating
      restaurant.location = location
      restaurant.google_map = google_map
      restaurant.phone = phone
      restaurant.description = description
      restaurant.image = image
      return restaurant.save()
    })
    .then(() => res.redirect(`/restaurants/${id}`))
    .catch(error => console.log(error))
})

app.delete('/restaurants/:id', (req, res) => {
  const id = req.params.id
  return Restaurant.findById(id)
    .then(restaurant => restaurant.remove())
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
})

app.listen(port, () => {
  console.log(`Express is running on http://localhost:${port}`)
})