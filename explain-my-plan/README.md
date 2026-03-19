# Explain My Plan - AI Clarity & Structuring Tool

This is a Next.js application designed to take unorganized, vague human input regarding an idea or plan and convert it into a crisp, structured format using generative AI.

## Project Overview
Individuals often have ideas or plans that are vague and unstructured. This app uses AI to:
- Convert rough ideas into structured components (Goal, Approach, Steps, Timeline).
- Identify missing elements (goal clarity, execution steps, required resources).
- Provide a simplified summary and actionable next steps.
- Generate a Clarity Score with a short report.

## Technologies Used
- **Next.js (App Router)** & **React 19**
- **Vanilla CSS** (Vibrant dark mode + glassmorphism UI)
- **Lucide React** (Icons)
- **Groq API** (Llama-3.3-70b-versatile model)

## Setup Instructions
1. Clone the repository: ` git clone https://github.com/jhansinip/KALNET-INTERN-ASSIGNMENT-Explain-my-plan-.git`
2. Install dependencies: `npm install`
3. Create a `.env.local` file in the root directory.
4. Add your Groq API key (get one for free at console.groq.com/keys):
   ```env
   GROQ_API_KEY=your_api_key_here
   ```
5. Run the server: `npm run dev`
6. Open browser at `http://localhost:3000`

## Prompt Design Explanation
The system prompt in `/api/analyze/route.ts` is strongly structured. I passed an explicit JSON interface that the LLM must adhere to. This includes detailed keys like `goal`, `approach`, `missingElements`, and `actionableSteps`. Instead of letting the model guess the format, the prompt strictly dictates the response shape and provides sub-categories for the missing elements analysis. This forces the LLM to think in terms of those gaps. 

## Clarity Score Logic
The logic for the Clarity Score is handled dynamically by the LLM based on specific criteria defined in the prompt:
- Defined goal
- Detailed steps
- Specified timeline
- Completeness
Since natural language text can vary infinitely, using the LLM’s reasoning to parse completeness yields an accurate, qualitative evaluation, simplifying the score generation. It outputs an int out of 100 alongside an explanation of the score, ensuring the score algorithm remains fully transparent.

---
**Short Note**
* **Challenges faced:** Designing a spectacular, premium glassmorphism interface with Vanilla CSS (without relying on Tailwind) required thoughtful color tokenization. Managing the JSON response structure from the AI model was also tricky, requiring robust parsing of backticks and potential markdown blocks to retrieve pristine JSON. Switching from heavy restricted models to the lightning-fast Groq Llama 3 model enabled a significantly smoother execution.
* **How I approached AI Prompting:** I strictly constrained the model by feeding it a JSON template and setting its persona to an "AI Clarity & Structuring tool". Instead of multiple follow-up prompts, I packed the structuring instructions, the missing elements detection, and the clarity scoring into a single unified JSON generation prompt, saving execution time and increasing reliability.
