# Weather-Application


This is a weather application built using Node.js, Express, EJS, and various Node packages. It allows users to enter a city name and retrieve its weather information. Additionally, users can click on the "Current Location" button to get the weather at their current location. The application provides details such as temperature, humidity percentage, atmospheric pressure, wind speed, maximum temperature, minimum temperature, and the temperature forecast for the next 6 hours at a gap of 3 hours.

## Features

- Get weather information for a specific city.
- Retrieve weather information for the current location.
- View temperature, humidity percentage, atmospheric pressure, wind speed, maximum temperature, minimum temperature, and temperature forecast for the next 6 hours.

## Requirements

Make sure you have the following installed on your system:

- Node.js: [Download Node.js](https://nodejs.org)
- npm (Node Package Manager): This is typically included with Node.js installation.

## Installation

1. Clone the repository or download the source code.
   ```
   git clone <repository-url>
   ```
2. Navigate to the project directory.
   ```
   cd weather-application
   ```
3. Install the dependencies.
   ```
   npm install
   ```
4. Obtain API keys for weather data.

   - This application uses the OpenWeatherMap API to fetch weather data. Visit the [OpenWeatherMap website](https://openweathermap.org/) and sign up for a free API key.
   - Create a file named `.env` in the root directory of the project.
   - Add the following line to `.env`, replacing `YOUR_API_KEY` with your actual API key:
     ```
     API_KEY=YOUR_API_KEY
     ```

## Usage

1. Start the application.
   ```
   npm start
   ```
2. Open a web browser and visit `http://localhost:3000`.

   The homepage will display a form where you can enter a city name. Fill in the city name and submit the form to view the weather information for that city.

   Alternatively, you can click on the "Current Location" button to fetch weather data for your current location.

   The weather details for the selected city or current location will be displayed, including temperature, humidity percentage, atmospheric pressure, wind speed, maximum temperature, minimum temperature, and the temperature forecast for the next 6 hours at a gap of 3 hours.

## Dependencies

The application utilizes the following Node packages:

- express: A minimal and flexible web application framework for Node.js.
- ejs: A simple templating engine that lets you generate HTML markup with plain JavaScript.
- dotenv: Loads environment variables from a `.env` file into `process.env`.
- nodemon: A tool that helps in automatically restarting the Node.js application upon file changes (dev dependency).

## Contributing

Contributions are welcome! If you find any issues or want to enhance the application, please feel free to submit a pull request.

When contributing, please ensure you follow the existing coding style and conventions.

## License

This project is licensed under the [MIT License](LICENSE). Feel free to use and modify the code according to your needs.
