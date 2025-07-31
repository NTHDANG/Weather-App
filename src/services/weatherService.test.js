// src/services/weatherService.test.js

import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { fetchWeatherData, fetchForecastData } from './weatherService';

// Mock fetch API
const mockFetch = vi.fn();

describe('weatherService', () => {
  beforeEach(() => {
    window.fetch = mockFetch; // Sử dụng window.fetch thay vì global.fetch
    vi.useFakeTimers(); // Sử dụng fake timers để kiểm soát Date.now() cho caching
  });

  afterEach(() => {
    mockFetch.mockClear();
    vi.useRealTimers(); // Trả lại real timers
    // Xóa cache sau mỗi test để đảm bảo độc lập
    vi.resetModules(); // Reset modules để xóa cache của weatherService
  });

  describe('fetchWeatherData', () => {
    it('should throw an error if city is empty', async () => {
      await expect(fetchWeatherData('', 'test-key')).rejects.toThrow('Enter City Name');
      expect(mockFetch).not.toHaveBeenCalled();
    });

    it('should fetch weather data successfully', async () => {
      const mockData = { main: { humidity: 70, temp: 25, pressure: 1012 }, wind: { speed: 5 }, name: 'Test City', weather: [{ icon: '01d' }], visibility: 10000, cod: 200 };
      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: () => Promise.resolve(mockData),
      });

      const data = await fetchWeatherData('Test City', 'test-key');
      expect(data).toEqual(mockData);
      expect(mockFetch).toHaveBeenCalledTimes(1);
      expect(mockFetch).toHaveBeenCalledWith(
        `https://api.openweathermap.org/data/2.5/weather?q=Test City&units=metric&appid=test-key`
      );
    });

    it('should throw an error if API response is not ok', async () => {
      mockFetch.mockResolvedValueOnce({
        ok: false,
        statusText: 'Not Found',
        json: () => Promise.resolve({ message: 'city not found' }),
      });

      await expect(fetchWeatherData('Invalid City', 'test-key')).rejects.toThrow('city not found');
      expect(mockFetch).toHaveBeenCalledTimes(1);
    });

    it('should throw an error if city is not found (cod 404)', async () => {
      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: () => Promise.resolve({ cod: '404', message: 'city not found' }),
      });

      await expect(fetchWeatherData('NonExistent City', 'test-key')).rejects.toThrow('City not found!');
      expect(mockFetch).toHaveBeenCalledTimes(1);
    });

    it('should return cached data if available and not expired', async () => {
      const mockData = { main: { humidity: 70, temp: 25, pressure: 1012 }, wind: { speed: 5 }, name: 'Cached City', weather: [{ icon: '01d' }], visibility: 10000, cod: 200 };
      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: () => Promise.resolve(mockData),
      });

      // First call, data is fetched and cached
      await fetchWeatherData('Cached City', 'test-key');
      expect(mockFetch).toHaveBeenCalledTimes(1);

      // Advance timers by less than CACHE_DURATION
      vi.advanceTimersByTime(1 * 60 * 1000); // 1 minute

      // Second call, data should be from cache
      const data = await fetchWeatherData('Cached City', 'test-key');
      expect(data).toEqual(mockData);
      expect(mockFetch).toHaveBeenCalledTimes(1); // Still 1 call, as it used cache
    });

    it('should fetch new data if cached data is expired', async () => {
      const mockData1 = { main: { humidity: 70, temp: 25, pressure: 1012 }, wind: { speed: 5 }, name: 'Expired City', weather: [{ icon: '01d' }], visibility: 10000, cod: 200 };
      const mockData2 = { main: { humidity: 75, temp: 28, pressure: 1010 }, wind: { speed: 6 }, name: 'Expired City', weather: [{ icon: '01d' }], visibility: 10000, cod: 200 };

      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: () => Promise.resolve(mockData1),
      });

      // First call, data is fetched and cached
      await fetchWeatherData('Expired City', 'test-key');
      expect(mockFetch).toHaveBeenCalledTimes(1);

      // Advance timers by more than CACHE_DURATION
      vi.advanceTimersByTime(6 * 60 * 1000); // 6 minutes

      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: () => Promise.resolve(mockData2),
      });

      // Second call, data should be fetched again
      const data = await fetchWeatherData('Expired City', 'test-key');
      expect(data).toEqual(mockData2);
      expect(mockFetch).toHaveBeenCalledTimes(2); // Now 2 calls, as cache expired
    });
  });

  describe('fetchForecastData', () => {
    it('should throw an error if city is empty', async () => {
      await expect(fetchForecastData('', 'test-key')).rejects.toThrow('Enter City Name');
      expect(mockFetch).not.toHaveBeenCalled();
    });

    it('should fetch forecast data successfully', async () => {
      const mockData = { list: [{ dt: 123, main: { temp: 20 }, weather: [{ icon: '02d', description: 'clouds' }] }], cod: 200 };
      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: () => Promise.resolve(mockData),
      });

      const data = await fetchForecastData('Test City', 'test-key');
      expect(data).toEqual(mockData);
      expect(mockFetch).toHaveBeenCalledTimes(1);
      expect(mockFetch).toHaveBeenCalledWith(
        `https://api.openweathermap.org/data/2.5/forecast?q=Test City&units=metric&appid=test-key`
      );
    });

    it('should throw an error if API response is not ok', async () => {
      mockFetch.mockResolvedValueOnce({
        ok: false,
        statusText: 'Not Found',
        json: () => Promise.resolve({ message: 'city not found' }),
      });

      await expect(fetchForecastData('Invalid City', 'test-key')).rejects.toThrow('city not found');
      expect(mockFetch).toHaveBeenCalledTimes(1);
    });

    it('should throw an error if city is not found (cod 404)', async () => {
      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: () => Promise.resolve({ cod: '404', message: 'city not found' }),
      });

      await expect(fetchForecastData('NonExistent City', 'test-key')).rejects.toThrow('City not found!');
      expect(mockFetch).toHaveBeenCalledTimes(1);
    });

    it('should return cached data if available and not expired', async () => {
      const mockData = { list: [{ dt: 123, main: { temp: 20 }, weather: [{ icon: '02d', description: 'clouds' }] }], cod: 200 };
      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: () => Promise.resolve(mockData),
      });

      // First call, data is fetched and cached
      await fetchForecastData('Cached City', 'test-key');
      expect(mockFetch).toHaveBeenCalledTimes(1);

      // Advance timers by less than CACHE_DURATION
      vi.advanceTimersByTime(1 * 60 * 1000); // 1 minute

      // Second call, data should be from cache
      const data = await fetchForecastData('Cached City', 'test-key');
      expect(data).toEqual(mockData);
      expect(mockFetch).toHaveBeenCalledTimes(1); // Still 1 call, as it used cache
    });

    it('should fetch new data if cached data is expired', async () => {
      const mockData1 = { list: [{ dt: 123, main: { temp: 20 }, weather: [{ icon: '02d', description: 'clouds' }] }], cod: 200 };
      const mockData2 = { list: [{ dt: 456, main: { temp: 22 }, weather: [{ icon: '01d', description: 'clear' }] }], cod: 200 };

      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: () => Promise.resolve(mockData1),
      });

      // First call, data is fetched and cached
      await fetchForecastData('Expired City', 'test-key');
      expect(mockFetch).toHaveBeenCalledTimes(1);

      // Advance timers by more than CACHE_DURATION
      vi.advanceTimersByTime(6 * 60 * 1000); // 6 minutes

      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: () => Promise.resolve(mockData2),
      });

      // Second call, data should be fetched again
      const data = await fetchForecastData('Expired City', 'test-key');
      expect(data).toEqual(mockData2);
      expect(mockFetch).toHaveBeenCalledTimes(2); // Now 2 calls, as cache expired
    });
  });
});
