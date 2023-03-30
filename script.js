const sliderList = document.querySelector('.slider__list');
const buttonPrev = document.querySelector('.buttons__left');
const buttonNext = document.querySelector('.buttons__right');
let width = document.querySelector('.slider__item').clientWidth;
let sliderWidth = document.querySelector('.slider__container').clientWidth;



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

let slider = new Slider(width)

function setSize() {
   sliderList.style.marginLeft = 0 + 'px'
   width = document.querySelector('.slider__item').clientWidth;
   sliderWidth = document.querySelector('.slider__container').clientWidth; 
   slider = new Slider(width);
}