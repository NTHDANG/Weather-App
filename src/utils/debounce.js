// src/utils/debounce.js

// Hàm debounce: Trì hoãn việc thực thi một hàm cho đến khi một khoảng thời gian nhất định trôi qua
// mà không có lời gọi nào khác.
// `func`: Hàm cần được debounce.
// `delay`: Thời gian trì hoãn (miliseconds).
export const debounce = (func, delay) => {
  let timeoutId; // Biến để lưu trữ ID của timeout

  // Trả về một hàm mới đã được debounce
  return (...args) => {
    // Xóa timeout cũ nếu có, để reset thời gian chờ
    if (timeoutId) {
      clearTimeout(timeoutId);
    }

    // Thiết lập timeout mới
    timeoutId = setTimeout(() => {
      func(...args); // Thực thi hàm gốc sau khi hết thời gian delay
    }, delay);
  };
};
