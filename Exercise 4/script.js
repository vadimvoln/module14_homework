const inputNum = document.querySelector("#number");
const inputQuo = document.querySelector("#quota");
const btn = document.querySelector(".btn");

btn.addEventListener("click", () => {
  if (valid(inputNum.value) === true && valid(inputQuo.value) === true) {
    userRequest();
  } else {
    console.log("одно из чисел вне диапазона от 100 до 300");
  }
});

function valid(n) {
  if (n >= 100 && n <= 300) {
    return true;
  } else {
    return false;
  }
}

function userRequest() {
  return fetch(`https://picsum.photos/${inputNum.value}/${inputQuo.value}`)
    .then((response) => {
      console.log(response);
      return response;
    })
    .then((json) => {
      console.log(json);
    });
}