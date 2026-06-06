import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

import SearchBar from "./components/SearchBar";
import WeatherCard from "./components/WeatherCard";
import HourlyForecast from "./components/HourlyForecast";
import DailyForecast from "./components/DailyForecast";
import AiInsight from "./components/AiInsight";

import { getWeather } from "./services/api";

export default function App() {
  const [city, setCity] = useState("Manila");
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function fetchWeather(cityName) {
    try {
      setLoading(true);
      setError("");
      setWeather(null);

      const data = await getWeather(cityName);
      setWeather(data);
    } catch (error) {
      console.error(error);
      setError(error.message || "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchWeather(city);
  }, [city]);

  return (
    <main className="min-h-screen overflow-x-hidden bg-[radial-gradient(circle_at_top,#f7ecd6_0%,#ead9bd_45%,#d6bd97_100%)] text-[#241b13]">
      <div className="relative mx-auto w-full max-w-7xl px-4 py-5 sm:px-6 sm:py-6 lg:px-10">
        <nav className="mb-10 flex flex-col gap-2 border-b border-[#241b13]/25 pb-5 sm:mb-12 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-xs font-bold uppercase tracking-[0.28em] sm:tracking-[0.35em]">
            WeatherWise AI
          </p>

          <p className="text-sm italic text-[#241b13]/60">
            Daily atmospheric report
          </p>
        </nav>

        <header className="mb-8 grid gap-6 sm:mb-10 lg:grid-cols-[1fr_420px] lg:items-end">
          <div>
            <p className="mb-4 text-xs uppercase tracking-[0.22em] text-[#241b13]/55 sm:tracking-[0.3em]">
              Forecast journal · AI weather counsel
            </p>

            <h1 className="max-w-4xl text-4xl font-normal leading-[0.95] tracking-[-0.05em] sm:text-5xl md:text-6xl lg:text-7xl">
              A calmer way to read the weather.
            </h1>

            <p className="mt-5 max-w-2xl text-base leading-7 text-[#241b13]/65 sm:mt-6 sm:text-lg sm:leading-8">
              Search a city, review the forecast, and receive practical weather
              advice written with clarity and restraint.
            </p>
          </div>

          <SearchBar onSearch={setCity} />
        </header>

        {error && (
          <div className="mb-6 border border-[#241b13]/25 bg-[#f4ead7] p-4 sm:p-5">
            <p className="font-bold">Unable to load weather</p>
            <p className="mt-1 text-sm text-[#241b13]/60">{error}</p>
          </div>
        )}

        {loading && (
          <div className="grid gap-4 sm:gap-5 lg:grid-cols-[1.1fr_0.9fr]">
            <div className="h-[280px] animate-pulse border border-[#241b13]/20 bg-[#f4ead7] sm:h-[350px]" />
            <div className="h-[280px] animate-pulse border border-[#241b13]/20 bg-[#f4ead7] sm:h-[350px]" />
            <div className="h-[200px] animate-pulse border border-[#241b13]/20 bg-[#f4ead7] lg:col-span-2" />
          </div>
        )}

        <AnimatePresence mode="wait">
          {!loading && weather && (
            <motion.div
              key={`${weather.location.name}-${weather.location.country}`}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.3 }}
              className="space-y-4 sm:space-y-5"
            >
              <section className="grid gap-4 sm:gap-5 lg:grid-cols-[1.05fr_0.95fr]">
                <WeatherCard weather={weather} />
                <AiInsight weather={weather} />
              </section>

              <HourlyForecast weather={weather} />
              <DailyForecast weather={weather} />

              <footer className="py-8 text-center text-[10px] uppercase tracking-[0.18em] text-[#241b13]/45 sm:text-xs sm:tracking-[0.25em]">
                Weather data by Open-Meteo · AI insight by Gemini
              </footer>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </main>
  );
}