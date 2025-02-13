// создаем объект карт
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

// преобразуем объкет в массив для перемешивания
const arrEntries = Object.entries(arrItem);

// Перемешиваем массив пар
function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

const newGame = document.querySelector(".button");
const counter = document.querySelector(".counter");
let counterElem = 0;

// нажимаем на button "New Game"
newGame.addEventListener("click", function () {
  // вызываем функцию перемешивания
  shuffleArray(arrEntries);

  // перезаписываем новый объект из перемешанного массива пар
  arrItem = Object.fromEntries(arrEntries);

  // обновляем счетчик
  counter.textContent = `Number of Turns: ${(counterElem = 0)}`;

  let closedItem = [...document.querySelectorAll(".item__close")];
  let opentedItem = [...document.querySelectorAll(".item__open")];

  // закрываем открытые картинки если открыты
  closedItem.filter((item) => {
    if (item.classList.contains("item__close-hover")) {
      item.classList.remove("item__close-hover");
    }
  });
  opentedItem.filter((item) => {
    if (item.classList.contains("item__open-hover")) {
      item.classList.remove("item__open-hover");
    }
  });

  // с содержкой вызываем функцию обновления основного DIVa с картинками
  setTimeout(() => {
    createDivsFromArray(arrItem);
  }, 500);
});

// функцию обновления основного DIVa с картинками
function createDivsFromArray(arr) {
  // Очищаем содержимое row перед созданием новых div-ов
  const row = document.querySelector(".row");
  row.innerHTML = "";

  // создаем новые Divs c картинками
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

// вызываем функцию с defolt с значениями
createDivsFromArray(arrItem);

// Массив для сравнения
let checkArr = [];

// функция по нажатию на картинку
function itemClick(elem) {
  let closeItem = elem.querySelector(".item__close");
  let openItem = elem.querySelector(".item__open");

  // обработчик события
  elem.addEventListener("click", function () {
    let itemParentId = elem.id;

    // если картинка уже открыта счетчик на увеличивается
    if (openItem.classList.contains("item__open-hover")) {
      counterElem;
    } else {
      counterElem++;
      counter.textContent = `Number of Turns: ${counterElem}`;
    }

    if (checkArr.length < 3) {
      // по нажатию на картинку, если она открыта то мы возвращаем bollean значение вместо его id
      if (openItem.classList.contains("item__open-hover")) {
        return;
      }

      // вызываем функцию второй раз - если в массиве 'checkArr' есть карта по похожим id то переварачиваем карту
      if (checkArr.includes(openItem.id)) {
        closeItem.classList.add("item__close-hover");
        openItem.classList.add("item__open-hover");

        // и обноваляем массив 'checkArr'
        checkArr = [];
      } 

      // если же 2ой карты с похожим id нет в массиве то закрываем краты
      else if (!checkArr.includes(openItem.id) && checkArr.length === 2) {

        // открываем 2ую карту
        closeItem.classList.add("item__close-hover");
        openItem.classList.add("item__open-hover");

        // находим 1ую карту 
        const id1 = checkArr[1];
        if (checkArr[0] !== openItem.id) {

          // выполняем закрытие не 1ой и 2ой карты с соддержкой 
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

          // очищаем массив "checkArr"
          checkArr = [];
        }
      }

      // вызываем функцию первый раз - если в массиве 'checkArr' нет id то добвляем его id в 'checkArr'
      else {
        checkArr.push(openItem.id);
        checkArr.push(itemParentId);
        closeItem.classList.add("item__close-hover");
        openItem.classList.add("item__open-hover");
      }
    }
  });
}
