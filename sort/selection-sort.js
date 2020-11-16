async function selectionSort() {
  try {
    var direction = getSortDirection();
    var row = this.values.length;
    var col = this.values[0].length;
    var cr, cc, mr, mc, nr, nc;
    for (var i = 0; i < row * col; ++i) {
      cr = parseInt(i / col);
      cc = i % col;
      mr = cr;
      mc = cc;
      var elVal = parseFloatCustom(values[mr][mc][2]);

      await this.updateBoardColor([colors.element1Color], 250, [cr], [cc]);

      for (var j = i + 1; j < row * col; ++j) {
        nr = parseInt(j / col);
        nc = j % col;

        await this.updateBoardColor([colors.element2Color], 250, [nr], [nc]);

        if (
          (direction == -1 && parseFloatCustom(values[nr][nc][2]) > elVal) ||
          (direction == 1 && parseFloatCustom(values[nr][nc][2]) < elVal)
        ) {
          if (mr != cr || mc != cc) {
            await this.updateBoardColor(["white"], 250, [mr], [mc]);
          }
          elVal = parseFloatCustom(values[nr][nc][2]);
          mr = nr;
          mc = nc;
          await this.updateBoardColor([colors.element3Color], 250, [mr], [mc]);
        }

        if (pauseProgress) {
          await pause();
          pauseProgress = false;
        }
        if (nr != mr || nc != mc) {
          await this.updateBoardColor(["white"], 250, [nr], [nc]);
        }
        if (stopProgress) {
          return;
        }
      }
      if (cr != mr || cc != mc) {
        var temp = this.values[cr][cc];
        this.values[cr][cc] = this.values[mr][mc];
        this.values[mr][mc] = temp;
        drawBoard(false);
        await timer(250);
      }
      await this.updateBoardColor(
        ["white", "white", "white"],
        250,
        [cr, nr, mr],
        [cc, nc, mc]
      );
      if (stopProgress) {
        return;
      }
    }
    if (direction == 1) isSorted = true;
  } catch (e) {
    await this.updateBoardColor(
      ["white", "white", "white"],
      250,
      [cr, nr, mr],
      [cc, nc, mc]
    );
    updateError({
      message: "__Error__",
      log: e,
    });
  }
}
