import { getWeatherSymbol } from "../utils/weatherCode";

export default function WeatherCard({ weather }) {
  const current = weather.current;
  const location = weather.location;

  return (
    <section className="border border-[#241b13]/25 bg-[#f4ead7] p-6 shadow-[8px_8px_0_rgba(36,27,19,0.1)] sm:p-8">
      <div className="flex min-h-[340px] flex-col justify-between">
        <div className="flex items-start justify-between gap-6 border-b border-[#241b13]/20 pb-6">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.28em] text-[#241b13]/55">
              Current conditions
            </p>

            <h2 className="mt-4 text-3xl font-normal tracking-[-0.03em]">
              {location.name}, {location.country}
            </h2>

            {location.admin1 && (
              <p className="mt-1 text-sm italic text-[#241b13]/55">
                {location.admin1}
              </p>
            )}
          </div>

          <div className="flex items-center gap-3 border border-[#241b13]/25 bg-[#eadcc5] px-4 py-2 text-sm italic text-[#241b13]/75">
            <span className="text-xl">{getWeatherSymbol(current.weather_code)}</span>
            <span>{current.description}</span>
          </div>
        </div>

        <div className="mt-12">
          <div className="mb-2 flex items-center gap-2 text-sm italic text-[#241b13]/55">
            <span>Thermometer</span>
            <span>·</span>
            <span>Actual temperature</span>
          </div>

          <div className="flex items-start gap-2">
            <h1 className="text-8xl font-normal leading-none tracking-[-0.08em] sm:text-9xl">
              {Math.round(current.temperature_2m)}
            </h1>
            <span className="mt-4 text-3xl text-[#241b13]/50">°C</span>
          </div>

          <p className="mt-4 text-sm italic text-[#241b13]/60">
            Feels like {Math.round(current.apparent_temperature)}°C
          </p>
        </div>

        <div className="mt-10 grid gap-3 sm:grid-cols-3">
          <Metric icon="◌" label="Humidity" value={`${current.relative_humidity_2m}%`} />
          <Metric icon="≈" label="Wind" value={`${current.wind_speed_10m} km/h`} />
          <Metric icon="☂" label="Rain" value={`${current.rain} mm`} />
        </div>
      </div>
    </section>
  );
}

function Metric({ icon, label, value }) {
  return (
    <div className="border border-[#241b13]/20 bg-[#eadcc5] p-4">
      <div className="flex items-center gap-2">
        <span className="text-lg text-[#241b13]/65">{icon}</span>
        <p className="text-xs font-bold uppercase tracking-[0.22em] text-[#241b13]/45">
          {label}
        </p>
      </div>

      <p className="mt-3 text-xl">{value}</p>
    </div>
  );
}