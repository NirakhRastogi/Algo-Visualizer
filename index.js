var toFindEl = document.getElementById("toFind");
var valuesEl = document.getElementById("values");
var selectEl = document.getElementById("algoSelect");
var submitBtn = document.getElementById("submit");
var startBtn = document.getElementById("start");
var stopBtn = document.getElementById("stop");
var pauseBtn = document.getElementById("pause");
var dirSelectEl = document.getElementById("dirSelect");

var fgAlgoEl = document.getElementById("fgAlgo");
var fgValueEl = document.getElementById("fgValue");
var fgToFindEl = document.getElementById("fgToFind");
var fgDirectionEl = document.getElementById("fgDirection");
var fgStopEl = document.getElementById("fgStop");
var fgPauseEl = document.getElementById("fgPause");
var fgStartEl = document.getElementById("fgStart");
var fgSubmitEl = document.getElementById("fgSubmit");

var colors = {
  element1Color: "rgb(196, 74, 26)",
  element2Color: "rgb(26, 128, 196)",
  element3Color: "rgb(89, 227, 102)",
  backgroundColor: "rgb(230,200,200)",
};

var container = d3.select("#board").append("g");
var grid_container_x = d3
  .select("#grid")
  .append("g")
  .attr("id", function (i, v) {
    return "Grid_X_G";
  });
var grid_container_y = d3
  .select("#grid")
  .append("g")
  .attr("id", function (i, v) {
    return "Grid_Y_G";
  });
var isSorted = false;
var values = [];

var selectValue = "bubble-sort";

var svgProperty = {
  box: {
    width: 40,
    height: 40,
  },
};

var stopProgress = false;
var pauseProgress = false;

(() => {
  let width = window.outerWidth;
  let height = window.outerHeight;
  let gridSize = [svgProperty.box.width, svgProperty.box.height];
  let x = [];
  let y = [];

  for (let i = -gridSize[0] * 2; i < width; i += gridSize[0]) {
    y.push(i);
  }
  for (let i = -gridSize[1] * 2; i < height; i += gridSize[1]) {
    x.push(i);
  }

  var gridRow = grid_container_x.selectAll("#Grid_X_G").data(x, function (v) {
    return v;
  });

  var gridRowEntry = gridRow
    .enter()
    .append("g")
    .attr("id", function (v, i) {
      return "Grid_Row_" + i;
    });

  gridRowEntry
    .append("line")
    .attr("id", function (v) {
      return "Line_X_" + v;
    })
    .attr("x1", function (v) {
      return 0;
    })
    .attr("x2", function (v) {
      return width;
    })
    .attr("y1", function (v) {
      return v;
    })
    .attr("y2", function (v) {
      return v;
    })
    .attr("stroke", "black");

  var gridCol = grid_container_y.selectAll("#Grid_Y_G").data(y, function (v) {
    return v + "_y";
  });

  var gridColEntry = gridCol
    .enter()
    .append("g")
    .attr("id", function (v, i) {
      return "Grid_Col_" + i;
    });

  gridColEntry
    .append("line")
    .attr("id", function (v) {
      return "Line_Y_" + v;
    })
    .attr("x1", function (v) {
      return v;
    })
    .attr("x2", function (v) {
      return v;
    })
    .attr("y1", function (v) {
      return 0;
    })
    .attr("y2", function (v) {
      return height;
    })
    .attr("stroke", "black");
})();

function getSortDirection() {
  if (selectValue.endsWith("search")) {
    return 1;
  }
  return dirSelectEl.value == "asc" ? 1 : -1;
}

dirSelectEl.addEventListener("change", function () {
  isSorted = false;
});

pauseBtn.addEventListener("click", function () {
  hideElements(fgStopEl, fgPauseEl);
  showElements(fgStartEl);
  pauseProgress = true;
});

stopBtn.addEventListener("click", function () {
  hideElements(fgStopEl, fgPauseEl);
  showElements(fgStartEl, fgSubmitEl);
  stopProgress = true;
});

selectEl.addEventListener("change", function (ev) {
  selectValue = ev.target.value;
  if (selectValue.endsWith("search")) {
    showElements(fgToFindEl);
  } else {
    hideElements(fgToFindEl);
  }

  if (selectValue.endsWith("sort")) {
    showElements(fgDirectionEl);
  } else {
    hideElements(fgDirectionEl);
  }
});

submitBtn.addEventListener("click", function () {
  init();
});

