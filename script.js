const sliderList = document.querySelector('.slider__list');
const buttonPrev = document.querySelector('.buttons__left');
const buttonNext = document.querySelector('.buttons__right');
const width = document.querySelector('.slider__item').clientWidth;
const sliderWidth = document.querySelector('.slider__container').clientWidth;
console.log(width)

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
     
      if (this.position > 0 || this.position < -2 * sliderWidth) {
         this.position = 0;
      }
      sliderList.style.marginLeft = this.position + 'px'
   }

}

const slider = new Slider(sliderWidth);
buttonNext.onclick = () => slider.next();
buttonPrev.onclick = () => slider.previous();

window.addEventListener('resize', (e) => {
   sliderList.style.marginLeft = 0;
 });