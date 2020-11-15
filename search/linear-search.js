async function linearSearch() {
  try {
    var toFind = parseFloatCustom(toFindEl.value);
    var row = values.length;
    var col = values[0].length;

    for (var i = 0; i < row; i++) {
      for (var j = 0; j < col; j++) {
        await updateBoardColor([colors.element1Color], 250, [i], [j]);
        if (parseFloatCustom(values[i][j][2]) == toFind) {
          await updateBoardColor([colors.element2Color], 1000, [i], [j]);
          await updateBoardColor(["white"], 100, [i], [j]);
          return;
        }
        if (pauseProgress) {
          await pause();
          pauseProgress = false;
        }

        await updateBoardColor(["white"], 100, [i], [j]);
        if (stopProgress) {
          return;
        }
      }
    }
  } catch (e) {
    await updateBoardColor(["white"], 100, [i], [j]);
    updateError({
      message: "__Error__",
      log: e,
    });
  }
}
