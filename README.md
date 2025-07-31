# Weather App

Một ứng dụng thời tiết hiện đại và chuyên nghiệp, hiển thị thông tin thời tiết hiện tại và dự báo chi tiết.

## Tính năng

- Hiển thị thời tiết hiện tại chi tiết (nhiệt độ, độ ẩm, tốc độ gió).
- Dự báo thời tiết 5 ngày/3 giờ.
- Tìm kiếm thành phố với gợi ý tự động (autocomplete).
- Giao diện người dùng trực quan, hiện đại với DaisyUI.
- Chế độ sáng/tối (Dark/Light mode) có thể chuyển đổi.
- Tối ưu hóa hiệu suất (debounce, caching).

## Cấu trúc dự án

```
src/
├── assets/             # Chứa các tài nguyên tĩnh như hình ảnh, icon
├── components/         # Các UI component nhỏ, tái sử dụng được (SearchBar, CurrentWeatherDisplay, v.v.)
├── contexts/           # Chứa các React Context để quản lý trạng thái toàn cục
├── hooks/              # Các custom React Hooks để tái sử dụng logic
├── services/           # Chứa logic gọi API (weatherService.js)
├── utils/              # Các hàm tiện ích chung
├── App.jsx             # Component chính của ứng dụng
├── index.css           # CSS toàn cục
└── main.jsx            # Điểm khởi đầu của ứng dụng React
```

## Công nghệ sử dụng

- React
- Vite
- Tailwind CSS
- DaisyUI
- OpenWeatherMap API

## Cài đặt và Chạy dự án

Để chạy dự án này trên máy cục bộ, làm theo các bước sau:

1.  **Clone repository** (nếu bạn đang sử dụng Git):
    ```bash
    git clone <địa_chỉ_repository_của_bạn>
    cd weather
    ```
2.  **Cài đặt các dependencies** (sử dụng pnpm):
    ```bash
    pnpm install
    ```
3.  **Cấu hình API Key**:
    Tạo một file `.env` ở thư mục gốc của dự án và thêm API key của bạn:

    ```
    VITE_API_WEATHER_KEY=your_api_key_here
    ```

    (Thay thế `your_api_key_here` bằng API key thực tế của bạn từ nhà cung cấp dịch vụ thời tiết như OpenWeatherMap).

4.  **Khởi chạy ứng dụng**:
    ```bash
    pnpm run dev
    ```
    Ứng dụng sẽ chạy trên `http://localhost:5173` (hoặc một cổng khác).
