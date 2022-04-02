const mongoose = require('mongoose')
mongoose.connect(process.env.MONGO_URI)

const db = mongoose.connection

db.on('error', () => {
  console.log('mongodb error!')
})

db.once('open', () => {
  console.log('mongodb connected!')
})


module.exports = db