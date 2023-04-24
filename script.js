
let width = document.querySelector('.slider__item').clientWidth;



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

      // slider configs :3

      this.indicators = true;
      this.indicatorShape = {
         basic: "../indicators/basic.png",
         active: "../indicators/active.png"
      }
      this.sliderList = document.querySelector('.slider__list');
      this.sliderSpeed = '0.25'
      this.buttonPrev = document.querySelector('.buttons__left');
      this.buttonNext = document.querySelector('.buttons__right');
      this.sliderContent = document.querySelector('.slider__container');
      this.sliderIndicators = Array.from(document.querySelectorAll('.indicator__item'));
      this.sliderItems = Array.from(document.querySelectorAll('.slider__item'));
     // this.width = document.querySelector('.slider__item').clientWidth;
   }

   init() {
      this.buttonNext.onclick = () => this.next();
      this.buttonPrev.onclick = () => this.previous();
      document.addEventListener('DOMContentLoaded', getEvents);
      window.addEventListener('resize', () => {
        // this.stepWidth = document.querySelector('.slider__item').clientWidth;
       
         this.sliderList.style.marginLeft = 0;
         this.n = 0;
         this.position = 0;
         this.step = 0;
         this.stepWidth = document.querySelector('.slider__item').clientWidth;
         this.setIndicator(0)
      });
      if (this.indicators != true) {
         for (let i = 0; i < this.sliderIndicators.length; i++) {
            this.sliderIndicators[i].style.display = 'none';
         }
      }
      this.sliderList.style.transition = `all ${this.sliderSpeed}s ease`;
   }
   
   previous() {
      this.position += this.stepWidth;
      this.step--;
      this.newPosition(this.setPrevNum());
   }

   next() {
      this.position -= this.stepWidth;
      console.log('bib')
      this.step++;
      this.newPosition(this.setNextNum());
   }

   setIndicator(index) {
      for (let a = 0; a < this.sliderIndicators.length; a++) {
         this.sliderIndicators[a].src = this.indicatorShape.basic;
      }
      for (let i = 0; i < this.sliderIndicators.length; i++) {
         if (i === index) {
            this.sliderIndicators[i].src = this.indicatorShape.active;
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
      console.log(this.n)
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
         slider.position = -i * width;
         slider.newPosition(i);
         slider.n = i;
     
      })
   }
}


let slider = new Slider(width);
slider.init()


function setSize() {
   this.stepWidth = document.querySelector('.slider__item').clientWidth;
   this.setIndicator(0)
   this.sliderList.style.marginLeft = 0;
   this.n = 0;

 //slider = new Slider(stepWidth); 
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




