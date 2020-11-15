async function bubbleSort() {
  try {
    var direction = getSortDirection();
    var row = this.values.length;
    var col = this.values[0].length;
    var cr, cc, nr, nc;
    for (var i = 0; i < row * col; ++i) {
      for (var j = 0; j < row * col - 1; ++j) {
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

        if (
          Math.sign(
            parseFloatCustom(this.values[cr][cc][2]) -
              parseFloatCustom(this.values[nr][nc][2])
          ) == direction
        ) {
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
    isSorted = true;
    return;
  } catch (e) {
    await this.updateBoardColor(["white", "white"], 250, [cr, nr], [cc, nc]);
    updateError({
      message: "_Error__",
      log: e,
    });
  }
}
