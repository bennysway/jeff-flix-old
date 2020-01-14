let url = "https://api.themoviedb.org/3/discover/movie?api_key=d4c2d2239d0577b96a92cd3fab6e57be&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1";
let settings = { method: "Get" };
fetch(url, settings)
    .then(res => res.json())
    .then((fetchResults) => {
        console.log(fetchResults)
        results = fetchResults
        loadShowcase(results.results[0])
        loadScroller(results.results,0,10,"trendingContainer")
        loadScroller(results.results,11,-1,"releasesContainer")
        let url2 = "https://api.themoviedb.org/3/discover/movie?api_key=d4c2d2239d0577b96a92cd3fab6e57be&/discover/movie/?language=PL&region=PL&sort_by=vote_average.desc&include_video=false&page=1";
        fetch(url2, settings)
            .then(res2 => res2.json())
            .then((fetchLocalResults) => {
                console.log(fetchLocalResults)
                loadLocal(fetchLocalResults.results[0])
                loadScroller(fetchLocalResults.results,0,10,"localTrendingContainer")
                loadScroller(fetchLocalResults.results,11,-1,"localReleasesContainer")
            });

    });

/*
for locality ...later
fetch('http://ipinfo.io', {
        // mode: 'no-cors',
        method: 'GET',
        headers: {
            Accept: 'application/json',
        },
    },
    ).then(response => {
        if (response.ok) {
            response.json().then(data => {
                //let data = JSON.parse(body);
                let country = data.country;
                city = data.city;
                console.log(city)
                let url2 = "https://api.themoviedb.org/3/discover/movie?api_key=d4c2d2239d0577b96a92cd3fab6e57be&/discover/movie/?language=" + country + "&region=" + country + "&sort_by=vote_average.desc&include_video=false&page=1";
                fetch(url2, settings)
                    .then(res2 => res2.json())
                    .then((fetchLocalResults) => {
                        console.log(fetchLocalResults)
                        loadLocal(fetchLocalResults.results[0])
                    });
            });
        }
    });
*/

//load to html
function loadShowcase(result) {
    document.getElementById("showcaseImage").setAttribute('src', "https://image.tmdb.org/t/p/original" + result.backdrop_path);
    document.getElementById("showcaseImage").setAttribute('onerror', 'imgError(this);');
    document.getElementById("showcasePreview").setAttribute('href', '/preview?id=' + result.id);
    document.getElementById("showcaseBook").setAttribute('href', '/book?name=' + result.original_title);
    document.getElementById("showcaseYoutube").setAttribute('href', 'https://www.youtube.com/results?search_query=' + result.original_title + " trailer");
    document.getElementById("showcaseWishList").setAttribute('href', '/wishlist?id=' + result.id);
    document.getElementById("showcaseTitle").innerHTML = result.original_title
    document.getElementById("showcaseOverview").innerHTML = result.overview
    document.getElementById("showcaseRatings").innerHTML = "Ratings :" + result.vote_average
    document.getElementById("showcaseReleased").innerHTML = "Released:" + result.release_date
    document.getElementById("showcaseLanguage").innerHTML = "Language:" + result.original_language
    
}
function loadScroller(results,start,end,id) {
    var text = ""
    if(end == -1) end = results.length
    for (var i = start; i < end; i++) {
        var queryString = Object.keys(results[i]).map(key => key + '=' + results[i][key]).join('&');
        text += "<div onclick=\"preview('"+results[i].id+"')\""
        text += "class=\"card\">"
        text += "<img src=\"https://image.tmdb.org/t/p/w185" + results[i].poster_path + "\" alt=\"test image\" onerror=\"imgError(this);\">"
        text += "<div class=\"container\">"
        text += results[i].original_title + "</br>"
        text += results[i].vote_average + "</br>"
        text += "</div>"
        text += "</div>"
    }
    document.getElementById(id).innerHTML = text
}

function loadReleases(results) {
    var text = ""
    for (var i = 10; i < results.length; i++) {
        text += "<div class=\"card\">"
        text += "<img src=\"https://image.tmdb.org/t/p/w342" + results[i].poster_path + "\" alt=\"test image\" onerror=\"imgError(this);\">"
        text += "<div class=\"container\">"
        text += results[i].original_title + "</br>"
        text += results[i].vote_average + "</br>"
        text += "</div>"
        text += "</div>"
    }
    document.getElementById("releasesContainer").innerHTML = text
}


function loadLocal(result) {
    document.getElementById("localImage").setAttribute('src', "https://image.tmdb.org/t/p/original" + result.backdrop_path);
    document.getElementById("showcaseImage").setAttribute('onerror', 'imgError(this);');
    document.getElementById("localTitle").innerHTML = result.original_title
    document.getElementById("localOverview").innerHTML = result.overview
    document.getElementById("localRatings").innerHTML = "Ratings :" + result.vote_average
    document.getElementById("localReleased").innerHTML = "Released:" + result.release_date
    document.getElementById("localLanguage").innerHTML = "Language:" + result.original_language
}

function preview(id) {
    window.location.href = "/preview?id="+id
}