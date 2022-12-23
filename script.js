let weekDays = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

let months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

let currentTemperature = {
  temp: 9,
  unit: "c",
};

function currentDate() {
  let now = new Date();
  let hour = now.toTimeString().slice(0, 2);
  let minutes = now.toTimeString().slice(3, 5);
  let month = months[now.getMonth()];
  let date = now.getDate();

  let day = weekDays[now.getDay()].slice(0, 3);
  return {
    date: `${day}, ${date} ${month}`,
    time: `${hour}:${minutes}`,
  };
}

function exchangeDate() {
  let d = currentDate();
  let dateElement = document.querySelector("#current-date");
  let timeElement = document.querySelector("#current-time");

  dateElement.innerHTML = d.date;
  timeElement.innerHTML = d.time;
}

function formEventListener() {
  let form = document.querySelector("#city-search-form");
  form.addEventListener("submit", onSubmit);
  let button = document.querySelector("#myLocation");
  button.addEventListener("click", getMyLocation);
}

function getMyLocation() {
  navigator.geolocation.getCurrentPosition(getWeatherFromMyPosition);
}

function getWeatherFromMyPosition(event) {
  let apiKey = "445905dadb3d2b0c6f1b916c9d0e3860";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${event.coords.latitude}&lon=${event.coords.longitude}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(getCityTemperature);
}

function onSubmit(event) {
  event.preventDefault();
  let value = event.target[0].value; // input value in form ie. Malmö

  // insert API
  let apiKey = "445905dadb3d2b0c6f1b916c9d0e3860";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${value}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(getCityTemperature);
}

function getCityTemperature(temp) {
  console.log(temp);
  let currentTemp = Math.round(temp.data.main.temp);
  currentTemperature.temp = currentTemp;
  currentTemperature.unit = "c";
  switchTemp();
  // Set city name
  let element = document.querySelector("#change-city"); // html element
  element.innerHTML = temp.data.name;
  // set wind speed
  let windElement = document.querySelector("#windSpeed");
  windElement.innerHTML = Math.round(temp.data.wind.speed);
  // set humidity
  let humidityElement = document.querySelector("#percentageHumidity");
  humidityElement.innerHTML = Math.round(temp.data.main.humidity);
  // set icon
  let iconurl =
    "http://openweathermap.org/img/w/" + temp.data.weather[0].icon + ".png";
  let weatherIcon = document.querySelector(".bigCloud");
  weatherIcon.src = iconurl;
  // format and set weather condition
  let weatherCondition = document.querySelector("#weatherCondition");
  let description = temp.data.weather[0].description;
  weatherCondition.innerHTML =
    description.slice(0, 1).toUpperCase() + description.slice(1);
}

function unitSwitchListeners() {
  let c = document.querySelector("#setCelsius");
  let f = document.querySelector("#setFahrenheit");

  c.addEventListener("click", setCelsius);
  f.addEventListener("click", setFahrenheit);
}

function setCelsius(event) {
  if (currentTemperature.unit == "c") {
  } else {
    // convert temp to celsius
    currentTemperature.temp = Math.round((currentTemperature.temp - 32) / 1.8);
    currentTemperature.unit = "c";
    switchTemp();
  }
}

function setFahrenheit(event) {
  if (currentTemperature.unit == "f") {
  } else {
    // convert temp to fahrentheit
    currentTemperature.temp = Math.round(currentTemperature.temp * 1.8 + 32);
    currentTemperature.unit = "f";
    switchTemp();
  }
}

function switchTemp() {
  let currentTempElement = document.querySelector("#currTemp");
  currentTempElement.innerHTML = currentTemperature.temp;
}
getMyLocation();
exchangeDate();
formEventListener();
unitSwitchListeners();
