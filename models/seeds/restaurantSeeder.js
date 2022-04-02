const bcrypt = require('bcryptjs')
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}
const db = require('../../config/mongoose')
const Restaurant = require('../restaurant')
const User = require('../user')
const restaurantList = require('../../restaurant.json')
const rest = restaurantList.results
const SEED_USER = [
  {
    email: 'user1@example.com',
    password: '12345678',
    restaurant: [0, 1, 2]
  },
  {
    email: 'user2@example.com',
    password: '12345678',
    restaurant: [3, 4, 5]
  },
  {
    email: 'user3@example.com',
    password: '12345678',
    restaurant: [0, 1, 2]
  }
]



db.once('open', () => {
  for (let seed of SEED_USER) {
  bcrypt
    .genSalt(10)
    .then(salt => bcrypt.hash(seed.password, salt))
    .then(hash => User.create({
      email: seed.email,
      password: hash
    }))
    .then(user => {
      const userId = user._id
      return Promise.all(Array.from(
        (_, i) => {
          let index = seed.restaurant[i]
          return Restaurant.create({
            name: `${rest[index].name}`,
            category: `${rest[index].category}`,
            rating: `${rest[index].rating}`,
            location: `${rest[index].location}`,
            google_map: `${rest[index].google_map}`,
            phone: `${rest[index].phone}`,
            description: `${rest[index].description}`,
            image: `${rest[index].image}`,
            userId
          })
        }    
      ))

      // for(let i = 0; i < seed.restaurant.length; i++) {  
      //   let index = seed.restaurant[i] 
      //   return Restaurant.create({
      //     name: `${rest[index].name}`,
      //     category: `${rest[index].category}` ,
      //     rating: `${rest[index].rating}`,
      //     location: `${rest[index].location}` ,
      //     google_map: `${rest[index].google_map}` ,
      //     phone: `${rest[index].phone}` ,
      //     description: `${rest[index].description}` ,
      //     image: `${rest[index].image}`, 
      //     userId })
      // }
    })
    .then(() => {
      console.log('done')
      process.exit()
    })

  }

  // console.log('mongo connected!')

  // for (let i = 0; i < rest.length; i++) {  
  //   Restaurant.create({ name: `${rest[i].name}` ,
  //      category: `${rest[i].category}` ,
  //      rating: `${rest[i].rating}`,
  //      location: `${rest[i].location}` ,
  //      google_map: `${rest[i].google_map}` ,
  //      phone: `${rest[i].phone}` ,
  //      description: `${rest[i].description}` ,
  //      image: `${rest[i].image}` })
  //      .then(() => {
  //        console.log('restaurantSeeder done')
  //        db.close()
  //      })
  //      .catch(errpr => console.log(error))
  //      .finally(() => process.exit())
  // }


})

