# 🚀 Explain My Plan — AI Clarity & Structuring Tool

Welcome! **Explain My Plan** is a full-stack web application designed to help individuals transform their vague, unstructured ideas into clear, actionable, and professionally structured roadmap.

---

## 🌟 Project Overview
Unorganized human input can often be a barrier to execution. This tool uses state-of-the-art AI to:
*   **Structure:** Convert free-form plans into **Goal**, **Method**, **Steps**, and **Timeline**.
*   **Gap Analysis:** Detect missing elements like resource requirements or timeline clarity.
*   **Refine:** Generate a simplified, "elevator pitch" version of the plan.
*   **Score:** Provide a transparency-focused **Clarity Score (0-100)**.
*   **Activate:** Deliver a list of immediate, practical next steps.

### 🛠️ Tech Stack
*   **Frontend:** Next.js 16 (React 19) with a custom **Vanilla CSS** design system.
*   **Backend:** Next.js **API Routes** (Node.js) to securely handle AI requests and response structuring.
*   **UI/UX:** High-performance Glassmorphism design with responsive animations.
*   **AI Engine:** Powered by **Groq (Llama-3.3-70b-versatile)** for sub-2s response times.
*   **Icons:** Lucide-React.

---

## ⚙️ Setup Instructions
1.  **Clone:** `git clone https://github.com/jhansinip/KALNET-INTERN-ASSIGNMENT-Explain-my-plan-.git`
2.  **Install:** `npm install`
3.  **Environment:** Create a `.env.local` file in the root directory.
4.  **API Key:** Add your free Groq API key:
    ```env
    GROQ_API_KEY=your_key_here
    ```
5.  **Run:** `npm run dev`
6.  **View:** Open `http://localhost:3000`

---

## 📝 Prompt Design Explanation
The core of this application is a **strictly structured system prompt**. Instead of open-ended generation, I used a **JSON-Mode constraint**:
*   **Role Definition:** The LLM is assigned the persona of an "AI Clarity & Structuring tool".
*   **Template Enforced:** I passed a specific JSON schema that the AI *must* adhere to. This includes fields for `goal`, `approach`, `missingElements`, and `actionableSteps`.
*   **Zero Ambiguity:** By enforcing sub-categories within the "Missing Elements" section, the AI is forced to perform a multi-dimensional analysis rather than a generic summary.

---

## 🎯 Clarity Score Logic
The Clarity Score is a qualitative-to-quantitative metric assigned based on four pillared criteria:
1.  **Goal Defined:** Is the objective specific and measurable?
2.  **Structural Steps:** Are there logically sequenced actions?
3.  **Timeline Presence:** Is there a start/end date or duration mentioned?
4.  **Completeness:** Are resources and methods clearly articulated?

The score is calculated by the AI using these weights, and the application requires the AI to provide a **written explanation** for the score, ensuring the process is transparent and helpful for the user to improve their plan.

---

## 💭 Short Note
*   **Challenges Faced:** Designing a premium interface entirely with **Vanilla CSS** required precise control over backdrop-filters and alpha-blending for the glassmorphism effect. Additionally, handling AI quota limits led to a strategic pivot from Gemini to **Groq**, which resulted in a massive performance boost (reducing response time from 15s to under 2s).
*   **AI Prompting Approach:** My approach was **one-shot structured output**. By combining the structuring, analysis, and scoring into a single complex JSON response, I reduced token latency and ensured that every visual element in the UI has data to populate it without multiple API calls.
