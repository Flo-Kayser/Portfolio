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

const apiKey = "9b55ebd1e0e507bc9118e8c8082551ce";

searchBtn.addEventListener("click", () => {
  if (cityInput.value.trim() != "") {
    updateWeatherInfo(cityInput.value);
    cityInput.value = "";
    cityInput.blur();
  }
});

cityInput.addEventListener("keydown", (event) => {
  if (event.key == "Enter" && cityInput.value.trim() != "") {
    updateWeatherInfo(cityInput.value);
    cityInput.value = "";
    cityInput.blur();
  }
});

async function getFetchData(endpoint, city) {
  const apiUrl = `https://api.openweathermap.org/data/2.5/${endpoint}?q=${city}&appid=${apiKey}&units=metric`;

  const response = await fetch(apiUrl);
  return response.json();
}

function getCurrentDate() {
  const currentDate = new Date();
  const options = {
    weekday: "short",
    day: "2-digit",
    month: "short",
  };
  return currentDate.toLocaleDateString("en-GB", options);
}

function getWeatherIcon(id) {
  if (id <= 232) return "thunderstorm";
  if (id <= 531) return "rainy";
  if (id <= 622) return "weather_snowy";
  if (id <= 781) return "foggy";
  if (id <= 800) return "clear_day";
  if (id <= 802) return "partly_cloudy_day";
  else return "cloud";
}

async function updateWeatherInfo(city) {
  const weatherData = await getFetchData("weather", city);

  if (weatherData.cod != 200) {
    showDisplaySection(notFoundSection);
    return;
  }
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

    // Uhrzeit extrahieren
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
};
