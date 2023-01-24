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
    if (document.body.querySelector('.testimonial')) document.body.querySelector('.testimonial').remove();
})

burgerCloseBtn.addEventListener('click', (event) => {
    document.querySelector('body').style.overflow = 'visible'
    overlay.style.display = 'none'
    burgerMenu.style.display = 'none'
    event.stopPropagation()
})

const nextSlide = document.querySelector('.animal-card__button-right');
const prevSlide = document.querySelector('.animal-card__button-left');
let cardsList = document.querySelector('.animals-card__list');
let carousel = document.querySelector('.hide-list')

nextSlide.addEventListener('click', () => {
    cardsList = document.querySelector('.animals-card__list');
    cardsList.style.transform = `translateX(${carousel.clientWidth}px)`;
})

prevSlide.addEventListener('click', () => {
    cardsList = document.querySelector('.animals-card__list');
    cardsList.style.transform = `translateX(-${carousel.clientWidth}px)`;
})

carousel.addEventListener('transitionend', (event) => {
    if (event.target.className != 'animals-card__list' || cardsList.children.length < 1) return false;
    let newList = Array.from(cardsList.children).sort(() => 0.5 - Math.random()); 
    cardsList.remove()
    const newCardsList = document.createElement('div');
    newCardsList.className = 'animals-card__list'
    newList.forEach((elem)=> {
        newCardsList.appendChild(elem)
    })
    carousel.append(newCardsList)
})


function createTestimonials() {
    const testimonialsItems = document.querySelectorAll(".testimonials__item")
    const testimonialsList = document.querySelector(".testimonials__list")
    let i = 0;
    while (testimonialsList.children.length != 11) {
        if (i === 4) {
            i = 0
        } else {
            const cloneItem = testimonialsItems[i].cloneNode(true)
            testimonialsList.append(cloneItem)
            i++
        }
    }
} 

createTestimonials()

const elemInput = document.querySelector('.testimonials__scroll input[type="range"]')
const testimonialsList = document.querySelector(".testimonials__list")
let currentTestimonialsValue = elemInput.value

function scrollTestimonials() {
    const elem = document.querySelector('.testimonials__item')
    const gap = parseInt(window.getComputedStyle(testimonialsList).gap, 10)
    if (currentTestimonialsValue > elemInput.value) {
        for (let item of testimonialsList.children) {
            if (item.offsetWidth) {
                item.style.transform += `translateX(${item.offsetWidth + gap}px)`;
                } 
            }
        currentTestimonialsValue--
    } else {
        for (let item of testimonialsList.children) {
            if (item.offsetWidth) {
                item.style.transform += `translateX(-${item.offsetWidth + gap}px)`;
            } 
        }
        currentTestimonialsValue++
    }
}

elemInput.addEventListener('input', scrollTestimonials)


if (window.innerWidth <= 640) {
    testimonialsList.addEventListener('click', (event) => {
        if (!event.target.closest(".testimonials__item")) return false;
        const elem = event.target.closest(".testimonials__item")
        const testimonialHead = elem.children[0].cloneNode(true)
        const testimonialBody = elem.children[1].cloneNode(true)
        testimonialBody.style.overflow = 'visible'
        document.querySelector('body').style.overflow = 'hidden'
        overlay.style.display = 'block'
        const testimonial = document.createElement('div');
        testimonial.className = 'testimonial';
        testimonial.style.cssText = `position:absolute;
                                    top:calc((100vh - 391px) / 2 + ${window.pageYOffset}px);
                                    left:calc((100vw - 267px) / 2);
                                    width:267px;
                                    height:391px;
                                    background:#F1F3F2;
                                    border-radius:20px;
                                    border:2px solid #FE9013;
                                    z-index:997;
                                    overflow:hidden`
        testimonial.append(testimonialHead)
        testimonial.append(testimonialBody)
        document.body.append(testimonial)
    })
}