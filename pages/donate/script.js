const burgerBtn = document.body.querySelector('.burger')
const burgerMenu = document.body.querySelector('.burger__menu')
const overlay = document.body.querySelector('.overlay')
const burgerCloseBtn = document.body.querySelector('.burger__close-btn')

burgerBtn.addEventListener('click', () => {
    document.querySelector('body').style.overflow = 'hidden'
    overlay.style.display = 'block'
    burgerMenu.style.display = 'block'
})

overlay.addEventListener('click', () => {
    document.querySelector('body').style.overflow = 'visible'
    overlay.style.display = 'none'
    burgerMenu.style.display = 'none'
})

burgerCloseBtn.addEventListener('click', (event) => {
    document.querySelector('body').style.overflow = 'visible'
    overlay.style.display = 'none'
    burgerMenu.style.display = 'none'
    event.stopPropagation()
})


const progressBar = document.querySelector('.progress-bar')
const imgPosition = document.querySelector('.progress-bar__icon')

for (let item of document.querySelectorAll('.price')) {
    if (item.innerHTML === "100") {
        imgPosition.style.transform = `translateX(${item.closest('.progress-bar__button').offsetLeft - 12}px)`
        const price = item.querySelector('.price')
        item.classList.add('active')
    }
}


function selectPoint(event) {
    if (!event.target.closest('.progress-bar__button')) return false;
    for (let item of document.querySelector(".progress-bar__background").children) {
        if(item.querySelector('.price')) item.querySelector('.price').className = 'price'
    }
    const point = event.target.closest('.progress-bar__button')
    const price = point.querySelector('.price')
    price.classList.add('active')
    const imgPosition = document.querySelector('.progress-bar__icon')
    imgPosition.style.transform = `translateX(${point.offsetLeft-12}px)`
    const progressBarInput = document.querySelector('.progress-bar__input input[type="number"]')
    progressBarInput.value = price.innerHTML
}

const progressBarInput = document.querySelector('.progress-bar__input input[type="number"]')

function setFeedValue() {
    let selectElem
    for (let value of document.querySelectorAll('.price')) {
        if (value.innerHTML == progressBarInput.value) {
            imgPosition.style.transform = `translateX(${value.closest('.progress-bar__button').offsetLeft - 12}px)`
            selectElem = value.closest('.progress-bar__button').querySelector('.price')
        }
    }
    for (let item of document.querySelector(".progress-bar__background").children) {
        if(item.querySelector('.price')) item.querySelector('.price').className = 'price'
    }
    selectElem.classList.add('active')
}

progressBar.addEventListener('click', selectPoint)
progressBarInput.addEventListener('input', setFeedValue) 