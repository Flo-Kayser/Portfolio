// ========== weatherApp.js ==========

const cityInput = document.querySelector(".city-input");
const searchBtn = document.querySelector(".search-btn");

const notFoundSection = document.querySelector(".not-found");
const searchCitySection = document.querySelector(".search-city");
const weatherInfoSection = document.querySelector(".weather-info");

const cityTxt = document.querySelector(".city-txt");
const countryTxt = document.querySelector(".country-txt");
const tempTxt = document.querySelector(".temp-txt");
const conditionTxt = document.querySelector(".condition-txt");
const humidityValueTxt = document.querySelector(".humidity-value-txt");
const windValueTxt = document.querySelector(".wind-value-txt");
const weatherSummaryImg = document.querySelector(".weather-summary-img");
const currentDateTxt = document.querySelector(".current-data-txt");

const humidityIcon = document.querySelector(".humidity-icon");
const windIcon = document.querySelector(".wind-icon");

const forecastItemContainer = document.querySelector(
  ".forecast-item-container"
);

const hourlyForecastContainer = document.querySelector(
  ".hourly-forecast-item-container"
);
// openWeather api key
const apiKey = "9b55ebd1e0e507bc9118e8c8082551ce"; 

// Search City
searchBtn.addEventListener("click", () => {
  if (cityInput.value.trim() != "") {
    updateWeatherInfo(cityInput.value);
    cityInput.value = "";
    cityInput.blur();
  }
});
// Search City with "ENTER"
cityInput.addEventListener("keydown", (event) => {
  if (event.key == "Enter" && cityInput.value.trim() != "") {
    updateWeatherInfo(cityInput.value);
    cityInput.value = "";
    cityInput.blur();
  }
});

// get Data from API
async function getFetchData(endpoint, city) {
  const apiUrl = `https://api.openweathermap.org/data/2.5/${endpoint}?q=${city}&appid=${apiKey}&units=metric`;

  const response = await fetch(apiUrl);
  return response.json();
}
// get todays Date
function getCurrentDate() {
  const currentDate = new Date();
  const options = {
    weekday: "short",
    day: "2-digit",
    month: "short",
  };
  return currentDate.toLocaleDateString("en-GB", options);
}
// get weather icon on base of id
function getWeatherIcon(id) {
  if (id <= 232) return "thunderstorm";
  if (id <= 531) return "rainy";
  if (id <= 622) return "weather_snowy";
  if (id <= 781) return "foggy";
  if (id <= 800) return "clear_day";
  if (id <= 802) return "partly_cloudy_day";
  else return "cloud";
}
// update the DIsplay for the selected city
async function updateWeatherInfo(city) {
  const weatherData = await getFetchData("weather", city);

  if (weatherData.cod != 200) {
    showDisplaySection(notFoundSection);
    return;
  }
  console.log(weatherData);
  const {
    name: cityName,
    sys: { country: countryCode },
    main: { temp, humidity },
    weather: [{ id, main }],
    wind: { speed },
  } = weatherData;

  cityTxt.textContent = cityName;
  tempTxt.textContent = Math.round(temp) + "°C";
  conditionTxt.textContent = main;
  humidityValueTxt.textContent = humidity + "%";
  windValueTxt.textContent = speed + "m/s";

  weatherSummaryImg.textContent = `${getWeatherIcon(id)}`;
  currentDateTxt.textContent = getCurrentDate();

  countryTxt.innerHTML = "/ " + countryCode;

  humidityIcon.textContent = `${updateHumidityIcon(humidity)}`;
  windIcon.textContent = `${updateWindIcon(speed)}`;

  await updateForecastsInfo(city);

  await updateHourlyForecast(city);

  showDisplaySection(weatherInfoSection);
}
// get forecast vor the next days
async function updateForecastsInfo(city) {
  const forecastsData = await getFetchData("forecast", city);

  const timeTaken = "12:00:00";
  const todayDate = new Date().toISOString().split("T")[0];

  forecastItemContainer.innerHTML = "";
  forecastsData.list.forEach((forecastWeather) => {
    if (
      forecastWeather.dt_txt.includes(timeTaken) &&
      !forecastWeather.dt_txt.includes(todayDate)
    ) {
      updateForecastsWeather(forecastWeather);
    }
  });
}
// create forecast item
function updateForecastsWeather(weatherData) {
  const {
    dt_txt: date,
    weather: [{ id }],
    main: { temp },
  } = weatherData;

  const dateTaken = new Date(date);
  const dateOption = {
    day: "2-digit",
    month: "short",
  };
  const dateResult = dateTaken.toLocaleDateString("en-US", dateOption);

  const forecastItem = `<div class="forecast-item">
                            <h5 class="forecast-item-date regular-txt">${dateResult}</h5>
                            <span class="material-symbols-outlined forecast-item-img">
                            ${getWeatherIcon(id)}
                            </span>
                            <h5 class="forecast-item-temp">${Math.round(
    temp
  )}°C</h5>
                        </div>`;
  forecastItemContainer.insertAdjacentHTML("beforeend", forecastItem);
}
// create hourly-forecast item 
async function updateHourlyForecast(city) {
  const forecastData = await getFetchData("forecast", city);

  if (!forecastData || forecastData.cod !== "200") {
    return;
  }
  const next24Hours = forecastData.list.slice(0, 8);

  hourlyForecastContainer.innerHTML = "";

  next24Hours.forEach((forecast) => {
    const {
      dt_txt: dateTime,
      main: { temp },
      weather: [{ id }],
    } = forecast;

    const time = new Date(dateTime).toLocaleTimeString("en-GB", {
      hour: "2-digit",
      minute: "2-digit",
    });

    const forecastItem = `<div class="hourly-forecast-item">
                            <h5 class="hourly-forecast-time">${time}</h5>
                            <span class="material-symbols-outlined hourly-forecast-img">
                              ${getWeatherIcon(id)}
                            </span>
                            <h5 class="hourly-forecast-temp">${Math.round(
      temp
    )}°C</h5>
                          </div>`;

    // Zum Container hinzufügen
    hourlyForecastContainer.insertAdjacentHTML("beforeend", forecastItem);
  });
}

