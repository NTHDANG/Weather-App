import { useRef, useState, useMemo } from "react";
import search_icon from "../assets/weatherPic/search.png";
import { debounce } from "../utils/debounce";

// Danh sách thành phố mẫu cho gợi ý (có thể thay bằng API thực tế)
const cities = [
  "Hanoi",
  "Ho Chi Minh City",
  "Da Nang",
  "Can Tho",
  "Hai Phong",
  "Hue",
  "Nha Trang",
  "Da Lat",
  "Vung Tau",
  "Phu Quoc",
  "London",
  "New York",
  "Tokyo",
  "Paris",
  "Berlin",
  "Sydney",
  "Dubai",
  "Singapore",
  "Seoul",
  "Beijing",
  "Moscow",
  "Rome",
  "Madrid",
  "Cairo",
  "Rio de Janeiro",
  "Mexico City",
  "Toronto",
  "Vancouver",
  "Chicago",
  "Los Angeles",
  "San Francisco",
  "Miami",
  "Houston",
  "Dallas",
];

// COMPONENT THANH TÌM KIẾM
// Nhận hàm `onSearch` từ component cha để xử lý tìm kiếm
const SearchBar = ({ onSearch }) => {
  // Tham chiếu đến input nhập tên thành phố
  const inputRef = useRef();
  // State để lưu trữ các gợi ý thành phố
  const [suggestions, setSuggestions] = useState([]);
  // State để kiểm soát việc hiển thị danh sách gợi ý
  const [showSuggestions, setShowSuggestions] = useState(false);

  // Hàm xử lý tìm kiếm, được debounce để tránh gọi API quá nhiều
  const debouncedSearch = useMemo(
    () =>
      debounce((city) => {
        if (city.trim() !== "") {
          onSearch(city);
        }
      }, 500), // Debounce 500ms
    [onSearch]
  );

  // Xử lý khi người dùng gõ vào input
  const handleInputChange = () => {
    const value = inputRef.current.value;
    if (value.length > 0) {
      // Lọc các thành phố phù hợp với input
      const filteredSuggestions = cities.filter((city) =>
        city.toLowerCase().includes(value.toLowerCase())
      );
      setSuggestions(filteredSuggestions);
      setShowSuggestions(true);
      debouncedSearch(value); // Gọi hàm tìm kiếm đã được debounce
    } else {
      setSuggestions([]);
      setShowSuggestions(false);
    }
  };

  // Xử lý khi nhấn Enter hoặc click nút tìm kiếm
  const handleSearchClick = () => {
    const city = inputRef.current.value;
    if (city.trim() !== "") {
      onSearch(city);
      setShowSuggestions(false); // Ẩn gợi ý sau khi tìm kiếm
    }
  };

  // Xử lý khi chọn một gợi ý từ danh sách
  const handleSelectSuggestion = (city) => {
    inputRef.current.value = city; // Đặt giá trị input là thành phố đã chọn
    onSearch(city); // Thực hiện tìm kiếm ngay lập tức
    setShowSuggestions(false); // Ẩn gợi ý
    setSuggestions([]); // Xóa danh sách gợi ý
  };

  return (
    <div className="relative flex flex-col items-center gap-3 my-5">
      <div className="flex items-center gap-3 w-full">
        <input
          ref={inputRef}
          type="text"
          placeholder="Nhập tên thành phố"
          className="h-[50px] border-none outline-none rounded-full pl-[25px] flex-grow" style={{ color: 'var(--color-input-text)', backgroundColor: 'var(--color-input-bg)' }}
          onChange={handleInputChange}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              handleSearchClick();
            }
          }}
          onFocus={() =>
            inputRef.current.value.length > 0 && setShowSuggestions(true)
          }
          onBlur={() => setTimeout(() => setShowSuggestions(false), 100)} // Ẩn sau một khoảng thời gian ngắn để click vào gợi ý
        />
        <img
          src={search_icon}
          alt="Search Icon"
          onClick={handleSearchClick}
          className="w-[50px] p-[15px] rounded-full cursor-pointer" style={{ backgroundColor: 'var(--color-input-bg)' }}
        />
      </div>
      {showSuggestions && suggestions.length > 0 && (
        <ul className="absolute top-full mt-2 w-full rounded-lg shadow-lg z-10 max-h-60 overflow-y-auto" style={{ backgroundColor: 'var(--color-suggestion-bg)' }}>
          {suggestions.map((city) => (
            <li
              key={city}
              className="p-2 cursor-pointer" style={{ color: 'var(--color-input-text)' }}
              onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'var(--color-suggestion-hover-bg)'}
              onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'var(--color-suggestion-bg)'}
              onClick={() => handleSelectSuggestion(city)}
            >
              {city}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SearchBar;
