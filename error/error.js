var errorEl = document.getElementById("error");
var errorBoxEl = document.getElementById("errorBox");
var showBox = false;

errorEl.addEventListener("click", function () {
  updateBox();
});

function updateBox() {
  showBox = !showBox;
  if (showBox) expandElements(errorBoxEl);
  else compressElements(errorBoxEl);
}

function updateError(_error) {
  document.getElementById("message").innerText = _error.message;
  document.getElementById("logs").innerText = _error.logs;
  if (!showBox) {
    updateBox();
  }
}
