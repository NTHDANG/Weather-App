import React from "react";
import { groupForecastByTimeOfDay } from "../utils/weatherUtils";

// COMPONENT HIỂN THỊ DỰ BÁO THỜI TIẾT
// Nhận dữ liệu dự báo qua prop `forecastData`
const ForecastDisplay = ({ forecastData }) => {
  if (!forecastData || forecastData.length === 0) {
    return null; // Không hiển thị gì nếu không có dữ liệu dự báo
  }

  const groupedByTimeOfDay = groupForecastByTimeOfDay(forecastData.list);

  return (
    <div
      className="w-full mt-30"
      style={{ color: "var(--color-text-primary)" }}
    >
      <h3
        className="text-4xl font-bold mb-5 flex items-center justify-center text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600 drop-shadow-lg"
      >
        Dự báo 5 ngày tới
      </h3>
      <div className="flex flex-wrap justify-center gap-4 mt-10">
        {groupedByTimeOfDay.map((dayData) => (
          <div
            key={dayData.date}
            className="p-4 rounded-lg flex flex-col items-center min-w-[150px]"
            style={{ backgroundColor: "var(--color-card-bg)" }}
          >
            <p className="font-semibold mb-2">
              {new Date(dayData.date).toLocaleDateString("vi-VN", {
                weekday: "short",
                day: "numeric",
                month: "numeric",
              })}
            </p>
            {Object.entries(dayData.times).map(([timeOfDay, item], index) => (
              <React.Fragment key={timeOfDay}>
                <div className="text-center mb-2 pb-2">
                  <p className="text-sm font-bold">{timeOfDay}</p>
                  <img
                    src={`https://openweathermap.org/img/wn/${item.weather[0].icon}.png`}
                    alt={item.weather[0].description}
                    className="w-10 h-10 mx-auto"
                  />
                  <p className="text-sm">{Math.floor(item.main.temp)}°c</p>
                  <p className="text-xs">{item.weather[0].description}</p>
                </div>
                {index < Object.keys(dayData.times).length - 1 && (
                  <div
                    className="w-4/5 h-px my-2 mx-auto"
                    style={{ backgroundColor: "var(--color-separator)" }}
                  ></div>
                )}
              </React.Fragment>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ForecastDisplay;
