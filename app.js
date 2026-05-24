import Vapi from "https://cdn.jsdelivr.net/npm/@vapi-ai/web@2.3.3/+esm";

// ── Config — fill in your credentials ──────────────────────────────────────
const PUBLIC_KEY = "07a2396d-9738-4838-af99-f6a18d946f0b";
const ASSISTANT_ID = "41ea049a-3073-4c2d-a6b4-3cc9db13b6ff";
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
  btnIcon.textContent = "⏳";
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
