export const generateAITasks = async (): Promise<string[]> => {
  const res = await fetch("https://api.groq.com/openai/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${import.meta.env.VITE_GROQ_API_KEY}`,
    },
    body: JSON.stringify({
      model: "llama-3.1-8b-instant",
      messages: [
        {
          role: "system",
          content: "Return ONLY a JSON array of 5 short task strings.",
        },
        {
          role: "user",
          content: "Generate 5 medical service tasks.",
        },
      ],
      temperature: 0.7,
    }),
  });

  if (!res.ok) {
    throw new Error("Groq request failed");
  }

  const data = await res.json();

  const text =
    data.choices?.[0]?.message?.content || "[]";

  // safe parse
  try {
    const parsed = JSON.parse(text);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
};