// src/utils/weatherUtils.js

// Hàm để nhóm dữ liệu dự báo theo các khung giờ Sáng, Chiều, Tối
export const groupForecastByTimeOfDay = (forecastList) => {
  const groupedForecast = {};

  // Định nghĩa các khung giờ
  const timeOfDayRanges = {
    "Sáng": { startHour: 6, endHour: 12 },
    "Chiều": { startHour: 12, endHour: 18 },
    "Tối": { startHour: 18, endHour: 24 }, // Tối kéo dài đến hết ngày
  };

  forecastList.forEach(item => {
    const date = new Date(item.dt * 1000); // Chuyển đổi timestamp sang đối tượng Date
    const hour = date.getHours(); // Lấy giờ từ đối tượng Date

    let timeOfDayLabel = "";

    // Xác định khung giờ cho item hiện tại
    if (hour >= timeOfDayRanges["Sáng"].startHour && hour < timeOfDayRanges["Sáng"].endHour) {
      timeOfDayLabel = "Sáng";
    } else if (hour >= timeOfDayRanges["Chiều"].startHour && hour < timeOfDayRanges["Chiều"].endHour) {
      timeOfDayLabel = "Chiều";
    } else if (hour >= timeOfDayRanges["Tối"].startHour) { // Chỉ Tối, không bao gồm Đêm
      timeOfDayLabel = "Tối";
    }

    // Nếu timeOfDayLabel không rỗng (tức là thuộc Sáng, Chiều, Tối), thì mới thêm vào groupedForecast
    if (timeOfDayLabel) {
      // Lấy ngày ở định dạng YYYY-MM-DD để nhóm theo ngày
      const dayKey = date.toISOString().split('T')[0];

      if (!groupedForecast[dayKey]) {
        groupedForecast[dayKey] = {};
      }
      if (!groupedForecast[dayKey][timeOfDayLabel]) {
        groupedForecast[dayKey][timeOfDayLabel] = item; // Chỉ lấy item đầu tiên cho mỗi khung giờ
      }
    }
  });

  // Chuyển đổi đối tượng thành mảng để dễ dàng map trong React
  const result = Object.entries(groupedForecast).map(([date, times]) => ({
    date,
    times,
  }));

  return result;
};
