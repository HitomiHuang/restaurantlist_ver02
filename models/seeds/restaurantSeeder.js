const mongoose = require('mongoose')
const Restaurant = require('../restaurant')
const restaurantList = require('../../restaurant.json')
const rest = restaurantList.results


mongoose.connect('mongodb://localhost/restaurant-list')
const db = mongoose.connection
db.on('error', () => {
  console.log('mongo error!')
})
db.once('open', () => {
  console.log('mongo connected!')

  for (let i = 0; i < rest.length; i++) {  
    Restaurant.create({ name: `${rest[i].name}` ,
       category: `${rest[i].category}` ,
       rating: `${rest[i].rating}`,
       location: `${rest[i].location}` ,
       google_map: `${rest[i].google_map}` ,
       phone: `${rest[i].phone}` ,
       description: `${rest[i].description}` ,
       image: `${rest[i].image}` })
  }
  console.log('done')

})

