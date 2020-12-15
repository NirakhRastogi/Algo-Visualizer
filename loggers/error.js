var errorEl = document.getElementById("btn_error");
var errorBoxEl = document.getElementById("errorBox");
var showBox = false;

errorEl.addEventListener("click", function () {
  toggleErrorBox();
});

function toggleErrorBox() {
  showBox = !showBox;
  if (showBox) expandElements(errorBoxEl);
  else compressElements(errorBoxEl);
}

function updateError(_error) {
  console.log(_error.logs);
  document.getElementById("message").innerText = _error.message;
  document.getElementById("logs").innerText = _error.logs;
  if (!showBox) {
    toggleErrorBox();
  }
}
