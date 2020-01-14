var express = require('express');
const puppeteer = require('puppeteer');
var jsrender = require('jsrender');


var router = express.Router();

// Home page route.
router.get('/', function (req, res) {
    var movieURL = req.query.movieURL
    run('https://www.cinema-city.pl' + movieURL)
        .then(results => {
            const tmpl = jsrender.templates('./public/html/cinemacitycity.html');
            const html = tmpl.render({ data: results.data, found: results.found })
            console.log(results)
            res.send(html)
        })
})
function run(puppetUrl) {
    return new Promise(async (resolve, reject) => {
        try {
            const browser = await puppeteer.launch({
                userDataDir: './data',
                headless: true
            });
            let results = {
                found: false,
                data: [],
                url: ""
            }
            const page = await browser.newPage();
            await page.goto(puppetUrl);
            let urls = await page.evaluate((results) => {
                let items = document.querySelectorAll('select > option');
                items.forEach(item => {
                    results.found = true
                    console.log(item)
                    results.data.push(
                        {
                            cityName: item.text,
                            cityCode: item.value
                        }
                    )
                });
                return results
            },results)
            await page.evaluate((page,results)=>{
                results.url = page
                return results
            },page.url(),results)         
            browser.close();
            return resolve(urls);
        } catch (e) {
            return reject(e);
        }
    })
}

module.exports = router;
