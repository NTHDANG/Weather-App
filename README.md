# Weather Application

## Project Overview

This is a modern, responsive web application designed to provide real-time weather conditions and forecasts for various cities worldwide. Built with a robust and scalable frontend stack, this project showcases a clean architecture, efficient state management, and a highly intuitive user interface. It leverages contemporary web development practices to deliver a fast, reliable, and visually appealing weather experience.

The application emphasizes a component-based structure, ensuring maintainability and reusability, and integrates seamlessly with external weather APIs to fetch accurate and up-to-date meteorological data. Its modern design, powered by Tailwind CSS, offers a delightful user experience across different devices and screen sizes.

## Key Features

- **Real-time Current Weather Display:** Instantly view current temperature, humidity, wind speed, and other vital weather parameters for any searched city.
- **Dynamic Weather Forecasts:** Get detailed weather predictions for upcoming days, helping users plan their activities effectively.
- **Intuitive City Search:** A responsive search bar allows users to quickly find weather information for their desired locations.
- **Theme Toggling:** Seamlessly switch between light and dark modes to suit user preferences and enhance readability in various lighting conditions.
- **API Integration:** Efficiently fetches weather data from a third-party weather API, ensuring data accuracy and freshness.
- **Responsive Design:** Optimized for a consistent and engaging user experience across desktops, tablets, and mobile devices.
- **Modern Development Workflow:** Utilizes Vite for lightning-fast development and build times, and ESLint for maintaining high code quality and consistency.

## Technologies Used

This project is built using the following cutting-edge technologies:

- **React.js:** A declarative, component-based JavaScript library for building user interfaces.
- **Vite:** A next-generation frontend tooling that provides an extremely fast development experience.
- **Tailwind CSS:** A utility-first CSS framework for rapidly building custom designs.
- **JavaScript (ES6+):** The core programming language for the application's logic.
- **ESLint:** A pluggable linting utility for JavaScript and JSX, ensuring code quality and adherence to best practices.
- **pnpm:** A fast, disk space efficient package manager.

## Installation and Setup

Follow these steps to get the project up and running on your local machine.

### Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js:** (LTS version recommended)
- **pnpm:** You can install pnpm globally using npm:
  ```bash
  npm install -g pnpm
  ```

### Getting Started

1.  **Clone the repository:**

    ```bash
    git clone <repository-url>
    cd weather
    ```

    (Replace `<repository-url>` with the actual URL of your Git repository.)

2.  **Install dependencies:**
    Navigate to the project root directory and install all necessary dependencies:

    ```bash
    pnpm install
    ```

3.  **Environment Variables Configuration:**
    This application requires an API key to fetch weather data.
    - Create a `.env` file in the root of the project.
    - Obtain a weather API key (e.g., from OpenWeatherMap, WeatherAPI.com, etc.).
    - Add your API key to the `.env` file in the following format:
      ```
      VITE_WEATHER_API_KEY=YOUR_API_KEY_HERE
      ```
      (Make sure to replace `YOUR_API_KEY_HERE` with your actual API key.)

### Running the Application

- **Development Mode:**
  To run the application in development mode with hot-reloading:

  ```bash
  pnpm dev
  ```

  The application will typically be accessible at `http://localhost:5173` (or another port if 5173 is in use).

- **Production Build:**
  To create a production-ready build of the application:
  ```bash
  pnpm build
  ```
  This will generate optimized static assets in the `dist/` directory.
