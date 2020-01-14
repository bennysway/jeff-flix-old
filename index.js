const express = require('express')
const path = require('path')
const app = express()
var jsrender = require('jsrender')
const puppeteer = require('puppeteer');
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
    var movieName = req.query.name
    run('https://www.cinema-city.pl/search?query=' + movieName, '#filmsResults > div')
        .then(results => {
            const tmpl = jsrender.templates('./public/html/book.html');
            const html = tmpl.render({ data: results.data, found: results.found })
            console.log(results)
            res.send(html)
        })
});

function run(puppetUrl, queryObj) {
    return new Promise(async (resolve, reject) => {
        try {
            const browser = await puppeteer.launch({
                userDataDir: './data',
                headless: true
            });
            const page = await browser.newPage();
            let movieURL = ""
            await page.goto(puppetUrl);

            let urls = await page.evaluate((queryObj) => {
                let results = {
                    found: false,
                    data: {}
                }
                let items = document.querySelectorAll(queryObj);
                var BreakException = {}
                try {
                    items.forEach(item => {
                        results.found = true
                        console.log(item)
                        results.data = {
                            url: item.getAttribute('data-url')
                        }
                        throw BreakException;
                    });
                } catch (e) {
                    if (e !== BreakException) throw e;
                    movieURL = results.data
                    console.log(movieURL)
                }
                return results
            }, queryObj)

            browser.close();
            return resolve(urls);
        } catch (e) {
            return reject(e);
        }
    })
}

app.listen(port, () => console.log(`listening on port ${port}`))
