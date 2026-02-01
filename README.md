# Quiz App 🧠

Quizzical is a clean, accessible quiz application built with **React** and **Vite**.  
It fetches trivia questions from an external API, lets users answer them, checks correctness, calculates a score, and allows replay with a fresh set of questions.

This project focuses on **clarity, correctness, and accessibility**, not just visuals.

---

## ✨ Features

- Dynamic quiz questions fetched from an external API
- Multiple-choice answers with randomized order
- Answer validation:
  - Correct answers highlighted in green
  - Incorrect selections highlighted in red
- Score calculation and result summary
- “Play again” flow that resets the quiz with new questions
- Fully keyboard-accessible interactions
- Screen-reader-friendly with live announcements
- Responsive layout (desktop & mobile)

---

## ♿ Accessibility Highlights

This app intentionally follows accessibility best practices:

- Semantic HTML: `form`, `fieldset`, `legend`, `label`
- Real radio inputs (no div-based fake buttons)
- Visible keyboard focus styles
- Non-color indicators for correct / incorrect answers
- Screen-reader announcements using `role="status"`
- Decorative visuals hidden with `aria-hidden="true"`

---

## 🛠 Tech Stack

- **React**
- **Vite**
- **html-entities** (for decoding HTML entities from API responses)
- **ESLint**

---

## 📦 Installation

Clone the repository:

```bash
git clone https://github.com/your-username/quiz-app.git
cd quiz-app

Install dependencies:
npm install

🚀 Running the App
Start the development server:
npm run dev

🏗 Build for Production
Create a production build:
npm run build

Preview the production build locally:
npm run preview

📂 Project Structure (high level)
quiz-app/
├── node_modules/
├── src/
│   ├── assets/
│   │   └── svg blobs
│   ├── App.jsx
│   ├── Quiz.jsx
│   ├── StartScreen.jsx
│   ├── main.jsx
│   └── index.css
├── .gitignore
├── index.html
├── package.json
├── package-lock.json
├── vite.config.js
└── README.md


📄 License
This project is for learning and demonstration purposes.
Feel free to fork and build on it.
