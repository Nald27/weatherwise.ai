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
    <section className="border border-[#241b13]/25 bg-[#f4ead7] p-6 shadow-[8px_8px_0_rgba(36,27,19,0.1)] sm:p-8">
      <div className="mb-6 border-b border-[#241b13]/20 pb-5">
        <p className="text-xs font-bold uppercase tracking-[0.28em] text-[#241b13]/55">
          Hourly forecast
        </p>

        <h2 className="mt-3 text-3xl font-normal tracking-[-0.04em]">
          Next 12 hours
        </h2>
      </div>

      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
        {hourly.map((item, index) => (
          <div
            key={item.time}
            className="border border-[#241b13]/20 bg-[#eadcc5] p-4"
          >
            <div className="flex items-center justify-between">
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#241b13]/45">
                No. {String(index + 1).padStart(2, "0")}
              </p>

              <span className="text-xl text-[#241b13]/70">
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