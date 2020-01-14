const express = require('express')
const path = require('path')
const app = express()
var jsrender = require('jsrender')
const axios = require('axios')
var fetch = require('node-fetch')
let settings = { method: "Get" };

var cinemacity = require('./app/citycinemacity')
var home = require('./app/home')
var preview = require('./app/preview')

var port = process.env.port || 8080
app.use(express.static(__dirname + '/public'))
app.use('/',home)
app.use('/preview',preview)
app.use('/cinemacity',cinemacity)


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

app.get('/book', function (req, res) {
    const tmpl = jsrender.templates('./public/html/book.html');
    const html = tmpl.render({  })
    res.send(html)
});


app.listen(port, () => console.log(`listening on port ${port}`))
