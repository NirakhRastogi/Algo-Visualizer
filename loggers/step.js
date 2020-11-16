var stepLogs = [];
var stepLogLength = 1;
var stepCount = 0;
var swapCount = 0;
var actualComplexity = [];
var predictedTimeComplexity = [];
var inputSize = 0;

function setInputSize(_inputSize) {
  inputSize = _inputSize;
}

function setTimeComplexity(worst, avg, best) {
  predictedTimeComplexity = [`O(${worst})`, `O(${avg})`, `O(${best})`];
}

function stepCounter(countValue) {
  stepCount += countValue;
}

function swapCounter(countValue) {
  swapCount += countValue;
}

function clearLog() {
  stepLogs = [];
  stepLogLength = 1;
  swapCount = 0;
  stepCount = 0;
  predictedTimeComplexity = [];
  actualComplexity = [];
}

function finishLog() {
  addLog("____________________________________________________________");
  addLog(`Time Complexity`, "red", "17px");
  addLog(`Original...`, "red", "14px");
  addLog(`Best : ${predictedTimeComplexity[0]}`, "red", "14px");
  addLog(`Average : ${predictedTimeComplexity[1]}`, "red", "14px");
  addLog(`Worst : ${predictedTimeComplexity[2]}`, "red", "14px");
  addLog(`Achieved...`, "red", "14px");
  addLog(`Log Based : ${actualComplexity[0]}`, "red", "14px");
  addLog(`Exp Based : ${actualComplexity[1]}`, "red", "14px");
  addLog(`Power Based : ${actualComplexity[2]}`, "red", "14px");
  addLog(`Nth-Power Based : ${actualComplexity[3]}`, "red", "14px");
  addLog("____________________________________________________________");
  addLog(`Step and Swap count`, "green", "17px");
  addLog(`Input Size : ${inputSize}`, "green", "14px");
  addLog(`Total Execution Step : ${stepCount}`, "green", "14px");
  addLog(`Total Execution Swaps : ${swapCount}`, "green", "14px");
}

function addLog(log = ``, color = "white", font_size = "inherit") {
  stepLogs.push(
    `<tr><td style="color: ${color}; font-size: ${font_size}">${stepLogLength++}... ${log}</td></tr>`
  );
  document.getElementById("steps_table").innerHTML = stepLogs.join("");
}

function calcTimeComplexity(input_size) {
  let logComplex = Math.pow(input_size, 1 / stepCount);
  let expComplex = Math.log(stepCount) / input_size;
  let powComplex = Math.log(stepCount) / Math.log(input_size);
  let npowComplex = Math.exp(Math.log(stepCount) / input_size);

  actualComplexity = [
    `O(log(n) base ${logComplex})`,
    `O(e^(n*${expComplex}))`,
    `O(n^${powComplex})`,
    `O(${npowComplex}^n)`,
  ];
}
