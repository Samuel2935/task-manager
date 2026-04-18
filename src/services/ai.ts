export const generateAITasks = async (): Promise<string[]> => {
  const res = await fetch("https://api.openai.com/v1/responses", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${import.meta.env.VITE_OPENAI_API_KEY}`,
    },
    body: JSON.stringify({
      model: "gpt-4.1-mini",
      input:
        "Return ONLY a JSON array of 5 short software development task strings.",
    }),
  });

  if (!res.ok) {
    throw new Error("AI request failed");
  }

  const data = await res.json();

  // 🧠 Extract raw text
  const text = data.output?.[0]?.content?.[0]?.text || "[]";

  // 🧠 Parse JSON safely
  try {
    const parsed = JSON.parse(text);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
};