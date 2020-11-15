function showElements(...els) {
  for (var el of els) {
    __showElement(el);
  }
}

function hideElements(...els) {
  for (var el of els) {
    __hideElement(el);
  }
}

function __showElement(el) {
  el.classList.add("show");
  el.classList.remove("hide");
}

function __hideElement(el) {
  el.classList.add("hide");
  el.classList.remove("show");
}

function expandElements(...els) {
  for (var el of els) {
    __expandElement(el);
  }
}

function compressElements(...els) {
  for (var el of els) {
    __compressElements(el);
  }
}

function __expandElement(el) {
  el.classList.add("expand");
  el.classList.remove("compress");
}

function __compressElement(el) {
  el.classList.add("compress");
  el.classList.remove("expand");
}

function parseFloatCustom(e) {
  var _e = parseFloat(e);
  if (!isNaN(_e)) {
    return _e;
  }
  throw `Cannot convert '${e} to float.`;
}
