const logoutBtn = document.getElementById('logoutBtn');
const connectCameraBtn = document.getElementById('connectCameraBtn');
const liveAnalysisBtn = document.getElementById('liveAnalysisBtn');
const reportsBtn = document.getElementById('reportsBtn');

const cameraStatus = document.getElementById('cameraStatus');
const analysisStatus = document.getElementById('analysisStatus');

let cameraConnected = false;
let analysisRunning = false;

logoutBtn.addEventListener('click', () => {
  alert('Sesión cerrada');
  window.location.href = 'index.html';
});

connectCameraBtn.addEventListener('click', () => {
  if (!cameraConnected) {
    cameraConnected = true;
    cameraStatus.textContent = 'Cámara: conectada';
    alert('Cámara conectada correctamente (simulado)');
  } else {
    cameraConnected = false;
    cameraStatus.textContent = 'Cámara: desconectada';
    analysisRunning = false;
    analysisStatus.textContent = 'Análisis en vivo: detenido';
    alert('Cámara desconectada');
  }
});

liveAnalysisBtn.addEventListener('click', () => {
  if (!cameraConnected) {
    alert('Primero conecta una cámara');
    return;
  }
  if (!analysisRunning) {
    analysisRunning = true;
    analysisStatus.textContent = 'Análisis en vivo: activo';
    alert('Análisis en vivo iniciado (simulado)');
  } else {
    analysisRunning = false;
    analysisStatus.textContent = 'Análisis en vivo: detenido';
    alert('Análisis en vivo detenido');
  }
});

reportsBtn.addEventListener('click', () => {
  alert('Funcionalidad de reportes próximamente');
});
