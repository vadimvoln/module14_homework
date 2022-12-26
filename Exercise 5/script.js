// .form__input--error - обводка ошибки
// .form__error - ошибка блок

const form = document.querySelector('form'),
      errorArray = ['Поле не должно быть пустым', 'Нужно вводить только цифры от 1 до 10', 'Номер страницы вне диапазона от 1 до 10', 'Лимит вне диапазона от 1 до 10'];
let wrapperContent = document.querySelector('.wrapper-content');

form.addEventListener('submit', function(e) {
    e.preventDefault();
    validateInput(this.querySelectorAll('input'));
});

document.addEventListener('DOMContentLoaded', function() {
    let arr = JSON.parse(localStorage.getItem('storagePhoto'));
    (arr) ? renderPost(arr) : false;
})

async function validateInput(arr) {
    let errorArr = true;
    deleteMessageError();
    deleteClassError();
    arr.forEach((el, index) => {
        
        if(el.value ==  '') {
            addMessageError(el, errorArray[0]);
            addClassError(el); 
            errorArr = false;
        }

        if(!Number.isInteger(+el.value) && el.value !== '') {
            addMessageError(el, errorArray[1]);
            addClassError(el); 
            errorArr = false;
        }

        if(index == 0 && (el.value < 1 || el.value > 10)) {
            addMessageError(el, errorArray[2]);
            addClassError(el); 
            errorArr = false;
        }

        if(index == 1 && (el.value < 1 || el.value > 10)) {
            addMessageError(el, errorArray[3]);
            addClassError(el); 
            errorArr = false;
        }
    });


    let fetchResult = null;
    if(errorArr) {
        fetchResult = await fetchGetData(`https://picsum.photos/v2/list?page=${arr[0].value}&limit=${arr[1].value}`)
        savePhotoLocalStorage(fetchResult);
        renderPost(fetchResult);
    } else {
        return false;
    }
}

function addMessageError(input, message) {
    input.insertAdjacentHTML('afterend', `<div class="form__error">${message}</div>`);
}

function addClassError(input) {
    input.classList.add('form__input--error');
}

function deleteMessageError() {
    document.querySelectorAll('.form__error').forEach(el => el.remove());
}

function deleteClassError() {
    form.querySelectorAll('input').forEach(el => el.classList.remove('form__input--error'));
}

function fetchGetData(url) {
    return fetch(url)
            .then(result => result.json())
}

function renderPost(arr) {
    let ul = document.createElement('ul');
    ul.classList.add('gallery-items');
    let liElem = '';

    arr.forEach(el => {
        liElem += `
        <li class="gallery-item">
            <div class="gallery-wrapper">
                <h2 class="gallery-title">
                ${el.author}
                </h2>
                <img src="${el.download_url}" alt="${el.author}" width="${el.width}" height="${el.height}" class="gallery-big-photo">
            </div>
        </li>
        `;
    });

    ul.innerHTML = liElem;
    wrapperContent.innerHTML = '';
    wrapperContent.append(ul);
}

function savePhotoLocalStorage(arr) {
    localStorage.setItem('storagePhoto', JSON.stringify(arr));
}