// src/services/weatherService.js

const cache = {}; // Đối tượng cache để lưu trữ dữ liệu
const CACHE_DURATION = 5 * 60 * 1000; // Thời gian cache: 5 phút (miliseconds)

// Hàm để lấy dữ liệu thời tiết từ OpenWeatherMap API
export const fetchWeatherData = async (city, apiKey) => {
  // Kiểm tra nếu tên thành phố rỗng
  if (city === "") {
    throw new Error("Enter City Name");
  }

  const cacheKey = `weather-${city.toLowerCase()}`;
  const cachedData = cache[cacheKey];

  // Kiểm tra nếu có dữ liệu trong cache và còn hợp lệ
  if (cachedData && (Date.now() - cachedData.timestamp < CACHE_DURATION)) {
    console.log(`Fetching weather data for ${city} from cache.`);
    return cachedData.data;
  }

  try {
    // Xây dựng URL API
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;
    // Gọi API
    const response = await fetch(url);

    // Kiểm tra nếu phản hồi không thành công (ví dụ: lỗi 4xx, 5xx)
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || response.statusText);
    }

    const data = await response.json();

    // Xử lý lỗi nếu không tìm thấy thành phố (mã lỗi 404 từ API)
    if (data.cod === "404") {
      throw new Error("City not found!");
    }

    // Lưu dữ liệu vào cache
    cache[cacheKey] = { data, timestamp: Date.now() };
    console.log(`Weather data for ${city} cached.`);
    return data; // Trả về dữ liệu thời tiết thô
  } catch (error) {
    console.error("Error fetching weather data:", error);
    throw error; // Ném lại lỗi để component có thể xử lý
  }
};

// Hàm để lấy dữ liệu dự báo thời tiết 5 ngày/3 giờ từ OpenWeatherMap API
export const fetchForecastData = async (city, apiKey) => {
  // Kiểm tra nếu tên thành phố rỗng
  if (city === "") {
    throw new Error("Enter City Name");
  }

  const cacheKey = `forecast-${city.toLowerCase()}`;
  const cachedData = cache[cacheKey];

  // Kiểm tra nếu có dữ liệu trong cache và còn hợp lệ
  if (cachedData && (Date.now() - cachedData.timestamp < CACHE_DURATION)) {
    console.log(`Fetching forecast data for ${city} from cache.`);
    return cachedData.data;
  }

  try {
    // Xây dựng URL API cho dự báo 5 ngày/3 giờ
    const url = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&appid=${apiKey}&lang=vi`;
    // Gọi API
    const response = await fetch(url);

    // Kiểm tra nếu phản hồi không thành công
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || response.statusText);
    }

    const data = await response.json();

    // Xử lý lỗi nếu không tìm thấy thành phố
    if (data.cod === "404") {
      throw new Error("City not found!");
    }

    // Lưu dữ liệu vào cache
    cache[cacheKey] = { data, timestamp: Date.now() };
    console.log(`Forecast data for ${city} cached.`);
    return data; // Trả về dữ liệu dự báo thô
  } catch (error) {
    console.error("Error fetching forecast data:", error);
    throw error; // Ném lại lỗi để component có thể xử lý
  }
};
