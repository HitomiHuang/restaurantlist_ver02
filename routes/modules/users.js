const express = require('express')
const router = express.Router()
const User = require('../../models/user')


router.get('/login', (req, res) => {
  res.render('login')
})

router.post('/login', (req, res) => {

})

router.get('/register', (req, res) => {
  res.render('register')
})

router.post('/register', (req, res) => {
  const { name, email, password, confirmPassword } = req.body

  User.findOne({ email })
    .then(user => {
      if (user) {
        console.log('此E-mail已註冊過。')
        return res.render('register', { name, email, password, confirmPassword })
      } else {
        return User.create({ name, email, password, confirmPassword })
          .then(() => res.redirect('/'))
          .catch(error => {
            console.log(error)
            res.render('errorPage', { error })
          })
      }
    }) 

})

module.exports = router