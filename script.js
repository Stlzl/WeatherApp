const input = document.querySelector('.text-input');
const searchIcon = document.querySelector('.icon-search')
const buttonSearch = document.querySelector('.icon-button')
const wind = document.querySelector('.wind')
const temp = document.querySelector('.temp')
const city = document.querySelector('.city')
const image = document.querySelector('.image');
const weatherText = document.querySelector('.weatherName')
const weatherBox = document.querySelector('.weatherBox')
const contentIn = document.querySelector('.infoCheck')

input.addEventListener('focus', focusElement);
input.addEventListener('focusout', unfocusElement);
buttonSearch.addEventListener('click', searchWeather);

function focusElement() {
    searchIcon.classList.add('focus');
    buttonSearch.classList.add('focus');
    input.classList.add('focus-input');
}

function unfocusElement() {
    searchIcon.classList.remove('focus');
    buttonSearch.classList.remove('focus');
    input.classList.remove('focus-input');
}

function searchWeather() {
    let cityName = input.value;
    let weather;
    let cords;
    fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${cityName}&limit=1&appid=4f779082b626704aaea94cd2f2328f54`)
        .then((response) => {
            return response.json();
        })
        .then((data) => {
            cords = data;
            output()
        });

    function output() {
        let lat = cords[0].lat;
        let lon = cords[0].lon;
        fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=4f779082b626704aaea94cd2f2328f54`)
        .then((response) => {
            return response.json();
        })
        .then((weatherData) => {
            weather = weatherData;
            weatherResult();
        });
    }

    function weatherResult() {
        weatherBox.classList.add('displayWeather');
        contentIn.classList.add('infoNewCheck')
        searchIcon.classList.add('resultBorderLeft');
        buttonSearch.classList.add('resultBorderRight');
        city.innerHTML = `${cords[0].name}`;
        console.log(weather)
        temp.innerHTML = `<i class="fa-solid fa-temperature-half temp-icon"></i> ${Math.round(weather.main.temp - 273.15)}&#176`
        wind.innerHTML = `<i class="fa-solid fa-wind wind-icon"></i> ${weather.wind.speed}`
        let weatherCond = weather.weather[0].id;

        if (weatherCond >= 200 && weatherCond < 300) {
            image.src = 'img/iconThunder.png'
            weatherText.innerHTML = 'Thunder';
        } else if (weatherCond >= 300 && weatherCond < 400) {
            image.src = 'img/iconDrizzle.png'
            weatherText.innerHTML = 'Drizzle';
        } else if (weatherCond >= 500 && weatherCond < 600) {
            image.src = 'img/iconRain.png'
            weatherText.innerHTML = 'Rain';
        } else if (weatherCond >= 600 && weatherCond < 700) {
            image.src = 'img/iconSnow.png'
            weatherText.innerHTML = 'Snow';
        } else if (weatherCond >= 700 && weatherCond < 800) {
            image.src = 'img/iconMist.png'
            weatherText.innerHTML = 'Mist';
        } else if (weatherCond >= 802) {
            image.src= 'img/iconCloud.png'
            weatherText.innerHTML = 'Cloudy';
        }

        switch (weatherCond) {
            case 800:
                if (weather.weather.icon == '01d') {
                    image.src = 'img/iconSunny.png'
                    weatherText.innerHTML = 'Sunny';
                } else {image.src = 'img/iconMoon.png'
                    weatherText.innerHTML = 'Clear';
                    }
                break;

            case 801:
                if(weather.weather.icon == '02d') {
                    image.src = 'img/iconSunnyCloud.png'
                    weatherText.innerHTML = 'A little cloudy';
                } else {image.src = 'img/iconMoonCloud.png'
                    weatherText.innerHTML = 'A little cloudy';
                    }
                break;

            default:
                break;
        }
    }
}