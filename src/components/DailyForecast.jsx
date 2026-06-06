import { formatDate, getWeatherSymbol } from "../utils/weatherCode";

export default function DailyForecast({ weather }) {
  const daily = weather.daily.time.map((time, index) => ({
    time,
    weatherCode: weather.daily.weather_code[index],
    maxTemp: weather.daily.temperature_2m_max[index],
    minTemp: weather.daily.temperature_2m_min[index],
    rainChance: weather.daily.precipitation_probability_max[index],
  }));

  return (
    <section className="border border-[#241b13]/25 bg-[#f4ead7] p-6 shadow-[8px_8px_0_rgba(36,27,19,0.1)] sm:p-8">
      <div className="mb-6 border-b border-[#241b13]/20 pb-5">
        <p className="text-xs font-bold uppercase tracking-[0.28em] text-[#241b13]/55">
          Weekly outlook
        </p>

        <h2 className="mt-3 text-3xl font-normal tracking-[-0.04em]">
          7-day forecast
        </h2>
      </div>

      <div className="divide-y divide-[#241b13]/15">
        {daily.map((day, index) => (
          <div
            key={day.time}
            className="grid grid-cols-[120px_1fr_auto] items-center gap-4 py-5"
          >
            <div className="flex items-center gap-3 whitespace-nowrap">
              <span className="flex w-6 justify-center text-xl text-[#241b13]/70">
                {getWeatherSymbol(day.weatherCode)}
              </span>

              <p className="text-xs font-bold uppercase tracking-[0.16em] text-[#241b13]/45">
                Day {index + 1}
              </p>
            </div>

            <div>
              <p className="text-lg">{formatDate(day.time)}</p>
              <p className="mt-1 text-sm italic text-[#241b13]/55">
                ☂ {day.rainChance}% chance of rain
              </p>
            </div>

            <p className="text-right text-sm text-[#241b13]/70">
              {Math.round(day.maxTemp)}° / {Math.round(day.minTemp)}°
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}