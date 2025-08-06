const video = document.getElementById("monitorFeed");
const canvas = document.getElementById("overlay");
const ctx = canvas.getContext("2d");
const personCountEl = document.getElementById("personCount");
const carCountEl = document.getElementById("carCount");

let model;
let detecting = false;

async function startCamera() {
  const stream = await navigator.mediaDevices.getUserMedia({
    video: { width: 800, height: 600 }
  });
  video.srcObject = stream;
  await video.play();
  resizeCanvas();
}

function resizeCanvas() {
  canvas.width = video.videoWidth || 800;
  canvas.height = video.videoHeight || 600;
  canvas.style.width = video.style.width || "800px";
  canvas.style.height = video.style.height || "600px";
}

async function loadModel() {
  model = await cocoSsd.load();
}

async function detectLoop() {
  if (!detecting) return;

  const predictions = await model.detect(video);
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  let personCount = 0;
  let carCount = 0;

  predictions.forEach(pred => {
    if (pred.score < 0.5) return;

    const [x, y, width, height] = pred.bbox;
    let strokeColor = "#ffff00";

    if (pred.class === "person") {
      strokeColor = "#00ffff";
      personCount++;
    } else if (pred.class === "car") {
      strokeColor = "#ff00ff";
      carCount++;
    } else {
      return;
    }

    ctx.strokeStyle = strokeColor;
    ctx.lineWidth = 3;
    ctx.font = "18px 'Exo 2', sans-serif";
    ctx.fillStyle = strokeColor;

    ctx.strokeRect(x, y, width, height);
    ctx.fillText(`${pred.class} ${(pred.score * 100).toFixed(0)}%`, x + 5, y > 20 ? y - 5 : y + 20);
  });

  personCountEl.textContent = personCount;
  carCountEl.textContent = carCount;

  requestAnimationFrame(detectLoop);
}

async function init() {
  try {
    await startCamera();
    await loadModel();
    detecting = true;
    detectLoop();
  } catch (error) {
    alert("Error iniciando cámara o modelo: " + error.message);
    console.error(error);
  }
}

window.onload = init;

const clockEl = document.getElementById("clock");
const statusEl = document.getElementById("status");
const pauseBtn = document.getElementById("pauseBtn");
const snapshotBtn = document.getElementById("snapshotBtn");
const eventList = document.getElementById("eventList");

let paused = false;

function updateClock() {
  const now = new Date();
  clockEl.textContent = now.toLocaleTimeString('es-AR');
  requestAnimationFrame(updateClock);
}

pauseBtn.addEventListener("click", () => {
  paused = !paused;
  pauseBtn.textContent = paused ? "▶️ Reanudar" : "⏸️ Pausar";
  statusEl.textContent = paused ? "⛔ Pausado" : "🟢 Monitoreando";
});

snapshotBtn.addEventListener("click", () => {
  const imgData = canvas.toDataURL("image/png");
  const link = document.createElement("a");
  link.href = imgData;
  link.download = `captura_${Date.now()}.png`;
  link.click();
});

function logEvent(label) {
  const li = document.createElement("li");
  const time = new Date().toLocaleTimeString();
  li.textContent = `${time} - ${label}`;
  eventList.prepend(li);
}

updateClock(); // Iniciar reloj
