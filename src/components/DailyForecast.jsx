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
    <section className="border border-[#241b13]/25 bg-[#f4ead7] p-4 shadow-[6px_6px_0_rgba(36,27,19,0.1)] sm:p-6 sm:shadow-[8px_8px_0_rgba(36,27,19,0.1)] lg:p-8">
      <div className="mb-5 border-b border-[#241b13]/20 pb-5 sm:mb-6">
        <p className="text-xs font-bold uppercase tracking-[0.22em] text-[#241b13]/55 sm:tracking-[0.28em]">
          Weekly outlook
        </p>

        <h2 className="mt-3 text-2xl font-normal tracking-[-0.04em] sm:text-3xl">
          7-day forecast
        </h2>
      </div>

      <div className="divide-y divide-[#241b13]/15">
        {daily.map((day, index) => (
          <div
            key={day.time}
            className="grid grid-cols-[92px_1fr] gap-4 py-5 sm:grid-cols-[120px_1fr_auto] sm:items-center"
          >
            <div className="flex items-center gap-3 whitespace-nowrap">
              <span className="flex w-6 shrink-0 justify-center text-xl text-[#241b13]/70">
                {getWeatherSymbol(day.weatherCode)}
              </span>

              <p className="text-xs font-bold uppercase tracking-[0.14em] text-[#241b13]/45 sm:tracking-[0.16em]">
                Day {index + 1}
              </p>
            </div>

            <div className="min-w-0">
              <p className="text-base sm:text-lg">{formatDate(day.time)}</p>
              <p className="mt-1 text-sm italic text-[#241b13]/55">
                ☂ {day.rainChance}% chance of rain
              </p>
            </div>

            <p className="col-span-2 text-right text-sm text-[#241b13]/70 sm:col-span-1">
              {Math.round(day.maxTemp)}° / {Math.round(day.minTemp)}°
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}