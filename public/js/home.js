

function setUserDisplay() {
    if (getCookie("user") != "") {
        userCookie = getCookie("user")
        user = JSON.parse(userCookie)
    }
}

function onImgError(source) {
    source.src = "placeholder.jpg";
    return true;
}