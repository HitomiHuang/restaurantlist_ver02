const mongoose = require('mongoose')
const Schema = mongoose.Schema
const restaurantSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  category: {
    type: String,
  },
  rating:{
    type: Number,
  },
  location: {
    type: String,
    required: true
  }, 
  google_map:{
    type: String,
  },
  phone:{
    type: String,
  },
  description:{
    type: String,
  },
  image:{
    type: String,
  }
})
module.exports = mongoose.model('Restaurant', restaurantSchema)