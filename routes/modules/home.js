const express = require('express')
const router = express.Router()
const Restaurant = require('../../models/restaurant')

router.get('/', (req, res) => {
  Restaurant.find()
    .lean()
    .sort({ _id: 'asc' })
    .then( restaurants => res.render('index', { restaurants }))
    .catch(error => console.error(error))
})

router.get('/search', (req, res) => {
  const keyword = req.query.keyword
  const lowerKeyword = keyword ? keyword.trim().toLowerCase() : null
  const sortValue = req.query.sort
  
  if ((!lowerKeyword) && !sortValue) {
    res.redirect('/')
  }
  
  if(keyword){
  Restaurant.find({})
  .lean()
  .then(restaurants => {
    const filterRestaurants = restaurants.filter(item => item.name.toLowerCase().includes(lowerKeyword) || item.category.includes(lowerKeyword))
    res.render('index', { restaurants: filterRestaurants, keyword })
  })
  .catch(error => console.log(error))
  }

  if(sortValue){
    let sortObject
    switch (sortValue)  {
      case 'desc':
        sortObject = { name: 'desc' }
        break;
      case 'category':
        sortObject = { category: 'asc'}
        break; 
      case 'location':
        sortObject = { location: 'asc'}
        break;
      default:
        sortObject = { name: 'asc' }
    }
    Restaurant.find()
      .lean()
      .sort(sortObject)
      .then(restaurants => res.render('index', { restaurants }))
      .catch(error => console.error(error))
  }
})

module.exports = router