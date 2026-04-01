# SignSync: AI-Enhanced HCI Solution for Public Service Kiosks

![Project Status](https://img.shields.io/badge/Status-Active_Development-emerald)
![Tech Stack](https://img.shields.io/badge/Stack-React_%7C_FastAPI_%7C_MediaPipe-blue)

## Project Meaning & Scope

Modern public service kiosks often present a severe "Communication Asymmetry" for Deaf and hard-of-hearing individuals, as these interfaces rely almost exclusively on text-heavy navigation and audio cues.

**SignSync** addresses this barrier by transforming a standard kiosk webcam into an intelligent input device. Using real-time computer vision and Natural Language Processing (NLP), the system provides an autonomous, gesture-based interface that mirrors the natural flow of sign language.

The core focus is strictly on **Human-Computer Interaction (HCI)**. By utilizing visual "Feedforward" mechanics and Latency Buffering (Dwell Time), SignSync ensures the AI acts as a seamless, hidden participant, granting users the same level of autonomy and dignity as hearing individuals in government or healthcare settings.

## Key Features

- **"Camera-as-Input" Workflow:** Bypasses traditional touch-and-type interfaces in favor of real-time spatial tracking.
- **Skeletal Visual Feedback:** Renders a real-time mesh over the user's hands to reduce anxiety and provide immediate confirmation that the system is "listening."
- **Latency Buffering (Dwell Time):** Uses Framer Motion progress bars to require a 1.5-second "Hold Gesture" before locking in a word, preventing resting movements from causing accidental translations.
- **AI Sentence Refinement:** Passes fragmented, heuristic-based raw words to a Python backend where the Gemini model reconstructs them into polite, grammatically correct sentences.
- **Text-to-Speech (TTS):** Automatically reads the refined sentence aloud via the Web Speech API for seamless interaction with human tellers or audio-based kiosk systems.
- **Dark Mode:** Toggle between light and dark themes via the Moon/Sun icon on every screen.

## Team & Responsibilities

Developed by BSIT students at the University of San Agustin.

- **Adrian Justin J. Salinas (Project Lead & Core Vision Architect)**
  - Oversees sprint timelines and core HCI alignment.
  - Engineered the `useMediaPipe` browser integration and the `gestureRecognizer.js` heuristic math engine.
- **Matthew Tabat (Frontend Developer & HCI Specialist)**
  - Crafted the React UI and standard kiosk layout ergonomics.
  - Implemented Framer Motion animations for the dwell timers and "Ghost Overlay" user positioning.
- **Alexander Tolosa (Backend Engineer & NLP Architect)**
  - Built the FastAPI Python server and managed CORS integration.
  - Designed the Gemini system prompt pipeline to translate raw fragments into professional English.
- **Jan Louis Simundo (Hardware Integration & QA)**
  - Manages physical kiosk constraints (1080p wide-angle camera, LED ring lighting).
  - Coordinates field testing with target users and conducts system QA against environmental variables (e.g., visual noise in public lobbies).

## Tech Stack

**Frontend:**

- React.js (Vite)
- Tailwind CSS
- Framer Motion (UI Animation & Feedback)
- Google MediaPipe Holistic (via CDN for bypass optimization)
- Web Speech API
- Lucide React (Icons)

**Backend:**

- Python 3
- FastAPI & Uvicorn
- Gemini API (Google AI Studio)

## Architecture & Folder Structure

```text
signsync-kiosk/
├── backend/                  # Python API for NLP Refinement
│   ├── .env                  # Gemini API Keys (Not committed to Git)
│   ├── app.py                # FastAPI server and Gemini logic
│   └── requirements.txt      # Python dependencies
├── src/
│   ├── components/
│   │   └── SignZoneCamera.jsx    # Core UI, Dwell Timer, & API Fetch
│   ├── hooks/
│   │   └── useMediaPipe.js       # Global window injection of MediaPipe
│   ├── utils/
│   │   └── gestureRecognizer.js  # Heuristic 3D math engine
│   ├── App.jsx
│   ├── index.css                 # Tailwind directives
│   └── main.jsx
├── index.html            # CDN Escape Hatch for MediaPipe scripts
├── package.json
├── tailwind.config.js
└── vite.config.js
```

## Running Locally

**Frontend:**
```bash
npm run dev
```

**Backend** (from the `backend/` folder):
```bash
.\venv\Scripts\python.exe -m uvicorn app:app --reload --port 8000
```
