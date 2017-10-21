/*

Потрібно обновити погоду дял кожного міса використовуючи ajax виклик.
використовувати потрібно сервіс https://openweathermap.org/current

Приклад посилань для отримання інформації про погоду

http://api.openweathermap.org/data/2.5/weather?appid=1cbb9d3c2d3d13f34be51c51afe4b6cb&q=Lviv,ua
http://api.openweathermap.org/data/2.5/weather?appid=1cbb9d3c2d3d13f34be51c51afe4b6cb&q=Kiev,ua
http://api.openweathermap.org/data/2.5/weather?appid=1cbb9d3c2d3d13f34be51c51afe4b6cb&q=Odessa,ua

інформацію про стна небу шукайте тут 
"weather":[{"id":804,"main":"clouds","description":"overcast clouds","icon":"04n"}],
Іофрмацію про температуру 
"main":{"temp":289.5,"humidity":89,"pressure":1013,"temp_min":287.04,"temp_max":292.04},

1. Зробити запит на openweathermap.org за допоомогою апі і відобразити поточну погоду для кожного міста.
2. Додати кнопку "Обновити", яка буде обновляти погоду в місті.
3. Додати setInterval який буде обноялти погоду що 5хв.

Додаткові завдання
4. В елемент з класом "weather-pic" додати відповідний шаблон https://codepen.io/joshbader/pen/EjXgqr?q=weather&limit=all&type=type-pens
в залежності від параметра data["weather"]["main"]

5. Додати форму, щоб можна було додати нвое місто і відобразити його.

*/

function forecast(city) {

    var apiCall = "http://api.openweathermap.org/data/2.5/weather?appid=1cbb9d3c2d3d13f34be51c51afe4b6cb&q=" + city + ",ua";
    
    var cityRequest = new XMLHttpRequest();

    cityRequest.open("GET", apiCall , false);

    cityRequest.send();

    if(cityRequest.status != 200) {
        console.log("error")
    } else {
        console.log(cityRequest.responseText);
    }
    var cityObject = JSON.parse(cityRequest.responseText);

    var cityTemp = document.querySelector(".card-" + city + " .card-temp");
    cityTemp.textContent = Math.round(cityObject.main.temp - 273);

    var cityWeather = document.querySelector(".card-" + city + " .card-info");

    cityWeather.textContent = cityObject.weather[0].main + " " + cityObject.weather[0].description;
}


function updateForecast () {
    forecast("kiev");

    forecast("lviv");

    forecast("odessa");
}

updateForecast();

var button = document.querySelector(".update");


button.onclick = updateForecast;

setInterval(updateForecast, 300000);

// function addNewCard(newCity) {
//     var cardList = document.querySelector(".card-wrapper");

//     var newCard = document.createElement('section');

//     var cityClass = "card-" + newCity; 
//     newCard.className = "card anim-flip anim-flip-card-2";
//     newCard.classList.add(cityClass);

//     var header = "<header>" + "<h1 class='card-header'>" + newCity + "</h1>" + "</header>";
//     var temp = "<p class='card-temp box-highlight'>" + "</p>";
//     var weatherPic = "<div class='weather-pic'>" + "</div>";
//     var cardInfo = "<p class='card-info'>" + "</p>";

//     newCard.innerHTML = header + "" + temp + "" + weatherPic + "" + cardInfo;
//     cardList.appendChild(newCard);
// }

function cloneNewCard(newCity) {
    var cardList = document.querySelector(".card-wrapper");

    var parentCard = document.querySelector(".card-kiev");

    var newCard = parentCard.cloneNode(true);

    var cityClass = "card-" + newCity; 
    
    newCard.classList.remove("card-kiev");
    
    newCard.classList.add(cityClass);
    newCard.querySelector(".card-header").textContent = newCity;

    cardList.appendChild(newCard);
}

function addNewCity() {
    
    var newCity;
    newCity = document.querySelector(".new-city-name").value;
    
    // addNewCard(newCity);

    cloneNewCard(newCity);
    forecast(newCity);

}

var showWeatherButton = document.querySelector(".show-weather");

showWeatherButton.onclick = addNewCity;
