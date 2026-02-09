# SkyLune - Weather App

A modern, responsive weather application that provides real-time weather information and a 5-day forecast using the OpenWeatherMap API.

---

![Preview](https://i.postimg.cc/xTyD7RSB/skylune.png)

---

## 📋 Table of Contents
- [Features](#features)
- [Project Structure](#project-structure)
- [Technologies Used](#technologies-used)
- [Setup & Installation](#setup--installation)
- [Usage](#usage)
- [API Integration](#api-integration)
- [File Descriptions](#file-descriptions)

---

## ✨ Features

- **Geolocation Support**: Automatically detects user's location on page load and displays weather
- **City Search**: Search weather conditions for any city worldwide
- **Current Weather Display**: Shows real-time temperature, weather condition, humidity, and wind speed
- **5-Day Forecast**: Displays upcoming weather conditions with dates and temperatures
- **Dynamic Weather Icons**: SVG icons that change based on current weather conditions
  - Thunderstorm, Drizzle, Rain, Snow, Clear, Clouds, Atmosphere
- **Error Handling**: User-friendly error messages when a city is not found
- **Loading Indicator**: Spinner animation while fetching data from API
- **City Name Normalization**: Automatically formats city names with proper capitalization
- **Beautiful UI**: Modern, glassmorphism design with backdrop blur effects
- **Responsive Layout**: Fixed container design optimized for weather information display

---

## 📁 Project Structure

```
weather-app/
├── index.html          # Main HTML structure
├── script.js           # JavaScript functionality & API integration
├── style.css           # CSS styling & animations
├── README.md           # Project documentation
├── assets/             # Static assets
│   ├── background.png
│   ├── background2.jpg
│   ├── background3.jpg
│   └── favic.ico       # Favicon
├── message/            # Message images
│   ├── search-city.png # Initial search prompt image
│   └── not-found.png   # Error message image
└── weather/            # Weather condition icons (SVG)
    ├── atmosphere.svg
    ├── clear.svg
    ├── clouds.svg
    ├── drizzle.svg
    ├── rain.svg
    ├── snow.svg
    └── thunderstorm.svg
```

---

## 🛠 Technologies Used

### Frontend
- **HTML5**: Semantic markup structure
- **CSS3**: Modern styling features
  - Glassmorphism (backdrop-filter, blur effects)
  - CSS Gradients
  - Flexbox layout
  - Responsive design

### JavaScript
- **Vanilla JavaScript (ES6+)**
  - Async/Await for asynchronous operations
  - Fetch API for HTTP requests
  - DOM manipulation with querySelector
  - Event listeners (click, keydown, load)

### External Libraries & APIs
- **Font Awesome 6.7.2**: Icon library
- **Google Fonts**: Poppins font family
- **Material Symbols**: Material Design icons
- **OpenWeatherMap API**: Real-time weather data
- **Geolocation API**: Browser's native geolocation service

---

## 🚀 Setup & Installation

1. **Clone or Download** the project files

2. **Get an API Key**:
   - Visit [OpenWeatherMap](https://openweathermap.org/api)
   - Sign up for a free account
   - Get your API key from the API keys section

3. **Update API Key**:
   - Open `script.js`
   - Replace the `apiKey` variable on line 14:
   ```javascript
   const apiKey = "YOUR_API_KEY_HERE";
   ```

4. **Open the App**:
   - Open `index.html` in your web browser
   - Grant location permission when prompted
   - Or search for any city manually

---

## 💻 Usage

### Automatic Weather Display (Geolocation)
- When the page loads, the app requests permission to access your location
- If granted, it automatically fetches and displays weather for your current location

### Manual City Search
1. Enter a city name in the search input field
2. Click the search button or press **Enter**
3. The app displays current weather and 5-day forecast

### UI Sections
- **Search City Section**: Initial screen prompting user to search
- **Weather Info Section**: Displays current weather and forecast
- **Not Found Section**: Error message when city is not found

---

## 🌐 API Integration

### Endpoints Used
1. **Current Weather API**:
   ```
   https://api.openweathermap.org/data/2.5/weather?q={city}&appid={apiKey}&units=metric
   ```
   - Fetches current weather data for a specific city
   - Returns: temperature, humidity, wind speed, weather condition

2. **5-Day Forecast API**:
   ```
   https://api.openweathermap.org/data/2.5/forecast?q={city}&appid={apiKey}&units=metric
   ```
   - Fetches 5-day forecast (40 items, 3-hour intervals)
   - Filtered to show 12:00 UTC daily forecasts

3. **Geolocation-based Weather**:
   - Uses coordinates (latitude, longitude) from browser's Geolocation API
   - Similar endpoints but with `lat` and `lon` parameters

### Data Retrieved
- **Temperature**: In Celsius
- **Weather ID**: Used to determine weather icon
- **Humidity**: Percentage
- **Wind Speed**: Meters per second
- **Weather Condition**: Text description (e.g., "Clouds", "Rain")

---

## 📄 File Descriptions

### `index.html`
- Main HTML structure
- Contains semantic sections for:
  - Search input header
  - Weather information display (temperature, humidity, wind)
  - 5-day forecast items
  - Error and search prompt messages
- Links to external stylesheets and fonts
- Defers script loading for performance

### `script.js`
- **DOM Elements**: Selects and caches all interactive elements
- **Event Listeners**:
  - Page load: Geolocation check
  - Search button click
  - Enter key in search input
- **Key Functions**:
  - `getFetchData()`: API call by city name
  - `getFetchDataByCoords()`: API call by coordinates
  - `updateWeatherInfo()`: Processes and displays weather data
  - `updateWeatherByCoords()`: Geolocation-based weather update
  - `updateForecastUI()`: Renders 5-day forecast
  - `getWeatherIcon()`: Maps weather IDs to SVG icons
  - `normalizeCityName()`: Formats city input
  - `showDisplaySection()`: Toggles UI sections
  - `getCurrentDate()`: Formats current date display

### `style.css`
- **Global Styles**: Font, spacing, box-sizing
- **Body**: Background image with overlay and blur effect
- **Main Container**: Glassmorphism card design
- **Input Styling**: Search box with focus states
- **Weather Display**: Flexbox layouts for information sections
- **Forecast Items**: Grid/flex layout for forecast cards
- **Loading Animation**: Spinner styles
- **Responsive**: Fixed width design optimized for standard displays

### `assets/`
- **background.png, background2.jpg, background3.jpg**: Full-screen background images
- **favic.ico**: Favicon displayed in browser tab

### `message/`
- **search-city.png**: UI image for initial search prompt
- **not-found.png**: UI image for error state

### `weather/`
- SVG icons representing different weather conditions:
  - Clear (sunny weather)
  - Clouds (cloudy weather)
  - Rain (rainy weather)
  - Snow (snowy weather)
  - Thunderstorm (severe weather)
  - Drizzle (light rain)
  - Atmosphere (fog, mist, etc.)

---

## 🎨 Weather Icon Mapping

The app maps OpenWeatherMap condition IDs to weather icons:

| ID Range | Weather Type | Icon |
|----------|--------------|------|
| 0-232    | Thunderstorm | thunderstorm.svg |
| 233-321  | Drizzle | drizzle.svg |
| 322-531  | Rain | rain.svg |
| 532-622  | Snow | snow.svg |
| 623-781  | Atmosphere | atmosphere.svg |
| 800      | Clear | clear.svg |
| 801-900  | Clouds | clouds.svg |

---

## 🔒 Important Notes

⚠️ **API Key Security**: The API key is currently exposed in the client-side code. For production use, consider:
- Moving the API key to a backend server
- Using environment variables
- Implementing a proxy service

---

## 📱 Browser Compatibility

- Chrome/Edge: Full support
- Firefox: Full support
- Safari: Full support (with geolocation permission)
- IE11: Not supported (uses ES6+ features)

---

## 📦 Dependencies

All dependencies are loaded from CDNs:
- Font Awesome CSS
- Google Fonts (Poppins)
- Material Symbols Outlined
- OpenWeatherMap API (free tier)

---

## 🎯 Future Enhancements

- [ ] Multiple temperature units (Celsius, Fahrenheit, Kelvin)
- [ ] Hourly weather forecast
- [ ] Weather alerts and warnings
- [ ] Save favorite cities
- [ ] Dark mode toggle
- [ ] Weather charts and graphs
- [ ] More detailed weather information (UV index, visibility, etc.)
- [ ] Multilingual support
- [ ] Offline caching with Service Workers

---

## 📝 License

This project is open source and available for personal and educational use.

---

## 👨‍💻 Author

Created as a weather application project demonstrating API integration, modern web design, and JavaScript functionality.

---

**Last Updated**: February 2026