function updateHumidityIcon(humidity) {
  if (humidity <= 35) return "humidity_low";
  if (humidity <= 75) return "humidity_mid";
  else return "humidity_high";
}
function updateWindIcon(speed) {
  if (speed <= 10) return "airwave";
  if (speed <= 30) return "air";
  if (speed <= 80) return "storm";
  else return "tornado";
}
// select section(normal vs city not found)
function showDisplaySection(section) {
  [weatherInfoSection, searchCitySection, notFoundSection].forEach(
    (section) => (section.style.display = "none")
  );

  section.style.display = "flex";
}

//random city onload
const cities = [
  "Kansas City",
  "London",
  "Los Angeles",
  "Paris",
  "Tokyo",
  "Canberra",
  "Nairobi",
  "Dubai",
  "Rio de Janeiro",
  "Dresden",
];
window.onload = () => {
  const randomCity = cities[Math.floor(Math.random() * cities.length)];
  updateWeatherInfo(randomCity);
  updateWeatherList()
};



// ========== Weather List Save Cities ==========
const markAsFavBtn = document.querySelector(".mark-as-fav");

let citiesArray = JSON.parse(localStorage.getItem('citiesArray')) || [];

markAsFavBtn.addEventListener("click", () => {
  addCityToArray(cityTxt);
});

// mark city as fav
function addCityToArray(cityElement) {
  const cityName = cityElement.textContent;
  
  if (!citiesArray.includes(cityName)) {
    citiesArray.push(cityName);
    console.log(citiesArray);
    updateWeatherList();
    localStorage.setItem('citiesArray', JSON.stringify(citiesArray));
  } else {
    console.log(`${cityName} is already marked.`);
  }
}