startBtn.addEventListener("click", async () => {
  if (!pauseProgress) {
    clearLog();
    hideElements(fgStartEl, fgSubmitEl, fgValueEl, fgAlgoEl);
    showElements(fgPauseEl, fgStopEl);
    stopProgress = false;
    pauseProgress = false;
    switch (selectValue) {
      case "linear-search":
        await linearSearch();
        break;
      case "binary-search":
        await binarySearch();
        break;
      case "bubble-sort":
        await bubbleSort();
        break;
      case "insertion-sort":
        await insertionSort();
        break;
      case "selection-sort":
        await selectionSort();
        break;
      case "quick-sort":
        await quickSort();
        break;
    }
    hideElements(fgPauseEl, fgStopEl);
    showElements(fgStartEl, fgSubmitEl, fgAlgoEl, fgValueEl);
  }
});

function resolveValues(values) {
  values = values.split("\n");
  var tempValues = values.toString();

  var count = 0;
  for (var value of values) {
    values[count] = value.split(" ");
    if (count > 0) {
      if (values[count].length != values[count - 1].length) {
        updateError({
          message: "Invalid Input Sequence",
          log: `Invalid Input Sequence, Length of each row should be equal. Invalid Length '${
            values[count].length
          }' found for row '${count}' in array [[ ${tempValues.replace(
            /,/g,
            "]["
          )}]]`,
        });
        return;
      }
    }
    count++;
  }
  var rowId = 0;
  var colId = 0;

  var output = [];

  for (var row of values) {
    var outputRow = [];
    for (var col of row) {
      outputRow.push([rowId, colId, col, "white"]);
      colId++;
    }
    output.push(outputRow);
    colId = 0;
    rowId++;
  }
  return output;
}

function init() {
  this.values = resolveValues(this.valuesEl.value);
  isSorted = false;
  drawBoard(true);
}

function drawBoard(clear) {
  var boardRowSVG = container.selectAll("g").data(this.values, function (v) {
    return v;
  });

  var boardRowEntry = boardRowSVG
    .enter()
    .append("g")
    .attr("id", function (v, i) {
      return "Row_" + i;
    });

  var boardColSVG = boardRowEntry.selectAll("g").data(
    function (d) {
      return d;
    },
    function (d) {
      return d;
    }
  );

  updateBoard();

  var boardColEntry = boardColSVG
    .enter()
    .append("g")
    .attr("id", function (v) {
      return "Col_" + v[0] + "_" + v[1];
    })
    .attr("transform", function (v) {
      return (
        "translate(" +
        [v[1] * svgProperty.box.width, v[0] * svgProperty.box.height] +
        ")"
      );
    });

  boardColEntry
    .append("rect")
    .attr("id", function (v) {
      return "Rect_" + v[0] + "_" + v[1];
    })
    .attr("height", svgProperty.box.height)
    .attr("width", svgProperty.box.width)
    .attr("fill", function (v) {
      return v[3];
    })
    .attr("stroke", "black");

  boardColEntry
    .append("text")
    .attr("id", function (v) {
      return "Text_" + v[0] + "_" + v[1];
    })
    .attr("x", function () {
      return svgProperty.box.width / 2;
    })
    .attr("y", function () {
      return svgProperty.box.height / 2;
    })
    .text(function (v) {
      return v[2];
    });

  boardColSVG.exit().remove();
  if (clear) {
    boardRowSVG.exit().remove();
  }
}

function updateBoard() {
  for (var rowId in this.values) {
    for (var colId in this.values[rowId]) {
      d3.select(
        "#Col_" +
          this.values[rowId][colId][0] +
          "_" +
          this.values[rowId][colId][1]
      )
        .transition(1000)
        .attr("transform", () => {
          return (
            "translate(" +
            [colId * svgProperty.box.width, rowId * svgProperty.box.height] +
            ")"
          );
        });

      d3.select(
        "#Rect_" +
          this.values[rowId][colId][0] +
          "_" +
          this.values[rowId][colId][1]
      )
        .transition(1000)
        .attr("fill", function (v) {
          return v[3];
        });
    }
  }
}

async function updateRowColor(start, end, color, time) {
  for (let i = start; i <= end; i++) {
    await checkPause();
    if (stopProgress) {
      return;
    }
    await this.updateBoardColor([color], time, [0], [i]);
  }
}

async function updateBoardColor(color, __timer, x, y) {
  var colorLen = color.length;
  for (var i = 0; i < colorLen; i++) {
    values[x[i]][y[i]][3] = color[i];
  }
  drawBoard(false);
  await timer(__timer);
}

function timer(ms) {
  return new Promise((res) => setTimeout(res, ms));
}

function pause() {
  return new Promise((res) => {
    startBtn.addEventListener("click", function (e) {
      hideElements(fgStartEl);
      showElements(fgPauseEl, fgStopEl);
      pauseProgress = false;
      res();
    });
  });
}
