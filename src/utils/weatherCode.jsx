export function getWeatherSymbol(code) {
  if (code === 0) return "☀";
  if ([1, 2].includes(code)) return "◐";
  if (code === 3) return "☁";
  if ([45, 48].includes(code)) return "≋";
  if ([51, 53, 55].includes(code)) return "☂";
  if ([61, 63, 65].includes(code)) return "☔";
  if ([80, 81, 82].includes(code)) return "☔";
  if ([95, 96, 99].includes(code)) return "⚡";
  return "○";
}

export function formatDate(dateString) {
  return new Date(dateString).toLocaleDateString("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
  });
}

export function formatHour(dateString) {
  return new Date(dateString).toLocaleTimeString("en-US", {
    hour: "numeric",
    hour12: true,
  });
}