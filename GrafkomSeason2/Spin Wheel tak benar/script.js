let wheel = document.querySelector(".wheel");
let spinBtn = document.querySelector(".spinBtn");
let mode = document.querySelector("#mode");

let addBtn = document.querySelector(".add");
let resetBtn = document.querySelector(".reset");
let applyBtn = document.querySelector(".apply");

let itemContainer = document.querySelector(".item_container");
let itemCounter = document.querySelector(".item_counter");

let color = ["#db7093", "#20b2aa", "#daa520"];

let spinItem = [];

addBtn.onclick = function () {
  let addToWheel = document.querySelector("#add");
  if (addToWheel.value) {
    spinItem.push(addToWheel.value.toUpperCase());
    itemCounter.innerHTML = `Current item : ${spinItem.length}/8`;
    console.log(spinItem);
    addToWheel.value = "";
    itemContainer.innerHTML = spinItem.join(", ");
  }
};

resetBtn.onclick = function () {
  spinItem = [];
  console.log(spinItem);
  itemContainer.innerHTML = "";
  itemCounter.innerHTML = `Current item : ${spinItem.length}/8`;
};

applyBtn.onclick = function () {
  wheel.innerHTML = "";
  let arrItem = spinItem;
  degValue = Math.ceil(360 / arrItem.length);
  if (
    arrItem.length === 8 &&
    arrItem.includes("JACKPOT") &&
    arrItem.includes("ZONK")
  ) {
    for (let i = 0; i < arrItem.length; i++) {
      console.log("Item : ", arrItem[i]);
      console.log("Deg Value : ", degValue);
      const indexColor = i % 3;
      const itemColor = color[indexColor];

      let newItemElement = document.createElement("div");
      newItemElement.className = "number";
      newItemElement.style.setProperty("--i", i + 1);
      newItemElement.style.setProperty("--clr", itemColor);
      newItemElement.style.transform = `rotate(${degValue * i}deg)`;
      newItemElement.innerHTML = `<span>${arrItem[i]}</span>`;

      wheel.appendChild(newItemElement);
    }
    spinItem = [];
  } else if (arrItem.length !== 8) {
    alert("Total item harus 8");
  } else {
    alert("Harus ada ZONK dan JACKPOT pada wheel");
  }
};

spinBtn.onclick = function () {
  let selectedMode = mode.value;
  let value;
  if (selectedMode === "random") {
    value = Math.ceil(Math.random() * 3600);
    wheel.style.transform = "rotate(" + value + "deg)";
    value += Math.ceil(Math.random() * 3600);
  } else if (selectedMode === "jackpot") {
    // let jackpotLocation =
    value = Math.ceil(0.269 * 360);
    wheel.style.transform = "rotate(" + value + "deg)";
    value += Math.ceil(1 * 3600);
  } else {
    value = Math.ceil(0.58 * 360);
    wheel.style.transform = "rotate(" + value + "deg)";
    value += Math.ceil(1 * 3600);
  }
  //   wheel.style.transform = "rotate(" + value + "deg)";
  console.log(selectedMode);
  //   value += Math.ceil(1 * 3600);
  mode.value = "random";
};
