async function insertionSort() {
  try {
    var direction = getSortDirection();
    var row = this.values.length;
    var col = this.values[0].length;
    var cr, cc, nr, nc;
    for (var i = 0; i < row * col; ++i) {
      cr = parseInt(i / col);
      cc = i % col;
      await this.updateBoardColor([colors.element1Color], 250, [cr], [cc]);
      for (var j = i + 1; j < row * col; ++j) {
        nr = parseInt(j / col);
        nc = j % col;

        await this.updateBoardColor([colors.element1Color], 250, [nr], [nc]);

        if (
          Math.sign(
            parseFloatCustom(this.values[cr][cc][2]) -
              parseFloatCustom(this.values[nr][nc][2])
          ) == direction
        ) {
          var temp = this.values[nr][nc];
          this.values[nr][nc] = this.values[cr][cc];
          this.values[cr][cc] = temp;
          await this.updateBoardColor([colors.element1Color], 250, [nr], [nc]);
          await this.updateBoardColor([colors.element1Color], 250, [cr], [cc]);
          drawBoard(false);
          await timer(250);
        }
        if (pauseProgress) {
          await pause();
          pauseProgress = false;
        }
        await this.updateBoardColor(["white"], 250, [nr], [nc]);
        if (stopProgress) {
          return;
        }
      }
      await this.updateBoardColor(["white"], 250, [cr], [cc]);
      if (stopProgress) {
        return;
      }
    }
    if (direction == 1) isSorted = true;
    return;
  } catch (e) {
    await this.updateBoardColor(["white", "white"], 250, [cr, nr], [cc, nc]);
    updateError({
      message: "_Error__",
      log: e,
    });
  }
}
