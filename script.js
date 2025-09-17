const cityInput = document.querySelector(".city-input");
const searchBtn = document.querySelector(".search-btn");
const notFoundSection = document.querySelector(".not-found");
const searchCitySection = document.querySelector(".search-city");
const weatherInfoSection = document.querySelector(".weather-info");
const countryTxt = document.querySelector(".country-txt");
const tempTxt = document.querySelector(".temp-txt");
const conditionTxt = document.querySelector(".condition-txt");
const humidityValueTxt = document.querySelector(".humidity-value-txt");
const windValueTxt = document.querySelector(".wind-value-txt");
const weatherSummaryImg = document.querySelector(".weather-summary-img");
const currentDateTxt = document.querySelector(".current-date-txt");

const apiKey = "2106ed0f99ac5c086fe8c5dc2aac612b";

function normalizeCityName(city) {
  return city
    .trim()
    .replace(/\s+/g, " ")
    .toLowerCase()
    .replace(/\b\w/g, (c) => c.toUpperCase());
}

window.addEventListener("load", () => {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;
        updateWeatherByCoords(latitude, longitude);
      },
      (error) => {
        console.error("Geolocation error:", error.message);
        showDisplaySection(searchCitySection);
      }
    );
  } else {
    console.log("Geolocation not supported.");
    showDisplaySection(searchCitySection);
  }
});

searchBtn.addEventListener("click", () => {
  if (cityInput.value.trim() !== "") {
    const normalizedCity = normalizeCityName(cityInput.value);
    updateWeatherInfo(normalizedCity);
    cityInput.value = "";
    cityInput.blur();
  }
});

cityInput.addEventListener("keydown", (event) => {
  if (event.key === "Enter" && cityInput.value.trim() !== "") {
    const normalizedCity = normalizeCityName(cityInput.value);
    updateWeatherInfo(normalizedCity);
    cityInput.value = "";
    cityInput.blur();
  }
});

async function getFetchData(endPoint, city) {
  const apiUrl = `https://api.openweathermap.org/data/2.5/${endPoint}?q=${city}&appid=${apiKey}&units=metric`;
  const response = await fetch(apiUrl);
  return response.json();
}

async function getFetchDataByCoords(endPoint, lat, lon) {
  const apiUrl = `https://api.openweathermap.org/data/2.5/${endPoint}?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
  const response = await fetch(apiUrl);
  return response.json();
}

function getWeatherIcon(id) {
  if (id <= 232) return "thunderstorm.svg";
  else if (id <= 321) return "drizzle.svg";
  else if (id <= 531) return "rain.svg";
  else if (id <= 622) return "snow.svg";
  else if (id <= 781) return "atmosphere.svg";
  else if (id === 800) return "clear.svg";
  else return "clouds.svg";
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

async function updateWeatherInfo(city) {
  document.querySelector(".loader").style.display = "block";

  try {
    const weatherData = await getFetchData("weather", city);
    const forecastData = await getFetchData("forecast", city);

    if (weatherData.cod != 200) {
      showDisplaySection(notFoundSection);
      return;
    }

    const {
      name: country,
      main: { temp, humidity },
      weather: [{ id, main }],
      wind: { speed },
    } = weatherData;

    countryTxt.textContent = country;
    tempTxt.textContent = Math.round(temp) + " °C";
    conditionTxt.textContent = main;
    humidityValueTxt.textContent = humidity + "%";
    windValueTxt.textContent = speed + " m/s";
    currentDateTxt.textContent = getCurrentDate();
    weatherSummaryImg.src = `weather/${getWeatherIcon(id)}`;

    updateForecastUI(forecastData.list);

    showDisplaySection(weatherInfoSection);
  } catch (error) {
    console.error("API error:", error);
    showDisplaySection(notFoundSection);
  } finally {
    document.querySelector(".loader").style.display = "none";
  }
}

async function updateWeatherByCoords(lat, lon) {
  document.querySelector(".loader").style.display = "block";

  try {
    const weatherData = await getFetchDataByCoords("weather", lat, lon);
    const forecastData = await getFetchDataByCoords("forecast", lat, lon);

    if (weatherData.cod != 200) {
      showDisplaySection(notFoundSection);
      return;
    }

    const {
      name: country,
      main: { temp, humidity },
      weather: [{ id, main }],
      wind: { speed },
    } = weatherData;

    countryTxt.textContent = country;
    tempTxt.textContent = Math.round(temp) + " °C";
    conditionTxt.textContent = main;
    humidityValueTxt.textContent = humidity + "%";
    windValueTxt.textContent = speed + " m/s";
    currentDateTxt.textContent = getCurrentDate();
    weatherSummaryImg.src = `weather/${getWeatherIcon(id)}`;

    updateForecastUI(forecastData.list);

    showDisplaySection(weatherInfoSection);
  } catch (error) {
    console.error("API error:", error);
    showDisplaySection(notFoundSection);
  } finally {
    document.querySelector(".loader").style.display = "none";
  }
}

function showDisplaySection(section) {
  [weatherInfoSection, searchCitySection, notFoundSection].forEach(
    (sec) => (sec.style.display = "none")
  );
  section.style.display = "flex";
}

function updateForecastUI(forecastList) {
  const forecastItems = document.querySelectorAll(".forecast-item");
  const dailyForecastMap = {};

  for (let item of forecastList) {
    const utcDate = new Date(item.dt_txt + " UTC");
    const dayKey = utcDate.toISOString().split("T")[0];

    if (!dailyForecastMap[dayKey] && utcDate.getUTCHours() === 12) {
      dailyForecastMap[dayKey] = item;
    }
  }

  const sortedDates = Object.keys(dailyForecastMap).sort(
    (a, b) => new Date(a) - new Date(b)
  );

  const dailyForecasts = sortedDates
    .slice(0, 5)
    .map((day) => dailyForecastMap[day]);

  dailyForecasts.forEach((forecast, index) => {
    if (!forecastItems[index]) return;
    const date = new Date(forecast.dt_txt + " UTC");
    const day = date.toLocaleDateString("en-GB", {
      weekday: "short",
      day: "2-digit",
      month: "short",
    });
    const temp = Math.round(forecast.main.temp);
    const icon = getWeatherIcon(forecast.weather[0].id);

    forecastItems[index].querySelector(".forecast-item-date").textContent = day;
    forecastItems[index].querySelector(
      ".forecast-item-temp"
    ).textContent = `${temp} °C`;
    forecastItems[index].querySelector(
      ".forecast-item-img"
    ).src = `weather/${icon}`;
  });
}
