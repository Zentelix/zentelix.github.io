function connectWebcam() {
  const video = document.getElementById("videoFeed");
  const urlInput = document.getElementById("cameraURL");
  const iframeContainer = document.getElementById("iframeContainer");

  if (video.srcObject) {
    video.srcObject.getTracks().forEach(track => track.stop());
  }

  iframeContainer.innerHTML = "";
  iframeContainer.style.display = "none";

  video.src = "";
  video.style.display = "block";
  urlInput.value = "";

  navigator.mediaDevices.getUserMedia({ video: true })
    .then(stream => {
      video.srcObject = stream;
    })
    .catch(err => {
      alert("No se pudo acceder a la webcam: " + err.message);
    });
}

function connectURL() {
  const url = document.getElementById("cameraURL").value.trim();
  const video = document.getElementById("videoFeed");
  const iframeContainer = document.getElementById("iframeContainer");

  if (!url) {
    alert("Ingresá una URL válida.");
    return;
  }

  if (video.srcObject) {
    video.srcObject.getTracks().forEach(track => track.stop());
    video.srcObject = null;
  }

  video.src = "";
  video.style.display = "none";
  iframeContainer.innerHTML = "";
  iframeContainer.style.display = "none";

  if (url.endsWith(".mjpg") || url.match(/video\.mjpg/i) || url.includes("/snapshot.cgi")) {
    video.style.display = "block";
    video.src = url;
    video.load();
    video.play();
  } else if (url.endsWith(".m3u8")) {
    if (window.Hls && Hls.isSupported()) {
      video.style.display = "block";
      const hls = new Hls();
      hls.loadSource(url);
      hls.attachMedia(video);
    } else if (video.canPlayType('application/vnd.apple.mpegurl')) {
      video.style.display = "block";
      video.src = url;
      video.play();
    } else {
      alert("Tu navegador no soporta HLS directamente.");
    }
  } else {
    iframeContainer.innerHTML = `<iframe src="${url}" width="800" height="600" frameborder="0" allowfullscreen></iframe>`;
    iframeContainer.style.display = "block";
  }
}

function confirmCamera() {
  const video = document.getElementById("videoFeed");
  const url = document.getElementById("cameraURL").value.trim();
  const usingWebcam = !!video.srcObject;

  if (!usingWebcam && !url) {
    alert("Primero conectá una cámara.");
    return;
  }

  const type = usingWebcam ? "webcam" : "url";
  sessionStorage.setItem("cameraType", type);
  if (type === "url") sessionStorage.setItem("cameraURL", url);

  location.href = "monitor.html";
}
