/* eslint-disable react-refresh/only-export-components */
import React, { createContext, useState, useContext, useCallback, useEffect, useMemo } from 'react';
import { fetchWeatherData, fetchForecastData } from '../services/weatherService';
import clear_icon from "../assets/weatherPic/clear.png";
import cloud_icon from "../assets/weatherPic/cloud.png";
import drizzle_icon from "../assets/weatherPic/drizzle.png";
import rain_icon from "../assets/weatherPic/rain.png";
import snow_icon from "../assets/weatherPic/snow.png";

// Tạo WeatherContext
const WeatherContext = createContext();

// Custom hook để sử dụng WeatherContext
export const useWeather = () => {
  const context = useContext(WeatherContext);
  if (!context) {
    throw new Error('useWeather must be used within a WeatherProvider');
  }
  return context;
};

// Provider component cho WeatherContext
export const WeatherProvider = ({ children }) => {
  // state lưu trữ dữ liệu thời tiết hiện tại
  const [weatherData, setWeatherData] = useState(false);
  // state lưu trữ dữ liệu dự báo thời tiết
  const [forecastData, setForecastData] = useState([]);
  // memoized object chứa các icon thời tiết
  const allIcons = useMemo(
    () => ({
      "01d": clear_icon,
      "01n": clear_icon,
      "02d": cloud_icon,
      "02n": cloud_icon,
      "03d": cloud_icon,
      "03n": clear_icon,
      "04d": drizzle_icon,
      "04n": drizzle_icon,
      "09d": rain_icon,
      "09n": rain_icon,
      "10d": rain_icon,
      "10n": rain_icon,
      "13d": snow_icon,
      "13n": snow_icon,
    }),
    []
  );

  // HÀM TÌM KIẾM THỜI TIẾT
  const searchWeather = useCallback(
    async (city) => {
      try {
        // Lấy dữ liệu thời tiết hiện tại
        const currentData = await fetchWeatherData(
          city,
          import.meta.env.VITE_API_WEATHER_KEY
        );

        // Lấy dữ liệu dự báo
        const forecast = await fetchForecastData(
          city,
          import.meta.env.VITE_API_WEATHER_KEY
        );

        // chọn icon thời tiết phù hợp cho thời tiết hiện tại
        const icon = allIcons[currentData.weather[0].icon] || clear_icon;
        // cập nhật state dữ liệu thời tiết hiện tại
        setWeatherData({
          humidity: currentData.main.humidity,
          windSpeed: currentData.wind.speed,
          temperature: Math.floor(currentData.main.temp),
          location: currentData.name,
          icon: icon,
          pressure: currentData.main.pressure, // Thêm áp suất
          visibility: currentData.visibility, // Thêm tầm nhìn
        });

        // Cập nhật state dữ liệu dự báo
        setForecastData(forecast);
      } catch (error) {
        alert(error.message); // Hiển thị thông báo lỗi cho người dùng
        setWeatherData(false);
        setForecastData([]); // Xóa dữ liệu dự báo nếu có lỗi
      }
    },
    [allIcons]
  );

  // useEffect để tìm kiếm thời tiết cho thành phố mặc định khi component mount
  useEffect(() => {
    searchWeather("can tho"); // thành phố mặc định
  }, [searchWeather]);

  return (
    <WeatherContext.Provider value={{ weatherData, forecastData, searchWeather }}>
      {children}
    </WeatherContext.Provider>
  );
};


