const input = document.querySelector(".input");
const btn = document.querySelector(".btn");

btn.addEventListener("click", () => {
  if (valid(input.value) === true) {
    useRequest(input.value);
  } else {
    console.log("число вне диапазона от 1 до 10");
  }
});

function valid(a) {
  if (a >= 1 && a <= 10) {
    return true;
  } else {
    return false;
  }
}

function useRequest(a) {
  let xhr = new XMLHttpRequest();
  xhr.open("GET", `https://picsum.photos/v2/list?limit=${a}`);
  xhr.onload = function () {
    if (xhr.status != 200) {
      console.log("Статус ответа: ", xhr.status);
    } else {
      console.log("Результат: ", JSON.parse(xhr.response));
    }
  };
  xhr.onprogress = function (event) {
    console.log(`Загружено ${event.loaded} из ${event.total}`);
  };
  xhr.onerror = function () {
    console.log("Ошибка! Статус ответа: ", xhr.status);
  };
  xhr.send();
}