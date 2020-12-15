async function bubbleSort() {
  try {
    setTimeComplexity("n^2", "n^2", "n^2");
    var direction = getSortDirection();
    var row = this.values.length;
    var col = this.values[0].length;
    setInputSize(row * col);
    var cr, cc, nr, nc;
    addLog(`Looping from i = 0 to ${row * col} elements...`);
    for (var i = 0; i < row * col; ++i) {
      stepCounter(1);
      addLog(`Looping from j = 0 to ${row * col - 1} elements, At i = ${i}...`);
      for (var j = 0; j < row * col - 1; ++j) {
        stepCounter(1);
        addLog(`At j = ${j}`);
        cr = parseInt(j / col);
        cc = j % col;
        nr = parseInt((j + 1) / col);
        nc = (j + 1) % col;

        await this.updateBoardColor(
          [colors.element1Color, colors.element2Color],
          250,
          [cr, nr],
          [cc, nc]
        );

        addLog(
          `Comparing ${this.values[cr][cc][2]} at index [${cr},${cc}] with ${this.values[nr][nc][2]} at index [${nr},${nc}]...`,
          "pink"
        );
        if (
          Math.sign(
            parseFloatCustom(this.values[cr][cc][2]) -
              parseFloatCustom(this.values[nr][nc][2])
          ) == direction
        ) {
          swapCounter(1);
          addLog(
            `Swaping ${this.values[cr][cc][2]} at index [${cr},${cc}] with ${this.values[nr][nc][2]} at index [${nr},${nc}]...`,
            "green"
          );
          var temp = this.values[cr][cc];
          this.values[cr][cc] = this.values[nr][nc];
          this.values[nr][nc] = temp;
          drawBoard(false);
          await timer(250);
        }
        if (pauseProgress) {
          await pause();
          pauseProgress = false;
        }
        await this.updateBoardColor(
          ["white", "white"],
          250,
          [cr, nr],
          [cc, nc]
        );
        if (stopProgress) {
          return;
        }
      }
    }
    if (direction == 1) isSorted = true;
    calcTimeComplexity(row * col);
    finishLog();
    return;
  } catch (e) {
    await this.updateBoardColor(["white", "white"], 250, [cr, nr], [cc, nc]);
    updateError({
      message: "_Error__",
      log: e,
    });
  }
}
