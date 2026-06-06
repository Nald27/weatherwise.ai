const API_BASE_URL =
  import.meta.env.VITE_BACKEND_URL || "http://localhost:5000";

export async function getWeather(city) {
  const response = await fetch(
    `${API_BASE_URL}/api/weather?city=${encodeURIComponent(city)}`
  );

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.error || "Failed to fetch weather");
  }

  return data;
}

export async function getAiWeatherInsight(weather, question) {
  const response = await fetch(`${API_BASE_URL}/api/ai-weather`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      weather,
      question,
    }),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.error || "Failed to generate AI insight");
  }

  return data;
}