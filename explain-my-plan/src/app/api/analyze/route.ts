import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const { input } = await req.json();

    if (!input) {
      return NextResponse.json({ error: 'Input is required' }, { status: 400 });
    }

    const groqKey = process.env.GROQ_API_KEY;
    if (!groqKey) {
      return NextResponse.json({ error: 'GROQ_API_KEY is not set in environment variables. Please get a free key from console.groq.com' }, { status: 500 });
    }

    const prompt = `
You are an AI Clarity & Structuring tool. The user has a free-form idea or plan.
Your task is to convert their unstructured input into a structured format. 
Critically evaluate what is missing from their plan. Assignment scoring: 
A clarity score from 0 to 100 based on the presence of clearly defined goals, steps, timeline, and completeness.

Return a JSON object that strictly matches the following interface:

{
  "goal": "Clear defined goal extracted or inferred from input.",
  "approach": "Method or approach to achieve the goal.",
  "steps": ["Step 1", "Step 2", "Step 3"], // Empty array if no steps can be inferred
  "timeline": "Timeline if present, or state 'Not specified'",
  "missingElements": {
    "goalClarity": "Analysis of how clear the goal is (what's missing?)",
    "executionSteps": "What execution bits are missing?",
    "resourcesRequired": "What resources/tools are missing?",
    "timeline": "Is the timeline missing or vague?"
  },
  "simplifiedVersion": "A highly concise, clear restructuring of the user's input in 1-2 sentences.",
  "actionableSteps": ["Actionable Step 1", "Actionable Step 2"], 
  "clarityScore": {
    "score": 0, // IMPORTANT: YOU MUST CALCULATE THIS INT (0-100). DO NOT JUST COPY AN EXAMPLE NUMBER.
    "explanation": "Brief explanation of why this score was assigned."
  }
}

Return ONLY valid JSON. Remove markdown \`\`\`json wrappers if any.
User Input: "${input}"
`;

    // Fetch from Groq's super fast, free OpenAI-compatible endpoint
    const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${groqKey}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        model: "llama-3.3-70b-versatile", // Powerful, fast, and generous free tier
        messages: [{ role: "user", content: prompt }],
        temperature: 0.2,
        response_format: { type: "json_object" } // Forces native JSON output!
      })
    });

    if (!response.ok) {
      const err = await response.text();
      console.error("Groq API error:", err);
      return NextResponse.json({ error: 'Failed to fetch from Groq API.' }, { status: 500 });
    }

    const data = await response.json();
    let text = data.choices[0].message.content;

    // Groq is generally better at native JSON but we clean up just in case
    if (text.startsWith('\`\`\`json')) {
      text = text.substring(7);
    }
    if (text.startsWith('\`\`\`')) {
      text = text.substring(3);
    }
    if (text.endsWith('\`\`\`')) {
      text = text.substring(0, text.length - 3);
    }

    const structuredData = JSON.parse(text.trim());

    return NextResponse.json(structuredData);

  } catch (error: any) {
    console.error('Error analyzing plan:', error);
    return NextResponse.json(
      { error: 'Failed to analyze the plan. Please check backend logs.' },
      { status: 500 }
    );
  }
}
