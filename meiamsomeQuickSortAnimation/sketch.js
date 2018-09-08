const modes = {
  PARALLEL: 0,
  SYNCHRONOUS: 1,
}
const mode = modes.PARALLEL;
let values;

const nextSwapPromise = (() => {
	let _nextSwap = Promise.resolve();

  return function nextSwapPromise() {
    _nextSwap = _nextSwap.then(async() => {
      render();
      await new Promise(window.requestAnimationFrame);
    });
    return _nextSwap;
  }
})();

function setup() {
  createCanvas(600, 400);
  values = [];
  for (let i = 0; i < width; i++) {
    values[i] = random(height);
  }
  noLoop();
  quicksort(values, 0, values.length - 1).then(() => {
    console.log(`Total swaps: ${swaps}`);
  });
}

async function quicksort(arr, lo, hi) {
  if (lo < hi) {
    let mid = await partition(arr, lo, hi);
    if (mode === modes.PARALLEL) {
      // Parallel
      await Promise.all([
        quicksort(arr, lo, mid - 1),
      	quicksort(arr, mid + 1, hi),
    	]);
    } else if (mode === modes.SYNCHRONOUS) {
      // Synchronous
      await quicksort(arr, lo, mid - 1);
      await quicksort(arr, mid + 1, hi);
    }
  }
}

async function partition(arr, low, high) {
  let pivot = arr[high];
  let i = (low - 1);
  for (let j = low; j <= high - 1; j++) {
    if (arr[j] <= pivot) {
      i++;
      await swap(arr, i, j);
    }
  }
  await swap(arr, i + 1, high);
  return (i + 1);
}

function render() {
  background(0);
  for (let i = 0; i < values.length; i++) {
    stroke(255);
    line(i, height, i, height - values[i]);
  }
}

async function swap(arr, a, b) {
  await nextSwapPromise();
  let temp = arr[a];
  arr[a] = arr[b];
  arr[b] = temp;
}
