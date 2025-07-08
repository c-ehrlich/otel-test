import { generateText } from "ai";
import { geminiFlash } from "@/shared/gemini";
import { withSpan } from "@watchlyhq/ai";

export default async function Page() {
  const userId = 123;
  const res = await withSpan(
    { workflow: "help_user", task: "get_capital" },
    (span) => {
      // you have access to the span in this callback
      span.setAttribute('user_id', userId);

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
