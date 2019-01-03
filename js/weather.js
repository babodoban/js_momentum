const weather = document.querySelector(".js-weather");

const API_KEY = "821ff7a31a7d63cdf1292a78b44d1b31";
const COORDS = 'coords';

function getWeather(lat, lon){
    fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`).then(function(response) {
        return response.json();
    }).then(function(json){
        const temperature = json.main.temp;
        const place = json.name;
        weather.innerText = `${temperature} @ ${place}`;
    })
    // 이 부분이 callback 을 찾아보게 한 부분이구나 
}

function saveCoords(coordsObj){
    localStorage.setItem(COORDS, JSON.stringify(coordsObj));
    // JSON.stringify 는 js object를 string으로 바꿔주는 것
}

function handleGeoSuccess(position){
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;
    const coordsObj = {
        latitude,
        // latitude: latitude, 객체의 변수 이름과 key 이름을 같이 하는 방법
        longitude        
        // longitude: longitude;
    };
    saveCoords(coordsObj);
    getWeather(latitude, longitude);
}

function handleGeoError(){
    console.log("Can't access geo location");
}

function askForCoords(){
    navigator.geolocation.getCurrentPosition(handleGeoSuccess, handleGeoError);
    // navigator를 이용해서 위치 정보를 불러온다. 성공하면 / 실패하면 
}

function loadCoords(){
    const loadedCoords = localStorage.getItem(COORDS);
    if(loadedCoords === null){
        askForCoords();
    } else {
        const parseCoords = JSON.parse(loadedCoords);
        getWeather(parseCoords.latitude, parseCoords.longitude);
        console.log(parseCoords);
    }
}

function init(){
    loadCoords();
}

init();