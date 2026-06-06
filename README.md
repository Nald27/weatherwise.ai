# WeatherWise AI

WeatherWise AI is a vintage-style AI weather assistant that provides real-time weather forecasts and simple, practical weather advice. Users can search for any city, view current weather conditions, hourly forecasts, and a 7-day outlook, then ask AI questions about rain, heat, travel, and outdoor planning.

The app uses Open-Meteo for weather data and Gemini AI to generate clear, plain-language weather recommendations.

## Live Demo

Frontend: https://weatherwise-ai.vercel.app/
Backend: https://weatherwise-ai-30gk.onrender.com

## Features

* Search weather by city
* View current temperature, humidity, wind speed, rain, and weather condition
* Display the next 12-hour forecast
* Display a 7-day weather outlook
* Ask AI for weather advice
* AI recommendations for umbrella use, travel, heat, rain, and outdoor plans
* Vintage-inspired user interface
* Fully responsive layout for mobile, tablet, and desktop
* Secure backend API for handling Gemini AI requests

## Tech Stack

### Frontend

* React
* Vite
* Tailwind CSS
* Framer Motion

### Backend

* Node.js
* Express.js
* REST API

### APIs and Services

* Open-Meteo API
* Gemini AI
* Render
* Vercel

## Project Structure

```txt
weatherwise.ai
├── server
│   └── index.js
├── src
│   ├── components
│   │   ├── AiInsight.jsx
│   │   ├── DailyForecast.jsx
│   │   ├── HourlyForecast.jsx
│   │   ├── SearchBar.jsx
│   │   └── WeatherCard.jsx
│   ├── services
│   │   └── api.js
│   ├── utils
│   │   └── weatherCode.js
│   ├── App.jsx
│   ├── index.css
│   └── main.jsx
├── .env.example
├── package.json
└── README.md
```

## Environment Variables

Create a `.env` file in the root folder.

```env
GEMINI_API_KEY=your_gemini_api_key_here
GEMINI_MODEL=gemini-3.5-flash
VITE_BACKEND_URL=http://localhost:5000
```

For production deployment, use your deployed backend URL:

```env
VITE_BACKEND_URL=https://weatherwise-ai-30gk.onrender.com
```

Do not commit your real `.env` file to GitHub.

## Installation

Clone the repository:

```bash
git clone https://github.com/Nald27/weatherwise.ai.git
```

Go to the project folder:

```bash
cd weatherwise.ai
```

Install dependencies:

```bash
npm install
```

Run the development server:

```bash
npm run dev
```

The app will run locally with:

```txt
Frontend: http://localhost:5173
Backend: http://localhost:5000
```

## Build

To build the frontend for production:

```bash
npm run build
```

## Deployment

The project uses separate deployments:

```txt
Frontend: Vercel
Backend: Render
```

Render runs the Express backend and stores the Gemini API key securely as an environment variable.

Vercel runs the React frontend and uses `VITE_BACKEND_URL` to connect to the deployed backend.

## Purpose

This project was built to demonstrate API integration, AI integration, backend security, responsive UI design, and full-stack development using modern web technologies.
