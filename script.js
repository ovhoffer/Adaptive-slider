const sliderList = document.querySelector('.slider__list');
const buttonPrev = document.querySelector('.buttons__left');
const buttonNext = document.querySelector('.buttons__right');
let width = document.querySelector('.slider__item').clientWidth;
let sliderWidth = document.querySelector('.slider__container').clientWidth;
const sliderContent = document.querySelector('.slider__container');
const sliderIndicators = Array.from(document.querySelectorAll('.indicator__item')); 
const sliderItems = Array.from(document.querySelectorAll('.slider__item'));





class Slider {
   constructor(stepWidth = 0) {
      this.n = 0;
      this.position = 0;
      this.step = 0;
      this.stepWidth = stepWidth;
      this.touchstartX = 0;
      this.touchstartY = 0;
      this.touchendX = 0;
      this.touchendY = 0;
   }

   init() {
      buttonNext.onclick = () => this.next();
      buttonPrev.onclick = () => this.previous();
      window.addEventListener('resize', setSize)
      document.addEventListener('DOMContentLoaded', getEvents);
      // select main track of slider
      this.sliderList = document.querySelector('.slider__list');
      // select controllers
      this.buttonPrev = document.querySelector('.buttons__left');
      this.buttonNext = document.querySelector('.buttons__right');
      // select width of slider
      this.width = document.querySelector('.slider__item').clientWidth;
      this.sliderWidth = document.querySelector('.slider__container').clientWidth;
      this.sliderContent = document.querySelector('.slider__container');
      this.sliderIndicators = Array.from(document.querySelectorAll('.indicator__item')); 
      this.sliderItems = Array.from(document.querySelectorAll('.slider__item'));
   }
   
   previous() {
      this.position += this.stepWidth;
      this.step--;
      this.newPosition(this.setPrevNum());
   }

   next() {
      this.position -= this.stepWidth;
      this.step++;
      this.newPosition(this.setNextNum());
   }

   setIndicator(index) {
      for (let a = 0; a < this.sliderIndicators.length; a++) {
         this.sliderIndicators[a].classList.remove('indicator__active')
      }
      for (let i = 0; i < this.sliderIndicators.length; i++) {
         if (i === index) {
            this.sliderIndicators[i].classList.add('indicator__active')
         }
      }
   }

   
   setPrevNum() {
      if (this.n <= 0 || this.n > this.sliderItems.length - 1) {
         this.n = 0;
      }
      else {
         this.n--;
      }
      
      return this.n
   }

   setNextNum() {
      if (this.n < 0 || this.n >= this.sliderItems.length - 1) {
         this.n = 0;
      }
      else {
         this.n++;
      }
      return this.n
      }

   
   newPosition(n) {
      let index = n;
      if (this.position > 0 || this.position < -(this.sliderItems.length - 1) * this.stepWidth) {
         this.position = 0;
      }
      this.sliderList.style.marginLeft = this.position + 'px';
      this.setIndicator(index)
   }
   

    handleGesture() {
      if (this.touchendX < this.touchstartX) {
         this.next();
         
       }
       
       else if (this.touchendX > this.touchstartX) {
         this.previous();
      }
      else if (this.touchendY == this.touchstartY) {
         
      }
   }
   

}


function getEvents() {
   for (let i = 0; i < slider.sliderIndicators.length; i++) {
      slider.sliderIndicators[i].addEventListener('click', () => {
         slider.position = -i * slider.width;
         slider.newPosition(i);
         slider.n = i;
     
      })
   }
}


let slider = new Slider(width);
slider.init()


function setSize() {
   slider.sliderList.style.marginLeft = 0;
   slider.setIndicator(0)
   slider.newWidth = document.querySelector('.slider__item').clientWidth;
   slider.n = 0
   slider = new Slider(newWidth); 
}

slider.sliderContent.addEventListener('touchstart', function(event) {
   slider.touchstartX = event.changedTouches[0].screenX;
   slider.touchstartY = event.changedTouches[0].screenY;
}, false);

slider.sliderContent.addEventListener('touchend', function(event) {
    slider.touchendX = event.changedTouches[0].screenX;
    slider.touchendY = event.changedTouches[0].screenY;
    slider.handleGesture();
}, false); 




