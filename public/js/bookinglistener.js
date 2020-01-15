document.getElementById("timeSelect").addEventListener("onchange", onTimeChange());
document.getElementById("seatSelect").addEventListener("onchange", onSeatChange());
function onTimeChange() {
    var x = document.getElementById("list").innerHTML = document.getElementById("timeSelect").value;
    switch (x) {
        case 1:
            document.getElementById("customTime").value = "10:00:00"
            break
        case 2:
            document.getElementById("customTime").value = "12:00:00"
            break
        case 3:
            document.getElementById("customTime").value = "15:00:00"
            break
        case 4:
            document.getElementById("customTime").value = "18:00:00"
            break
        case 5:
            document.getElementById("customTime").value = "20:00:00"
            break
        case 6:
            document.getElementById("customTime").value = "21:00:00"
            break
        case -1:
            document.getElementById("customTime").value = "12:00:00"
            break

    }
    document.getElementById("demo").innerHTML = "You selected: " + x;
}

function onSeatChange() {
    var x = document.getElementById("seatSelect").value;
    document.getElementById("demo").innerHTML = "You selected: " + x;
}
