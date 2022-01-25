const db = require('../../config/mongoose')
const Restaurant = require('../../models/restaurant')
const restaurantList = require('../../restaurant.json')
const rest = restaurantList.results

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
       .then(() => {
         console.log('restaurantSeeder done')
         db.close()
       })
       .catch(errpr => console.log(error))
       .finally(() => process.exit())
  }
  

})

