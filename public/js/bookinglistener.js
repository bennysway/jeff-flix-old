let bookingData = {
    city: "",
    time: "",
    date: "",
    movieID: 0,
    seatNumber: 0,
    movieName: "",
    ticketType: 0,
    ticketAmount: 0,   
}
function onSelectCity() {
    let select = document.getElementById('selectCity')
    let value = select.options[select.selectedIndex].innerHTML
    updateCity(value)
}
function onSelectTime() {
    let x = document.getElementById("selectTime").value
    switch (x) {
        case '1':
            document.getElementById("customTime").value = "10:00:00"
            updateTime("10:00:00")
            break
        case '2':
            document.getElementById("customTime").value = "12:00:00"
            updateTime("12:00:00")
            break
        case '3':
            document.getElementById("customTime").value = "15:00:00"
            updateTime("15:00:00")
            break
        case '4':
            document.getElementById("customTime").value = "18:00:00"
            updateTime("18:00:00")
            break
        case '5':
            document.getElementById("customTime").value = "20:00:00"
            updateTime("20:00:00")
            break
        case '6':
            document.getElementById("customTime").value = "21:00:00"
            updateTime("21:00:00")
            break
        case '7':
            document.getElementById("customTime").value = "12:00:00"
            updateTime("12:00:00")
            break
        default:
            alert(x)
            break;
    }
}

function onSelectSeat() {
    let select = document.getElementById('selectSeat')
    let value = select.selectedIndex
    updateSeat(value)
}
function onSelectTickeType(){
    let select = document.getElementById('selectTicketType')
    let value = select.options[select.selectedIndex].innerHTML
    updateTicketType(value)
}
function onSelectSeatRow(){
    let select = document.getElementById('selectTicketType')
    let value = select.options[select.selectedIndex].innerHTML
    updateTicketType(value)
}
function onSelectDay(){
    let select = document.getElementById('selectDay')
    let value = select.selectedIndex
    updateDate(value)
}


function updateTime(time) {
    bookingData.time = time
}
function updateSeat() {
    bookingData.seat
}
function updateCity(city) {
    bookingData.city = city
}
function updateDate(date) {

}
function updateTicketType(type) {
    bookingData.ticketType = type
}
function updateTicketAmount(amount) {
    bookingData.ticketAmount = amount
}

function book() {
    alert(bookingData.city+';'+
    bookingData.date+';'+
    bookingData.time    +';'+
    bookingData.ticketType+';'+
    bookingData.ticketAmount+';'+
    bookingData.seatNumber+';'+
    bookingData.movieName+';'
    )
}
