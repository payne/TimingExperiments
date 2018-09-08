function setup() {
  createCanvas(400, 400);
  noLoop();
}

// Many thanks to Meiamsome for the help on 9/7/18
function drawNoAsync() {
  background("#000000");
  stroke(255);
  let [start, increment] = [10, 10];
  let promise = Promise.resolve();
  for (let x = start; x < width; x += increment) {
    for (let y = start; y < height; y += increment) {
      // Usage!
      promise = promise
        .then(() => line(x, 0, x, height))
        .then(() => sleep(1000))
        .then(() => {
          // Do something after the sleep!
          line(0, y, width, y);
        });
    }
  }
}

async function draw() {
  background("#000000");
  stroke(255);
  let [start, increment] = [10, 10];
  for (let x = start; x < width; x += increment) {
    for (let y = start; y < height; y += increment) {
      line(x, 0, x, height);
      // Do something after the sleep!
      line(0, y, width, y);
    }
    await sleep(1000);
  }
}


// https://davidwalsh.name/javascript-sleep-function

// https://zeit.co/blog/async-and-await
function sleep(time) {
  return new Promise((resolve) => setTimeout(resolve, time));
}
