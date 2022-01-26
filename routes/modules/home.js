const express = require('express')
const router = express.Router()
const Restaurant = require('../../models/restaurant')

router.get('/', (req, res) => {
  const keyword = req.query.keyword
  const lowerKeyword = keyword !== undefined ? keyword.trim().toLowerCase() : null
  const sortValue = req.query.sort

  if((lowerKeyword === '') && !sortValue) {
    return res.redirect('/')
  }

  let keywordObject
  let sortObject
  
  if (sortValue) { 
    switch (sortValue) {
      case 'asc':
        sortObject = { name: 'asc' }
        break;
      case 'desc':
        sortObject = { name: 'desc' }
        break;
      case 'category':
        sortObject = { category: 'asc' }
        break;
      case 'location':
        sortObject = { location: 'asc' }
        break;
      default:
        sortObject = { _id: 'asc' }
    }
  }

  Restaurant.find()
    .lean()
    .sort(sortObject)
    .then(restaurants => {  
      if (keyword) {
        const filterRestaurants = restaurants.filter(item => item.name.toLowerCase().includes(lowerKeyword) ||
          item.category.toLowerCase().includes(lowerKeyword))
        keywordObject = { restaurants: filterRestaurants, sortValue, keyword }
      } else {
        
        keywordObject = { restaurants, sortValue, keyword }
      }  
      res.render('index', keywordObject)})
    .catch(error => {
      console.log(error)
      res.redirect('/error')
    })    
})

router.get('/error', (req, res) => {
  res.send("Custom error landing page.")
})

module.exports = router