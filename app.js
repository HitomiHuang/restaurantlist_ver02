const express = require('express')
const session = require('express-session')
const usePassport = require('./config/passport')
const app = express()
const port = 3000

const exphbs = require('express-handlebars')
const methodOverride = require('method-override')
const routes = require('./routes')
const Handlebars = require('handlebars')
require('./config/mongoose')

app.engine('hbs', exphbs.engine({defaultLayout: 'main', extname: 'hbs'}))


app.set('view engine', 'hbs')

app.use(session({
  secret: 'ThisIsMySecret',
  resave: false,
  saveUninitialized: true
}))
usePassport(app)
app.use((req, res, next) => {
  res.locals.isAuthenticated = req.isAuthenticated()
  res.locals.user = req.user
  next()
})
app.use(express.urlencoded({ extended:true }))

app.use(express.static('public'))
app.use(methodOverride('_method'))
app.use(routes)





Handlebars.registerHelper("ifSelected", function (v1, v2, options) {
  if (v1 === v2) {
    return options.fn(this)
  }
  return options.inverse(this)
})

app.listen(port, () => {
  console.log(`Express is running on http://localhost:${port}`)
})


