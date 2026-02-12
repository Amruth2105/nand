const memoryCards = document.querySelectorAll(".memory");
const yesBtn = document.getElementById("yes-btn");
const noBtn = document.getElementById("no-btn");
const response = document.getElementById("proposal-response");
const heartRain = document.getElementById("heart-rain");
const proposalCard = document.querySelector(".proposal-card");

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
});
