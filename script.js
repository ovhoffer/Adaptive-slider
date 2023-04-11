const sliderList = document.querySelector('.slider__list');
const buttonPrev = document.querySelector('.buttons__left');
const buttonNext = document.querySelector('.buttons__right');
let width = document.querySelector('.slider__item').clientWidth;
let sliderWidth = document.querySelector('.slider__container').clientWidth;
const sliderContent = document.querySelector('.slider__container');
const sliderIndicators = Array.from(document.querySelectorAll('.indicator__item')); 
const sliderItems = Array.from(document.querySelectorAll('.slider__item'));



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
         n = i;
      })
   }
}





function setPrevNum() {
   if (n <= 0 || n > sliderItems.length - 1) {
      n = 0;
   }
   else {
      n--;
   }
   return n
}

function setNextNum() {
   if (n < 0 || n >= sliderItems.length - 1) {
      n = 0;
   }
   else {
      n++;
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
      if (this.position > 0 || this.position < -(sliderItems.length - 1) * this.stepWidth) {
         this.position = 0;
      }
      sliderList.style.marginLeft = this.position + 'px';
      setIndicator(index)
   }
}

buttonNext.onclick = () => slider.next();
buttonPrev.onclick = () => slider.previous();
window.addEventListener('resize', setSize)
document.addEventListener('DOMContentLoaded', getEvents)


let slider = new Slider(width);

function setSize() {
   sliderList.style.marginLeft = 0;
   setIndicator(0)
   newWidth = document.querySelector('.slider__item').clientWidth;
   n = 0
   slider = new Slider(newWidth); 
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



