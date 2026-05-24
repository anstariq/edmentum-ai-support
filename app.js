import Vapi from "https://cdn.jsdelivr.net/npm/@vapi-ai/web/+esm";

// ── Config — fill in your credentials ──────────────────────────────────────
const PUBLIC_KEY = "your-vapi-public-key";
const ASSISTANT_ID = "your-vapi-assistant-id";
// ───────────────────────────────────────────────────────────────────────────

const vapi = new Vapi(PUBLIC_KEY);

const callBtn = document.getElementById("call-btn");
const btnLabel = document.getElementById("call-btn-label");
const btnIcon = callBtn.querySelector(".btn__icon");
const statusDot = document.getElementById("status-dot");
const statusLbl = document.getElementById("status-label");

let calling = false;

function setStatus(modifier, label) {
  statusDot.className = "status-pill__dot";
  if (modifier) statusDot.classList.add(`status-pill__dot--${modifier}`);
  statusLbl.textContent = label;
}

function setIdle() {
  calling = false;
  callBtn.className = "btn btn--primary";
  callBtn.disabled = false;
  btnLabel.textContent = "Click to Call";
  btnIcon.textContent = "📞";
  setStatus("", "Ready to connect");
}

function setConnecting() {
  calling = true;
  callBtn.disabled = true;
  btnLabel.textContent = "Connecting…";
  setStatus("connecting", "Connecting…");
}

function setActive() {
  calling = true;
  callBtn.className = "btn btn--danger";
  callBtn.disabled = false;
  btnLabel.textContent = "End Call";
  btnIcon.textContent = "🔴";
  setStatus("active", "On a call");
}

function setError() {
  calling = false;
  callBtn.disabled = true;
  setStatus("error", "Connection failed");
  setTimeout(setIdle, 3000);
}

callBtn.addEventListener("click", () => {
  if (calling) {
    vapi.stop();
  } else {
    setConnecting();
    vapi.start(ASSISTANT_ID);
  }
});

vapi.on("call-start", setActive);
vapi.on("call-end", setIdle);
vapi.on("error", setError);
