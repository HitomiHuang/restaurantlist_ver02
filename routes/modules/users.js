const express = require('express')
const router = express.Router()
const User = require('../../models/user')
const passport = require('passport')



router.get('/login', (req, res) => {
  res.render('login')
})

router.post('/login', passport.authenticate('local', {
  successRedirect: '/',
  failureRedirect: '/users/login'
}))

router.get('/register', (req, res) => {
  res.render('register')
})

router.post('/register', (req, res) => {
  const { name, email, password, confirmPassword } = req.body
  const errors = []

  if (!email || !password || !confirmPassword) {
    errors.push({ message: '請填寫必填欄位。'})
  }
  if (password !== confirmPassword) {
    errors.push({ message: '密碼與確認密碼不相符。'})
  }
  if (errors.length) {
    return res.render('register', { name, email, password, confirmPassword, errors })
  }

  User.findOne({ email })
    .then(user => {
      if (user) {
        errors.push({ message: '此E-mail已註冊過。'})
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

router.get('/logout', (req, res) => {
  req.logout()
  req.flash('success_msg', '你已成功登出。')
  res.redirect('/users/login')
})

module.exports = router