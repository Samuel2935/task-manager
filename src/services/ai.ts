const API_URL = "https://api.groq.com/openai/v1/chat/completions";

const SYSTEM_PROMPT = `
You are a strict JSON generator.

Return ONLY a JSON array of exactly 5 short task strings.
No explanation. No markdown.
Example:
["task 1", "task 2"]
`;

const callAI = async (prompt: string): Promise<string> => {
  const res = await fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${import.meta.env.VITE_GROQ_API_KEY}`,
    },
    body: JSON.stringify({
      model: "llama-3.1-8b-instant",
      temperature: 0.7,
      messages: [
        { role: "system", content: SYSTEM_PROMPT },
        { role: "user", content: prompt },
      ],
    }),
  });

  if (!res.ok) throw new Error(await res.text());

  const data = await res.json();
  return data.choices?.[0]?.message?.content || "[]";
};

const extractJSON = (text: string) => {
  const match = text.match(/\[.*\]/s);
  return match ? match[0] : "[]";
};

const safeParse = (text: string): string[] => {
  try {
    const parsed = JSON.parse(text);
    return Array.isArray(parsed)
      ? parsed.filter((t) => typeof t === "string")
      : [];
  } catch {
    return [];
  }
};

export const generateAITasks = async (prompt: string) => {
  const raw = await callAI(prompt);
  const json = extractJSON(raw);
  return safeParse(json).slice(0, 10);
};