//create fav-list element
async function updateWeatherList() {
  const weatherList = document.querySelector(".weather-list");
  weatherList.innerHTML = ""; 

  const weatherPromises = citiesArray.map(async (cityName) => {
    const weatherData = await getFetchData("weather", cityName);
    if (weatherData.cod !== 200) {
      console.error(`error while fetch data for ${cityName}`);
      return null;
    }

    const {
      main: { temp, humidity },
      weather: [{ id, main }],
      sys: { country },
      wind: { speed },
      dt,
      timezone
    } = weatherData;

    const localTime = getLocalTime(dt, timezone);

    console.log("Local Time: ", localTime);

    const listItem = document.createElement("li");
    listItem.innerHTML = `
      <div class="list-location-date-container">
            <div class="list-location">
              <span class="material-symbols-outlined"> location_on </span>
              <h4 class="list-city-txt">${cityName}</h4>
              <h4 class="list-country-txt">/ ${country}</h4>
            </div>
            
            <h4 class="list-current-time-txt"><span class="material-symbols-outlined">
              schedule
              </span>${localTime}</h4>
            <h4 class="list-current-data-txt"><span class="material-symbols-outlined">
              calendar_month
              </span>${getCurrentDate()}</h4>
              </div>

              <div class="list-weather-details-container">
            <div class="list-weather-summary-container">
              <span class="material-symbols-outlined list-weather-summary-img"
                >${getWeatherIcon(id)}</span
              >
              <div class="list-weather-summary-info">
                <h1 class="list-temp-txt">${Math.round(temp)}°C</h1>
                <h3 class="list-condition-txt">${main}</h3>
              </div>
            </div>
            <div class="list-weather-conditions-container">
              <div class="list-condition-item">
                <span class="material-symbols-outlined list-humidity-icon">
                ${updateHumidityIcon(humidity)}
                </span>
                <div class="list-condition-info">
                  <h4 class="regular-txt">Humidity</h4>
                  <h4 class="list-humidity-value-txt">${humidity}%</h4>
                </div>
              </div>
              <div class="list-condition-item">
                <span class="material-symbols-outlined list-wind-icon">
                  ${updateWindIcon(speed)}
                </span>
                <div class="list-condition-info">
                  <h4 class="regular-txt">Wind Speed</h4>
                  <h4 class="list-wind-value-txt">${speed}</h4>
                </div>
              </div>
            </div>    
          </div>
          <button class="unmark-as-fav" datatitle="${cityName}">
            <span class="material-symbols-outlined">circle</span>
            <span class="material-symbols-outlined">close</span>
          </button>
    `;

    return listItem;
  });

  const weatherItems = await Promise.all(weatherPromises);
  weatherItems.forEach((item) => item && weatherList.appendChild(item));
}

// get local time for cities in fav-list
function getLocalTime(unixTimestamp, timezoneOffset) {
  const date = new Date(unixTimestamp * 1000); 
  const offsetInMs = (timezoneOffset - 3600) * 1000; 
  const localDate = new Date(date.getTime() + offsetInMs); 

  const minutes = localDate.getMinutes();
  const roundedMinutes = Math.floor(minutes / 15) * 15; 
  localDate.setMinutes(roundedMinutes, 0, 0); 

  
  // Formatierung der lokalen Zeit
  return localDate.toLocaleTimeString("en-US", {
    hour12: false,
    hour: "2-digit",
    minute: "2-digit",
  });
}

//discard city from fav-list
const unmarkAsFavBtn = document.querySelector(".unmark-as-fav");
document.querySelector(".weather-list").addEventListener("click", (event) => {
  if (event.target.closest(".unmark-as-fav")) {
    const titleToRemove = event.target.closest(".unmark-as-fav").getAttribute("datatitle");
    removeCityfromArray(titleToRemove);
  }
});
function removeCityfromArray(cityTitle) {
  citiesArray = citiesArray.filter(city => city !== cityTitle);
  console.log(citiesArray);
  updateWeatherList()
  localStorage.setItem('citiesArray', JSON.stringify(citiesArray));
}

