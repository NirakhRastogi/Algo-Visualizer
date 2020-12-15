async function quickSort() {
  var len = values.length;
  if (len > 1) {
    await multiArrayQuickSort();
    return;
  } else {
    await singleArrayQuickSort();
    return;
  }
}

async function multiArrayQuickSort() {
  alert("Multi array quick sort yet not implemented...");
  return;
}

async function singleArrayQuickSort() {
  try {
    var direction = getSortDirection();
    var l = values[0].length - 1;
    await __quickSortImpl(0, l, direction);
    console.log(values[0]);
    return;
  } catch (e) {
    // await updateBoardColor(
    //   ["white", "white", "white"],
    //   100,
    //   [0, 0, 0],
    //   [start, mid, end]
    // );
    updateError({
      message: "__Error__",
      log: e,
    });
  }
}

async function __quickSortImpl(start, end, direction) {
  await checkPause();
  if (stopProgress) {
    return;
  }
  if (end - start <= 0) return;

  let pivot = parseInt(start + (end - start) / 2);
  let pivotEl = parseFloatCustom(values[0][pivot][2]);

  await updateRowColor(start, end, colors.backgroundColor, 250);

  await this.updateBoardColor(
    [colors.element3Color, colors.element2Color, colors.element1Color],
    250,
    [0, 0, 0],
    [pivot, end, start]
  );

  //asc(1) : -1 , 1
  //desc(-1) : 1 , -1

  let i = start;
  let j = end;
  while (i <= j) {
    while (
      Math.sign(parseFloatCustom(values[0][i][2]) - pivotEl) == -direction
    ) {
      await this.updateBoardColor([colors.backgroundColor], 250, [0], [i]);
      i++;
      await this.updateBoardColor([colors.element1Color], 250, [0], [i]);
      await checkPause();
      if (stopProgress) {
        return;
      }
    }
    while (
      Math.sign(parseFloatCustom(values[0][j][2]) - pivotEl) == direction
    ) {
      await this.updateBoardColor([colors.backgroundColor], 250, [0], [j]);
      j--;
      await this.updateBoardColor([colors.element2Color], 250, [0], [j]);
      await checkPause();
      if (stopProgress) {
        return;
      }
    }
    if (i <= j) {
      let temp = values[0][i];
      values[0][i] = values[0][j];
      values[0][j] = temp;
      drawBoard(false);
      await timer(500);
      await this.updateBoardColor(
        [colors.backgroundColor, colors.backgroundColor],
        250,
        [0, 0],
        [i, j]
      );
      i++;
      j--;
      await this.updateBoardColor(
        [colors.element1Color, colors.element2Color],
        250,
        [0, 0],
        [i, j]
      );
    }
    await checkPause();
    if (stopProgress) {
      return;
    }
  }

  await updateRowColor(start, end, "white", 250);
  await checkPause();
  if (stopProgress) {
    return;
  }
  await __quickSortImpl(start, j, direction);
  await updateRowColor(start, end, "white", 250);
  await __quickSortImpl(i, end, direction);
  return;
}

async function checkPause() {
  if (pauseProgress) {
    await pause();
    pauseProgress = false;
  }
}
