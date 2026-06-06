import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { GoogleGenAI } from "@google/genai";

dotenv.config();

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

function getWeatherDescription(code) {
  const weatherCodes = {
    0: "Clear sky",
    1: "Mainly clear",
    2: "Partly cloudy",
    3: "Overcast",
    45: "Fog",
    48: "Depositing rime fog",
    51: "Light drizzle",
    53: "Moderate drizzle",
    55: "Dense drizzle",
    61: "Slight rain",
    63: "Moderate rain",
    65: "Heavy rain",
    80: "Slight rain showers",
    81: "Moderate rain showers",
    82: "Violent rain showers",
    95: "Thunderstorm",
    96: "Thunderstorm with slight hail",
    99: "Thunderstorm with heavy hail",
  };

  return weatherCodes[code] || "Unknown weather";
}

function cleanAiResponse(text) {
  return text
    .replace(/\*\*/g, "")
    .replace(/\*/g, "")
    .replace(/#{1,6}\s/g, "")
    .replace(/^[-•]\s/gm, "")
    .replace(/\n{3,}/g, "\n\n")
    .trim();
}

app.get("/api/weather", async (req, res) => {
  try {
    const city = req.query.city || "Manila";

    const geoUrl = `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(
      city
    )}&count=1&language=en&format=json`;

    const geoResponse = await fetch(geoUrl);
    const geoData = await geoResponse.json();

    if (!geoData.results || geoData.results.length === 0) {
      return res.status(404).json({ error: "City not found" });
    }

    const location = geoData.results[0];

    const weatherParams = new URLSearchParams({
      latitude: location.latitude,
      longitude: location.longitude,
      timezone: "auto",
      forecast_days: "7",
      current:
        "temperature_2m,relative_humidity_2m,apparent_temperature,is_day,precipitation,rain,showers,weather_code,cloud_cover,wind_speed_10m,wind_direction_10m",
      hourly:
        "temperature_2m,precipitation_probability,precipitation,rain,weather_code,wind_speed_10m",
      daily:
        "weather_code,temperature_2m_max,temperature_2m_min,precipitation_probability_max,precipitation_sum",
    });

    const weatherUrl = `https://api.open-meteo.com/v1/forecast?${weatherParams.toString()}`;

    const weatherResponse = await fetch(weatherUrl);
    const weatherData = await weatherResponse.json();

    const normalizedData = {
      location: {
        name: location.name,
        country: location.country,
        admin1: location.admin1,
        latitude: location.latitude,
        longitude: location.longitude,
        timezone: location.timezone,
      },
      current: {
        ...weatherData.current,
        description: getWeatherDescription(weatherData.current.weather_code),
      },
      hourly: weatherData.hourly,
      daily: weatherData.daily,
      units: {
        current: weatherData.current_units,
        hourly: weatherData.hourly_units,
        daily: weatherData.daily_units,
      },
    };

    res.json(normalizedData);
  } catch (error) {
    console.error("Weather API error:", error);
    res.status(500).json({ error: "Failed to fetch weather data" });
  }
});

app.post("/api/ai-weather", async (req, res) => {
  try {
    const { weather, question } = req.body;

    if (!weather) {
      return res.status(400).json({ error: "Weather data is required" });
    }

    const userQuestion =
      question || "Give me simple weather advice for today.";

    const prompt = `
You are an AI weather assistant.

Rules:
Use plain text only.
Do not use Markdown.
Do not use asterisks.
Do not use bold text.
Do not use bullet points.
Do not use symbols like *, -, or # for formatting.
Write in simple and natural sentences.
Only use the weather data provided.
Do not invent weather information.
Keep the answer short, useful, and beginner-friendly.

Answer the user's question clearly.

User question:
${userQuestion}

Weather data:
${JSON.stringify(weather, null, 2)}
`;

    const response = await ai.models.generateContent({
      model: process.env.GEMINI_MODEL || "gemini-3.5-flash",
      contents: prompt,
    });

    const cleanInsight = cleanAiResponse(response.text || "");

    res.json({
      insight: cleanInsight,
    });
  } catch (error) {
    console.error("Gemini AI weather error:", error);
    res.status(500).json({ error: "Failed to generate AI weather insight" });
  }
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});