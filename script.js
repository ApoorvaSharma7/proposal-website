const bg = document.getElementById("bg");
const song = document.getElementById("song");

const backgrounds = [
  "linear-gradient(135deg,#ffdde1,#ee9ca7)",
  "linear-gradient(135deg,#fbc2eb,#a6c1ee)",
  "linear-gradient(135deg,#fad0c4,#ffd1ff)",
  "linear-gradient(135deg,#ffecd2,#fcb69f)"
];

let bgIndex = 0;
setInterval(() => {
  bg.style.background = backgrounds[bgIndex % backgrounds.length];
  bgIndex++;
}, 1000);

function openLetter() {
  page1.classList.add("hidden");
  page2.classList.remove("hidden");
}

function showValentine() {
  page2.classList.add("hidden");
  page3.classList.remove("hidden");
}

function yesClicked() {
  song.play();
  startConfetti();
  alert("You just made me the happiest 💖");
}

const emojis = ["💖","💖","💖","💖","💖","💖","💖","💖","💖","💖","💖","💖","💖","💖","💖","💔"];
let score = 0;
const winningScore = 5;

function startGame() {
  page3.classList.add("hidden");
  page4.classList.remove("hidden");
  song.play();
  score = 0;
  updateScore();
  generateGrid();
}

function updateScore() {
  document.getElementById("score").innerText = score;
}

function generateGrid() {
  const grid = document.getElementById("emojiGrid");
  grid.innerHTML = "";

  const shuffled = emojis.sort(() => Math.random() - 0.5);

  shuffled.forEach(e => {
    const span = document.createElement("span");
    span.className = "emoji";
    span.innerText = e;

    span.onclick = () => {
      if (e === "💔") {
        score++;
        updateScore();

        if (score >= winningScore) {
          setTimeout(() => {
            page4.classList.add("hidden");
            page3.classList.remove("hidden");
            alert("You repaired all the broken hearts 💖\n Will you be my Valentine? 💘");
          }, 400);
        } else {
          generateGrid();
        }
      }
    };

    grid.appendChild(span);
  });
}

const canvas = document.getElementById("confetti");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let confetti = [];

function startConfetti() {
  confetti = [];
  for (let i = 0; i < 150; i++) {
    confetti.push({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height - canvas.height,
      r: Math.random() * 6 + 4,
      color: `hsl(${Math.random() * 360},100%,70%)`,
      speed: Math.random() * 3 + 2
    });
  }

  const interval = setInterval(() => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    confetti.forEach(c => {
      ctx.beginPath();
      ctx.arc(c.x, c.y, c.r, 0, Math.PI * 2);
      ctx.fillStyle = c.color;
      ctx.fill();
      c.y += c.speed;
      if (c.y > canvas.height) c.y = -10;
    });
  }, 20);

  setTimeout(() => {
    clearInterval(interval);
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  }, 4000);
}



