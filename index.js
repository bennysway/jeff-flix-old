const express = require('express')
var jsrender = require('jsrender')

const app = express()

var book = require('./app/book')
var home = require('./app/home')
var preview = require('./app/preview')
var cinemacity = require('./app/citycinemacity')

app.use('/',home)
app.use('/book',book)
app.use('/preview',preview)
app.use('/cinemacity',cinemacity)
app.use(express.static(__dirname + '/public'))

const port = process.env.port || 8080

app.get('/cinemas', function (req, res) {
    const tmpl = jsrender.templates('./public/html/cinemas.html');
    const html = tmpl.render()
    res.send(html)
});
app.get('/login', function (req, res) {
    const tmpl = jsrender.templates('./public/html/login.html');
    const html = tmpl.render()
    res.send(html)
});
app.get('/account', function (req, res) {
    const tmpl = jsrender.templates('./public/html/login.html');
    const html = tmpl.render()
    res.send(html)
});
app.get('/bookings', function (req, res) {
    const tmpl = jsrender.templates('./public/html/login.html');
    const html = tmpl.render()
    res.send(html)
})

app.listen(port, () => console.log(`listening on port ${port}`))
