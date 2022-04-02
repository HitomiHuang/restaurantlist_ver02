const bcrypt = require('bcryptjs')
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}
const db = require('../../config/mongoose')
const Restaurant = require('../restaurant')
const User = require('../user')
const restaurantList = require('../../restaurant.json')
const rest = restaurantList.results
const SEED_USERS = [
  {
    email: 'user1@example.com',
    password: '12345678',
    restaurants: rest.slice(0, 3)
  },
  {
    email: 'user2@example.com',
    password: '12345678',
    restaurants: rest.slice(3, 6)
  }
]

db.once('open', () => {
  Promise.all(Array.from(SEED_USERS, seed => {
    return bcrypt
      .genSalt(10)
      .then(salt => bcrypt.hash(seed.password, salt))
      .then(hash => User.create({
        email: seed.email,
        password: hash,
      }))
      .then(user => {
        const userId = user._id
        seed.restaurants.forEach(restaurant => {
          restaurant.userId = userId
        })
        return Restaurant.create(seed.restaurants)    
        })
  })).then(() => {
    console.log('done')
    process.exit()
  })
})

