import { generateText } from "ai";
import { fetchGithubStars } from "../shared/fetch-github-stars";
import { model } from "../shared/gemini";

export default async function Page() {
  const res = await generateText({
    model: model,
    messages: [
      {
        role: "system",
        content: "You are a helpful ai that answers questions.",
      },
      {
        role: "user",
        content: "What is the capital of France?",
      },
    ],
    experimental_telemetry: { isEnabled: true },
  });
  // const stars = await fetchGithubStars();
  return <p>{res.text}</p>;
}
