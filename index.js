function formatDate(date) {
  let minutes = date.getMinutes();
  let hours = date.getHours();
  let day = date.getDay();

  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  if (hours < 10) {
    hours = `0${hours}`;
  }

  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  let formattedDay = days[day];
  return `${formattedDay} ${hours}:${minutes}`;
}
function changeIcon(iconUrl) {
  let iconElement = document.querySelector("#weather-icon");
  iconElement.src = iconUrl;
  console;
}
function refreshWeatherData(response) {
  console.log(response.data);
  let currentTempElement = document.querySelector("#current-degrees");
  let currentPercivedTempElement = document.querySelector(
    "#current-percived-temp"
  );
  let currentWindElement = document.querySelector("#current-wind");
  let currentHumidityElement = document.querySelector("#current-humidity");
  let currentPressureElement = document.querySelector("#current-pressure");

  let currentTemp = response.data.temperature.current;
  let currentPercivedTemp = response.data.temperature.feels_like;
  let currentWind = response.data.wind.speed;
  let currentHumidity = response.data.temperature.humidity;
  let currentPressure = response.data.temperature.pressure;
  currentTempElement.innerHTML = Math.round(currentTemp);
  currentPercivedTempElement.innerHTML = Math.round(currentPercivedTemp);
  currentWindElement.innerHTML = Math.round(currentWind);
  currentHumidityElement.innerHTML = Math.round(currentHumidity);
  currentPressureElement.innerHTML = Math.round(currentPressure);
  let iconUrl = response.data.condition.icon_url;
  changeIcon(iconUrl);
}
function searchCity(city) {
  let apiKey = "2td2983oa81aa7bb308858f488f7ba0c";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;
  axios.get(apiUrl).then(refreshWeatherData);
}
function useSubmittedData(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#search-form-input");
  let cityElement = document.querySelector("#city");
  cityElement.innerHTML = searchInput.value;
  searchCity(searchInput.value);
}
let searchEngineElemet = document.querySelector("#search-from");
searchEngineElemet.addEventListener("submit", useSubmittedData);
let currentDateELement = document.querySelector("#current-date");
let currentDate = new Date();

currentDateELement.innerHTML = formatDate(currentDate);

function displayForecast() {
  let forecastElement = document.querySelector("#five-day-forecast");

  let days = ["Tue", "Wed", "Thu", "Fry", "Sat"];
  let forecastHtml = "";

  days.forEach(function (day) {
    forecastHtml =
      forecastHtml +
      `<div class="fiveDayForecast">
        <div class="forecastDay">
          <div class="forecastDate">${day}</div>
          <div class="forecastDayIcon">🌤</div>
          <div class="forecastTemperatures">
            <div class="forecastTemperature">15°</div>
            <div class="forecastTemperature">20°</div>
          </div>
        </div>
      </div>`;
  });
  forecastElement.innerHTML = forecastHtml;
}

displayForecast();
