const wrapper = document.querySelector(".wrapper"),
    inputPart = wrapper.querySelector(".input-part"),
    infoTxt = inputPart.querySelector(".info-txt"),
    inputField = inputPart.querySelector("input"),
    locationBtn = inputPart.querySelector("button"),
    wIcon = document.querySelector(".weather-part img"),
    arrowBack = wrapper.querySelector("header i");

let api;

inputField.addEventListener("keyup", e => {
    if (e.key == "Enter" && inputField.value != "") {
        requestApi(inputField.value);
    }
});

locationBtn.addEventListener("click", () => {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(onSuccess, onError);
    } else {
        alert("Your browser not support geolocation api");
    }
});

function onError(error) {
    infoTxt.innerText = error.message;
    infoTxt.classList.add('error');
}

function onSuccess(position) {
    const { latitude, longitude } = position.coords;
    api = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=${apiKey}`
    fetchData();
}

function requestApi(city) {
     api = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;
    fetchData();
}
apiKey = '1a09125682461bc830210b9c4642a78e'

function fetchData() {
    infoTxt.innerText = "Getting weather details...";
    infoTxt.classList.add("pending");
    fetch(api).then(response => response.json()).then(result => weatherDetails(result));
}

function weatherDetails(info) {
    if (info.cod == "404") {
        infoTxt.classList.replace("pending", "error");
        infoTxt.innerText = `${inputField.value} is not a valid city name`;
    } else {
        const city = info.name;
        const country = info.sys.country;
        const {description, id} = info.weather[0];
        const {feels_like, humidity, temp} = info.main;

        if(id == 800){
            wIcon.src = "https://raw.githubusercontent.com/faahu/WeatherApp/0b4e149fe0dd0995bb977e3f029b4f94d9abe18f/Icons/clear.svg";
        } else if (id >= 200 && id <= 232){
            wIcon.src = "https://raw.githubusercontent.com/faahu/WeatherApp/0b4e149fe0dd0995bb977e3f029b4f94d9abe18f/Icons/storm.svg";
        } else if (id >= 600 && id <= 622){
            wIcon.src = "https://raw.githubusercontent.com/faahu/WeatherApp/0b4e149fe0dd0995bb977e3f029b4f94d9abe18f/Icons/snow.svg";
        } else if (id >= 701 && id <= 781){
            wIcon.src = "https://raw.githubusercontent.com/faahu/WeatherApp/0b4e149fe0dd0995bb977e3f029b4f94d9abe18f/Icons/haze.svg";
        } else if (id >= 801 && id <= 804){
            wIcon.src = "https://raw.githubusercontent.com/faahu/WeatherApp/0b4e149fe0dd0995bb977e3f029b4f94d9abe18f/Icons/cloud.svg";
        } else if ((id >= 300 && id <= 321) || (id >= 500 && id <= 531)) {
            wIcon.src = "https://raw.githubusercontent.com/faahu/WeatherApp/48f8e42129694eb00548c72f585676db3903d31b/Icons/rain.svg";
        }


        // Utilizo el método floor para redondear los valores de temperatura

        wrapper.querySelector(".temp .numb").innerText = Math.floor(temp);
        wrapper.querySelector(".weather").innerText = description;
        wrapper.querySelector(".location span").innerText = `${city}`, `${country}`;
        wrapper.querySelector(".temp .numb-2").innerText = Math.floor(feels_like);
        wrapper.querySelector(".humidity span").innerText = `${humidity}`;


        infoTxt.classList.remove("pending", "error");
        wrapper.classList.add("active");
    }
}

arrowBack/addEventListener("click", ()=>{

    wrapper.classList.remove("active");
});
