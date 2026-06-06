import { formatHour, getWeatherSymbol } from "../utils/weatherCode";

export default function HourlyForecast({ weather }) {
  const now = new Date();

  const hourly = weather.hourly.time
    .map((time, index) => ({
      time,
      temperature: weather.hourly.temperature_2m[index],
      rainChance: weather.hourly.precipitation_probability[index],
      weatherCode: weather.hourly.weather_code[index],
    }))
    .filter((item) => new Date(item.time) >= now)
    .slice(0, 12);

  return (
    <section className="border border-[#241b13]/25 bg-[#f4ead7] p-4 shadow-[6px_6px_0_rgba(36,27,19,0.1)] sm:p-6 sm:shadow-[8px_8px_0_rgba(36,27,19,0.1)] lg:p-8">
      <div className="mb-5 border-b border-[#241b13]/20 pb-5 sm:mb-6">
        <p className="text-xs font-bold uppercase tracking-[0.22em] text-[#241b13]/55 sm:tracking-[0.28em]">
          Hourly forecast
        </p>

        <h2 className="mt-3 text-2xl font-normal tracking-[-0.04em] sm:text-3xl">
          Next 12 hours
        </h2>
      </div>

      <div className="grid grid-cols-1 gap-3 min-[380px]:grid-cols-2 sm:grid-cols-3 lg:grid-cols-6">
        {hourly.map((item, index) => (
          <div
            key={item.time}
            className="border border-[#241b13]/20 bg-[#eadcc5] p-4"
          >
            <div className="flex items-center justify-between gap-3">
              <p className="text-xs font-bold uppercase tracking-[0.16em] text-[#241b13]/45 sm:tracking-[0.18em]">
                No. {String(index + 1).padStart(2, "0")}
              </p>

              <span className="shrink-0 text-xl text-[#241b13]/70">
                {getWeatherSymbol(item.weatherCode)}
              </span>
            </div>

            <p className="mt-3 text-sm text-[#241b13]/55">
              {formatHour(item.time)}
            </p>

            <p className="mt-5 text-2xl tracking-[-0.04em]">
              {Math.round(item.temperature)}°C
            </p>

            <p className="mt-2 text-sm italic text-[#241b13]/55">
              ☂ {item.rainChance}% rain
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}