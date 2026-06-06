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
    <section className="border border-[#241b13]/25 bg-[#f4ead7] p-6 shadow-[8px_8px_0_rgba(36,27,19,0.1)] sm:p-8">
      <div className="mb-7 border-b border-[#241b13]/20 pb-6">
        <p className="text-xs font-bold uppercase tracking-[0.28em] text-[#241b13]/55">
          ✦ AI assistant
        </p>

        <h2 className="mt-4 text-3xl font-normal tracking-[-0.04em]">
          Ask the forecast.
        </h2>

        <p className="mt-3 text-sm leading-6 text-[#241b13]/60">
          Receive a short recommendation based on today’s conditions.
        </p>
      </div>

      <textarea
        value={question}
        onChange={(e) => setQuestion(e.target.value)}
        className="min-h-32 w-full resize-none border border-[#241b13]/25 bg-[#eadcc5] p-5 text-sm leading-6 text-[#241b13] outline-none placeholder:text-[#241b13]/40 focus:border-[#241b13]/60"
        placeholder="Example: Is it safe to travel today?"
      />

      <button
        onClick={handleAskAi}
        disabled={loading}
        className="mt-4 h-12 w-full border border-[#241b13] bg-[#241b13] text-sm font-bold uppercase tracking-[0.16em] text-[#f4ead7] transition hover:bg-[#3a2a1d] active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-50"
      >
        {loading ? "Reading..." : "Ask AI"}
      </button>

      {insight && (
        <div className="mt-6 border border-[#241b13]/20 bg-[#eadcc5] p-5 text-sm leading-7 text-[#241b13]/75">
          {insight}
        </div>
      )}
    </section>
  );
}