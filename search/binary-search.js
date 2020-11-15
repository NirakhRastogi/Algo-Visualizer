async function binarySearch() {
  var len = values.length;
  if (len > 1) {
    await multiArrayBinarySearch();
    return;
  } else {
    await singleArrayBinarySearch();
    return;
  }
}

async function singleArrayBinarySearch() {
  try {
    if (!isSorted) {
      await bubbleSort();
    }
    var toFind = parseFloatCustom(toFindEl.value);
    var start = 0;
    var end = values[0].length - 1;
    var mid;
    while (start <= end) {
      mid = start + Math.round((end - start) >> 2);
      await updateBoardColor(
        [colors.element1Color, colors.element1Color],
        250,
        [0, 0],
        [start, end]
      );
      if (parseFloatCustom(values[0][mid][2]) == toFind) {
        await updateBoardColor(["white", "white"], 100, [0, 0], [start, end]);
        await updateBoardColor([colors.element3Color], 500, [0], [mid]);
        await timer(5000);
        await updateBoardColor(["white"], 100, [0], [mid]);
        return;
      } else {
        await updateBoardColor([colors.element2Color], 500, [0], [mid]);
        await timer(1000);
      }

      if (pauseProgress) {
        await pause();
        pauseProgress = false;
      }
      await updateBoardColor(
        ["white", "white", "white"],
        100,
        [0, 0, 0],
        [start, end, mid]
      );
      if (stopProgress) {
        return;
      }
      if (parseFloatCustom(values[0][mid][2]) > toFind) {
        end = mid - 1;
      } else {
        start = mid + 1;
      }
    }
    return;
  } catch (e) {
    await updateBoardColor(
      ["white", "white", "white"],
      100,
      [0, 0, 0],
      [start, mid, end]
    );
    updateError({
      message: "__Error__",
      log: e,
    });
  }
}

async function multiArrayBinarySearch() {
  try {
    if (!isSorted) {
      await insertionSort();
    }
    var toFind = parseFloatCustom(toFindEl.value);
    var i = 0;
    var j = values.length - 1;

    while (i < values.length && j >= 0) {
      await updateBoardColor([colors.element1Color], 250, [i], [j]);
      if (parseFloatCustom(values[i][j][2]) == toFind) {
        await updateBoardColor([colors.element2Color], 250, [i], [j]);
        await updateBoardColor(["white"], [100], [i], [j]);
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
      if (parseFloatCustom(values[i][j][2]) > toFind) j--;
      else i++;
    }
  } catch (e) {
    await updateBoardColor(
      ["white", "white", "white"],
      100,
      [0, 0, 0],
      [start, mid, end]
    );
    updateError({
      message: "__Error__",
      log: e,
    });
  }
}
