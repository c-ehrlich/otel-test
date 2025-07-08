import { generateText } from "ai";
import { fetchGithubStars } from "@/shared/fetch-github-stars";
import { geminiFlash } from "@/shared/gemini";
import { withSpan } from "@watchlyhq/ai";

export default async function Page() {
  const res = await withSpan(
    { workflow: "help_user", task: "get_capital" },
    (_span) => {
      return generateText({
        model: geminiFlash,
        messages: [
          {
            role: "system",
            content: "You are a helpful ai that answers questions.",
          },
          {
            role: "user",
            content: "What is the capital of Spain?",
          },
        ],
      });
    }
  );

  return <p>{res.text}</p>;
}
