const sliderList = document.querySelector('.slider__list');
const buttonPrev = document.querySelector('.buttons__left');
const buttonNext = document.querySelector('.buttons__right');
let width = document.querySelector('.slider__item').clientWidth;
let sliderWidth = document.querySelector('.slider__container').clientWidth;
const sliderContent = document.querySelector('.slider__container');


const sliderIndicators = Array.from(document.querySelectorAll('.indicator__item')); 
const sliderItems = Array.from(document.querySelectorAll('.slider__item'));

// console.log(sliderItems[0].getBoundingClientRect().left);

//  console.log(sliderItems[2].getBoundingClientRect().left + 'third');
// console.log(sliderItems[0].getBoundingClientRect().left + 'first');
//  console.log(sliderItems[1].getBoundingClientRect().left + 'sec');
// document.addEventListener('DOMContentLoaded', setIndicator)
//console.log(activeIndivator);
//sliderIndicators[0].classList.add('indicator__active')
function setIndicator(index) {
   for (let a = 0; a < sliderIndicators.length; a++) {
      sliderIndicators[a].classList.remove('indicator__active')
   }
   for (let i = 0; i < sliderIndicators.length; i++) {
      if (i === index) {
         sliderIndicators[i].classList.add('indicator__active')
      }
   }
}

let n = 0;
let m = 0;


function getEvents() {
   for (let i = 0; i < sliderIndicators.length; i++) {
      sliderIndicators[i].addEventListener('click', () => {
         slider.position = -i * width;
         slider.newPosition(i);
         console.log(i)
         n = i;
      })
   }
}

getEvents();


function setPrevNum() {
   if (n <= 0 || n > sliderItems.length - 1) {
      n = 0;
   }
   else {
      n--;
      console.log(n)
   }
   return n
}

function setNextNum() {
   if (n < 0 || n >= sliderItems.length - 1) {
      n = 0;
   }
   else {
      n++;
      console.log(n)
   }
 return n
}



class Slider {
   constructor(stepWidth = 0) {
      this.position = 0;
      this.step = 0;
      this.stepWidth = stepWidth;
   }
   
   previous() {
      this.position += this.stepWidth;
      this.step--;
      this.newPosition(setPrevNum());
   }

   next() {
      this.position -= this.stepWidth;
      this.step++;
      this.newPosition(setNextNum());
   }

   newPosition(n) {
      let index = n;
      if (this.position > 0 || this.position < -2 * width) {
         this.position = 0;
      }
      sliderList.style.marginLeft = this.position + 'px';
      setIndicator(index)
   }


}

window.addEventListener('resize', (e) => {
   setSize();
 })


buttonNext.onclick = () => slider.next();
buttonPrev.onclick = () => slider.previous();


let slider = new Slider(width);

function setSize() {
   sliderList.style.marginLeft = 0 + 'px'
   width = document.querySelector('.slider__item').clientWidth;
   sliderWidth = document.querySelector('.slider__container').clientWidth; 
   slider = new Slider(width);
}

let touchstartX = 0;
let touchstartY = 0;
let touchendX = 0;
let touchendY = 0;


sliderContent.addEventListener('touchstart', function(event) {
    touchstartX = event.changedTouches[0].screenX;
    touchstartY = event.changedTouches[0].screenY;
}, false);

sliderContent.addEventListener('touchend', function(event) {
    touchendX = event.changedTouches[0].screenX;
    touchendY = event.changedTouches[0].screenY;
    handleGesture();
}, false); 

function handleGesture() {
   if (touchendX < touchstartX) {
      slider.next();
      
    }
    
    else if (touchendX > touchstartX) {
      slider.previous();
    }
}



