import { useState } from "react";
import { getAiWeatherInsight } from "../services/api";

export default function AiInsight({ weather }) {
  const [question, setQuestion] = useState(
    "Should I bring an umbrella today?"
  );
  const [insight, setInsight] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleAskAi() {
    try {
      setLoading(true);
      setInsight("");

      const data = await getAiWeatherInsight(weather, question);
      setInsight(data.insight);
    } catch (error) {
      console.error(error);
      setInsight("AI insight is temporarily unavailable.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <section className="border border-[#241b13]/25 bg-[#f4ead7] p-4 shadow-[6px_6px_0_rgba(36,27,19,0.1)] sm:p-6 sm:shadow-[8px_8px_0_rgba(36,27,19,0.1)] lg:p-8">
      <div className="mb-6 border-b border-[#241b13]/20 pb-5 sm:mb-7 sm:pb-6">
        <p className="text-xs font-bold uppercase tracking-[0.22em] text-[#241b13]/55 sm:tracking-[0.28em]">
          ✦ AI assistant
        </p>

        <h2 className="mt-3 text-2xl font-normal tracking-[-0.04em] sm:mt-4 sm:text-3xl">
          Ask the forecast.
        </h2>

        <p className="mt-3 text-sm leading-6 text-[#241b13]/60">
          Receive a short recommendation based on today’s conditions.
        </p>
      </div>

      <textarea
        value={question}
        onChange={(e) => setQuestion(e.target.value)}
        className="min-h-28 w-full resize-none border border-[#241b13]/25 bg-[#eadcc5] p-4 text-sm leading-6 text-[#241b13] outline-none placeholder:text-[#241b13]/40 focus:border-[#241b13]/60 sm:min-h-32 sm:p-5"
        placeholder="Example: Is it safe to travel today?"
      />

      <button
        onClick={handleAskAi}
        disabled={loading}
        className="mt-4 h-11 w-full border border-[#241b13] bg-[#241b13] text-sm font-bold uppercase tracking-[0.14em] text-[#f4ead7] transition hover:bg-[#3a2a1d] active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-50 sm:h-12 sm:tracking-[0.16em]"
      >
        {loading ? "Reading..." : "Ask AI"}
      </button>

      {insight && (
        <div className="mt-5 border border-[#241b13]/20 bg-[#eadcc5] p-4 text-sm leading-7 text-[#241b13]/75 sm:mt-6 sm:p-5">
          {insight}
        </div>
      )}
    </section>
  );
}