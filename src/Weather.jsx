import search_icon from "./assets/weatherPic/search.png";
import clear_icon from "./assets/weatherPic/clear.png";
import cloud_icon from "./assets/weatherPic/cloud.png";
import drizzle_icon from "./assets/weatherPic/drizzle.png";
import humidity_icon from "./assets/weatherPic/humidity.png";
import rain_icon from "./assets/weatherPic/rain.png";
import snow_icon from "./assets/weatherPic/snow.png";
import wind_icon from "./assets/weatherPic/wind.png";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";

// COMPONENT HIỂN THỊ ỨNG DỤNG THỜI TIẾT
const Weather = () => {
  // tham chiếu đến input nhập tên thành phố
  const inputRef = useRef();
  // state lưu trữ dữ liệu thời tiết
  const [weatherData, setWeatherData] = useState(false);
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
  const search = useCallback(
    async (city) => {
      // kiểm tra nếu tên thành phố rỗng
      if (city === "") {
        alert("Enter City Name");
        return;
      }
      try {
        // xây dựng url api
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${
          import.meta.env.VITE_API_WEATHER_KEY
        }`;
        // gọi api
        const response = await fetch(url);

        if (!response.ok) {
          const errorData = await response.json();
          console.log(`Error: ${errorData.message || response.statusText}`);
          setWeatherData(false);
          return;
        }

        const data = await response.json();

        // xử lý lỗi nếu không tìm thấy thành phố
        if (data.cod === "404") {
          alert("City not found!");
          setWeatherData(false);
          return;
        }

        // chọn icon thời tiết phù hợp
        const icon = allIcons[data.weather[0].icon] || clear_icon;
        // cập nhật state dữ liệu thời tiết
        setWeatherData({
          humidity: data.main.humidity,
          windSpeed: data.wind.speed,
          temperature: Math.floor(data.main.temp),
          location: data.name,
          icon: icon,
        });
      } catch (error) {
        console.error("Error fetching weather data:", error);
        setWeatherData(false);
      }
    },
    [allIcons]
  );

  // useEffect để tìm kiếm thời tiết cho thành phố mặc định khi component mount
  useEffect(() => {
    search("can tho"); // thành phố mặc định
  }, [search]);

  return (
    <div className="p-5 rounded-[5px] flex flex-col items-center">
      {/* tiêu đề ứng dụng */}
      <h2 className="text-5xl sm:text-9xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600 drop-shadow-lg mb-10 mt-30">
        Weather App
      </h2>
      {/* input tìm kiếm và nút search */}
      <div className="flex items-center gap-3 my-5">
        <input
          ref={inputRef}
          type="text"
          placeholder="Enter City Name"
          className="h-[25px] border-none outline-none rounded-full pl-[12.5px] text-stone-300 bg-neutral-800"
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              search(inputRef.current.value);
            }
          }}
        />
        <img
          src={search_icon}
          alt=""
          onClick={() => search(inputRef.current.value)}
          className="w-[25px] p-[7.5px] rounded-full bg-neutral-800 cursor-pointer"
        />
      </div>
      {/* hiển thị dữ liệu thời tiết hoặc thông báo */}
      {weatherData ? (
        <>
          <img src={weatherData.icon} alt="" className="w-[75px] mt-[20px]" />
          <p className="text-stone-300 text-[45px]">
            {weatherData.temperature}°c
          </p>
          <p className="text-stone-300 text-[20px]">{weatherData.location}</p>
          <div className="w-full mt-[50px] text-stone-300 flex justify-around">
            {/* độ ẩm */}
            <div className="flex items-start gap-1.5 text-[13px]">
              <img src={humidity_icon} alt="" className="w-[13px] mt-[5px]" />
              <div>
                <p>{weatherData.humidity}%</p>
                <span className="block text-[8px]">Humidity</span>
              </div>
            </div>
            {/* tốc độ gió */}
            <div className="flex items-start gap-1.5 text-[13px]">
              <img src={wind_icon} alt="" className="w-[13px] mt-[5px]" />
              <div>
                <p>{weatherData.windSpeed} Km/h</p>
                <span className="block text-[8px]">Wind Speed</span>
              </div>
            </div>
          </div>
        </>
      ) : (
        <p className="text-stone-300 text-base mt-5">
          Enter a city to get weather data.
        </p>
      )}
    </div>
  );
};

export default Weather;
