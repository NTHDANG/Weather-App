import humidity_icon from "../assets/weatherPic/humidity.png";
import wind_icon from "../assets/weatherPic/wind.png";

// COMPONENT HIỂN THỊ THÔNG TIN THỜI TIẾT HIỆN TẠI
// Nhận dữ liệu thời tiết qua prop `data`
const CurrentWeatherDisplay = ({ data }) => {
  // Nếu không có dữ liệu, hiển thị thông báo yêu cầu nhập thành phố
  if (!data) {
    return (
      <p className="text-stone-300 text-base mt-5">
        Enter a city to get weather data.
      </p>
    );
  }

  // Hiển thị dữ liệu thời tiết khi có
  return (
    <>
      <img src={data.icon} alt="Weather Icon" className="w-[75px] mt-[20px]" />
      <p className="text-stone-300 text-[45px]">{data.temperature}°c</p>
      <p className="text-stone-300 text-[20px]">{data.location}</p>
      <div className="w-full mt-[50px] text-stone-300 flex justify-around">
        {/* độ ẩm */}
        <div className="flex items-start gap-1.5 text-[20px]">
          <img
            src={humidity_icon}
            alt="Humidity Icon"
            className="w-[20px] mt-[5px]"
          />
          <div>
            <p>{data.humidity}%</p>
            <span className="block text-[15px]">Humidity</span>
          </div>
        </div>
        {/* tốc độ gió */}
        <div className="flex items-start gap-1.5 text-[20px]">
          <img src={wind_icon} alt="Wind Icon" className="w-[20px] mt-[5px]" />
          <div>
            <p>{data.windSpeed} Km/h</p>
            <span className="block text-[15px]">Wind Speed</span>
          </div>
        </div>
        {/* áp suất */}
        <div className="flex items-start gap-1.5 text-[20px]">
          <div>
            <p>{data.pressure} hPa</p>
            <span className="block text-[15px]">Pressure</span>
          </div>
        </div>
        {/* tầm nhìn */}
        <div className="flex items-start gap-1.5 text-[20px]">
          <div>
            <p>{data.visibility / 1000} km</p>
            <span className="block text-[15px]">Visibility</span>
          </div>
        </div>
      </div>
    </>
  );
};

export default CurrentWeatherDisplay;
