const memoryCards = document.querySelectorAll(".memory");
const yesBtn = document.getElementById("yes-btn");
const noBtn = document.getElementById("no-btn");
const response = document.getElementById("proposal-response");
const heartRain = document.getElementById("heart-rain");
const proposalCard = document.querySelector(".proposal-card");
let audioContext;

if ("IntersectionObserver" in window) {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry, index) => {
        if (!entry.isIntersecting) return;
        const card = entry.target;
        setTimeout(() => {
          card.classList.add("revealed");
        }, index * 80);
        observer.unobserve(card);
      });
    },
    { threshold: 0.25 }
  );

  memoryCards.forEach((card) => observer.observe(card));
} else {
  memoryCards.forEach((card) => card.classList.add("revealed"));
}

function spawnHearts(count = 34) {
  const heartChars = ["\u2665", "\u2661", "\u2764", "\u2665", "\u2661"];

  for (let i = 0; i < count; i += 1) {
    const heart = document.createElement("span");
    heart.className = "heart";
    heart.textContent = heartChars[Math.floor(Math.random() * heartChars.length)];
    heart.style.left = `${Math.random() * 100}%`;
    heart.style.animationDuration = `${5 + Math.random() * 5}s`;
    heart.style.animationDelay = `${Math.random() * 0.45}s`;
    heart.style.setProperty("--drift", `${(Math.random() - 0.5) * 180}px`);
    heartRain.appendChild(heart);

    setTimeout(() => {
      heart.remove();
    }, 10800);
  }
}

function tone(freq, start, duration, volume = 0.07, type = "triangle") {
  const oscillator = audioContext.createOscillator();
  const gain = audioContext.createGain();
  oscillator.type = type;
  oscillator.frequency.setValueAtTime(freq, start);

  gain.gain.setValueAtTime(0.0001, start);
  gain.gain.exponentialRampToValueAtTime(volume, start + 0.02);
  gain.gain.exponentialRampToValueAtTime(0.0001, start + duration);

  oscillator.connect(gain);
  gain.connect(audioContext.destination);
  oscillator.start(start);
  oscillator.stop(start + duration + 0.02);
}

function playCelebrationMusic() {
  const AudioCtx = window.AudioContext || window.webkitAudioContext;
  if (!AudioCtx) return;

  if (!audioContext) {
    audioContext = new AudioCtx();
  }

  if (audioContext.state === "suspended") {
    audioContext.resume();
  }

  const beat = 60 / 128;
  const start = audioContext.currentTime + 0.04;

  const lead = [
    [523.25, 0, 0.5],
    [659.25, 0.5, 0.5],
    [783.99, 1.0, 0.5],
    [659.25, 1.5, 0.5],
    [698.46, 2.0, 0.5],
    [783.99, 2.5, 0.5],
    [880.0, 3.0, 0.75],
    [783.99, 3.75, 0.25],
    [659.25, 4.0, 0.5],
    [587.33, 4.5, 0.5],
    [659.25, 5.0, 0.5],
    [698.46, 5.5, 1.0]
  ];

  const bass = [
    [130.81, 0, 1.0],
    [164.81, 1.0, 1.0],
    [174.61, 2.0, 1.0],
    [196.0, 3.0, 1.0],
    [174.61, 4.0, 1.0],
    [164.81, 5.0, 1.0]
  ];

  lead.forEach(([freq, offset, beats]) => {
    tone(freq, start + offset * beat, beats * beat, 0.06, "triangle");
  });

  bass.forEach(([freq, offset, beats]) => {
    tone(freq, start + offset * beat, beats * beat, 0.045, "sine");
  });
}

let noMoveCount = 0;
function moveNoButton() {
  const cardBounds = proposalCard.getBoundingClientRect();
  const maxX = Math.max(12, cardBounds.width - noBtn.offsetWidth - 16);
  const maxY = Math.max(12, 56);
  const nextX = Math.random() * maxX;
  const nextY = 6 + Math.random() * maxY;

  noBtn.style.position = "absolute";
  noBtn.style.left = `${nextX}px`;
  noBtn.style.top = `${nextY}px`;
  noMoveCount += 1;

  if (noMoveCount >= 3 && response.textContent.length === 0) {
    response.textContent = "That button is shy today. Try yes?";
  }
}

["mouseenter", "touchstart"].forEach((eventName) => {
  noBtn.addEventListener(eventName, moveNoButton, { passive: true });
});

noBtn.addEventListener("click", () => {
  moveNoButton();
  response.textContent = "I am taking that as a maybe. Try one more time?";
});

yesBtn.addEventListener("click", () => {
  document.body.classList.add("yes-celebration");
  response.textContent = "Okay, letting Amruth know.";
  spawnHearts();
  playCelebrationMusic();
});
