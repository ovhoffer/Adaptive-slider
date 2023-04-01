const sliderList = document.querySelector('.slider__list');
const buttonPrev = document.querySelector('.buttons__left');
const buttonNext = document.querySelector('.buttons__right');
let width = document.querySelector('.slider__item').clientWidth;
let sliderWidth = document.querySelector('.slider__container').clientWidth;
const sliderContent = document.querySelector('.slider__container');


class Slider {
   constructor(stepWidth = 0) {
      this.position = 0;
      this.step = 0;
      this.stepWidth = stepWidth;
   }
   
   previous() {
      this.position += this.stepWidth;
      this.step--;
      this.newPosition();
   }

   next() {
      this.position -= this.stepWidth;
      this.step++;
      this.newPosition();
   }

   newPosition() {
      if (this.position > 0 || this.position < -2 * width) {
         this.position = 0;
      }
      sliderList.style.marginLeft = this.position + 'px'
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
        console.log('Swiped left');
    }
    
    if (touchendX > touchstartX) {
        console.log('Swiped right');
    }
  
}