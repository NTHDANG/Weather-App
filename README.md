# Weather App

A simple weather application displaying current weather information and forecasts.

## Features

- Current weather display
- Weather forecast
- Location search

## Technologies Used

- React
- Vite
- Tailwind CSS
- Weather API (e.g., OpenWeatherMap)

## Setup and Running the Project

To run this project locally, follow these steps:

1.  **Clone the repository** (if you are using Git):
    ```bash
    git clone <your_repository_address>
    cd weather
    ```
2.  **Install dependencies** (using pnpm):
    ```bash
    pnpm install
    ```
3.  **Configure API Key**:
    Create a `.env` file in the project root and add your API key:

    ```
    VITE_WEATHER_API_KEY=your_api_key_here
    ```

    (Replace `your_api_key_here` with your actual API key from the weather service provider).

4.  **Start the application**:
    ```bash
    pnpm run dev
    ```
    The application will run on `http://localhost:5173` (or another port).
