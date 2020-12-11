let mainArray = [0, 1];
let loopCount = 10;

function doAction() {
  let one = mainArray[mainArray.length - 2];
  let two = mainArray[mainArray.length - 1];

  let add = one + two;

  mainArray.push(add);
}

for (let i = 0; i <= loopCount; i++) {
  doAction();
}

console.log(mainArray);
