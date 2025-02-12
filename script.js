let arrItem = {
  "id-1": 1,
  "id-2": 2,
  "id-3": 3,
  "id-4": 4,
  "id-5": 5,
  "id-6": 6,
  "id-7": 1,
  "id-8": 2,
  "id-9": 3,
  "id-10": 4,
  "id-11": 5,
  "id-12": 6,
};
const arrEntries = Object.entries(arrItem);

function shuffleArray(array) {
  // Перемешиваем массив пар
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

const newGame = document.querySelector(".button");
const counter = document.querySelector(".counter");
let counterElem = 0;

newGame.addEventListener("click", function () {
  shuffleArray(arrEntries);
  arrItem = Object.fromEntries(arrEntries); // перезаписываем новый объект из перемешанного массива пар
  setTimeout(() => {
    createDivsFromArray(arrItem);
  }, 500);
  counter.textContent = `Number of Turns: ${counterElem = 0}`;
  let closedItem = [...document.querySelectorAll(".item__close")];
  let opentedItem = [...document.querySelectorAll(".item__open")]
  filterCard(closedItem, opentedItem)
});
function filterCard (close, open){
  if(close){
    close.filter(item => {
      if(item.classList.contains("item__close-hover")){
        item.classList.remove("item__close-hover")
      }
    })
  }
  if(open){
    open.filter(item => {
      if(item.classList.contains("item__open-hover")){
        item.classList.remove("item__open-hover")
      }
    })
  }
 
}


function createDivsFromArray(arr) {
  const row = document.querySelector(".row");
  // Очищаем содержимое row перед созданием новых div-ов

  row.innerHTML = "";
  for (const key in arr) {
    const div = document.createElement("div");
    const element = arr[key];
    div.className = `item`;
    div.id = `${key}`;
    div.innerHTML = `<div class="item__open item-open-id-${element}" id="item-${element}"></div>
                    <div class="item__close""></div>`;
    itemClick(div);
    row.appendChild(div);
  }
}

createDivsFromArray(arrItem);

let checkArr = [];

function itemClick(elem) {
  let closeItem = elem.querySelector(".item__close");
  let openItem = elem.querySelector(".item__open");
  elem.addEventListener("click", function () {
    let itemParentId = elem.id;
    if (openItem.classList.contains("item__open-hover")) {
      counterElem;
    } else {
      counterElem++;
      counter.textContent = `Number of Turns: ${counterElem}`;
    }
    if (checkArr.length < 3) {
      if (openItem.classList.contains("item__open-hover")) {
        return;
      }
      if (checkArr.includes(openItem.id)) {
        closeItem.classList.add("item__close-hover");
        openItem.classList.add("item__open-hover");
        checkArr = [];
      } else if (!checkArr.includes(openItem.id) && checkArr.length === 2) {
        closeItem.classList.add("item__close-hover");
        openItem.classList.add("item__open-hover");
        const id1 = checkArr[1];
        if (checkArr[0] !== openItem.id) {
          setTimeout(() => {
            const elem1 = document.getElementById(id1);
            const closeItem1 = elem1.querySelector(".item__close");
            const opentedItem1 = elem1.querySelector(".item__open");
            if (closeItem1 && opentedItem1) {
              closeItem1.classList.remove("item__close-hover");
              opentedItem1.classList.remove("item__open-hover");
            }
            closeItem.classList.remove("item__close-hover");
            openItem.classList.remove("item__open-hover");
          }, 800);
          checkArr = [];
        }
      } else {
        checkArr.push(openItem.id);
        checkArr.push(itemParentId);
        closeItem.classList.add("item__close-hover");
        openItem.classList.add("item__open-hover");
      }
    }
  });
}
