# Edmentum AI Support Demo Page

Single-page demo combining Vapi voice bot and chatQuartz chatbot, styled with Edmentum's brand.

## Setup

1. Open `app.js` and replace the two config constants at the top:
   - `PUBLIC_KEY` — your Vapi public key (Vapi dashboard → Account → API Keys)
   - `ASSISTANT_ID` — your Vapi assistant ID (Vapi dashboard → Assistants → select → copy ID)

2. To embed the chatQuartz widget, drop the chatQuartz script tag into `index.html` just before `</body>` and target `#chatquartz-container` as the mount point.

## Local development

Run a local server:
```
npx serve .
```
Then open http://localhost:3000

## Deploy

This repo is connected to Vercel. Every push to `main` automatically deploys to production.
