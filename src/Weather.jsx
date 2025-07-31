import SearchBar from "./components/SearchBar";
import CurrentWeatherDisplay from "./components/CurrentWeatherDisplay";
import ForecastDisplay from "./components/ForecastDisplay";
import ThemeToggle from "./components/ThemeToggle";
import { useWeather } from "./contexts/WeatherContext";

// COMPONENT HIỂN THỊ ỨNG DỤNG THỜI TIẾT
const Weather = () => {
  const { weatherData, forecastData, searchWeather } = useWeather();

  return (
    <div className="p-5 rounded-[5px] flex flex-col items-center bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 transition-colors duration-300">
      {/* tiêu đề ứng dụng */}
      <h2 className="text-5xl sm:text-9xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600 drop-shadow-lg mb-10 mt-30 dark:from-purple-300 dark:to-pink-500">
        Weather App
      </h2>
      {/* Theme Toggle */}
      <div className="absolute top-5 right-5">
        <ThemeToggle />
      </div>
      {/* input tìm kiếm và nút search */}
      <SearchBar onSearch={searchWeather} />
      {/* hiển thị dữ liệu thời tiết hoặc thông báo */}
      <CurrentWeatherDisplay data={weatherData} />
      {/* hiển thị dữ liệu dự báo */}
      <ForecastDisplay forecastData={forecastData} />
    </div>
  );
};

export default Weather;
