export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const provider = req.body.provider === 'mistral' ? 'mistral' : 'groq';
  const userText = req.body.contents[0].parts[0].text;

  try {
    let r;
    if (provider === 'mistral') {
      const KEY = process.env.MISTRAL_KEY;
      if (!KEY) return res.status(500).json({ error: 'Missing MISTRAL_KEY' });
      r = await fetch('https://api.mistral.ai/v1/chat/completions', {
        method: 'POST',
        headers: { 'Authorization': `Bearer ${KEY}`, 'Content-Type': 'application/json' },
        body: JSON.stringify({
          model: "mistral-small-latest",
          messages: [{ role: "user", content: userText }],
          temperature: 0.2, response_format: { type: "json_object" }
        })
      });
    } else {
      const KEY = process.env.GROQ_KEY;
      if (!KEY) return res.status(500).json({ error: 'Missing GROQ_KEY' });
      r = await fetch('https://api.groq.com/openai/v1/chat/completions', {
        method: 'POST',
        headers: { 'Authorization': `Bearer ${KEY}`, 'Content-Type': 'application/json' },
        body: JSON.stringify({
          model: "llama-3.3-70b-versatile",
          messages: [{ role: "user", content: userText }],
          temperature: 0.4, max_tokens: 2048, response_format: { type: "json_object" }
        })
      });
    }

    const data = await r.json();
    if (data.error) throw new Error(data.error.message || JSON.stringify(data.error));
    const aiText = data.choices[0].message.content;
    res.status(200).json({ candidates: [{ content: { parts: [{ text: aiText }] } }] });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}
