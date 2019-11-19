export class Slider {
	constructor() {
		this.initialize();
	}

	setup() {
		this.$holder = document.getElementsByClassName('m-slider')[0];
        this.$body = document.getElementsByTagName('body');
        
        this.$previous = document.getElementsByClassName('m-slider__previous')[0];
        this.$next = document.getElementsByClassName('m-slider__next')[0];

        this.$slides = document.getElementsByClassName('m-slider__slide');

        this.$dotlist = document.getElementsByClassName('m-slider__dotlist')[0];
        this.$dots = null;

        this.$current = 0;

        this.$offset = 4;

        if (this.$holder) {
            this.$autoSlide = !!this.$holder.getAttribute('data-autoplay');
            if (this.$autoSlide) {
                this.$autoSlideInterval = Number(this.$holder.getAttribute('data-interval-time'));
                this.$interval = setInterval(this.autoSlide.bind(this), this.$autoSlideInterval);
            }
        }
    }
    
    init() {
        for (let i = 0; i < this.$slides.length; i++) {
            const dot = document.createElement('li');

            dot.setAttribute('class', 'm-slider__dot');
            this.$dotlist.appendChild(dot);
        }

        this.$dots = document.getElementsByClassName('m-slider__dot');
        this.$dots[this.$current].classList.add('is--active');
        this.eventListeners();
    }

	eventListeners() {
        this.$previous.addEventListener('click', () => {
            this.previousSlide();
        });

        this.$next.addEventListener('click', () => {
            this.nextSlide();
        });

        for (let i = 0; i < this.$dots.length; i++) {
            this.$dots[i].addEventListener('click', () => {
                this.jumpToSlide(i);
            });
        }
    }

    previousSlide() {
        this.$dots[this.$current].classList.remove('is--active');

        if (this.$current === 0) {
            this.$current = this.$dots.length - 1;
        } else {
            this.$current--;
        }

        this.$dots[this.$current].classList.add('is--active');

        this.moveImg();
    }

    nextSlide() {
        this.$dots[this.$current].classList.remove('is--active');

        if (this.$current === this.$dots.length - 1) {
            this.$current = 0;
        } else {
            this.$current++;
        }

        this.$dots[this.$current].classList.add('is--active');

        this.moveImg();
    }

    jumpToSlide(i) {
        this.$dots[this.$current].classList.remove('is--active');

        this.$current = i;

        this.$dots[this.$current].classList.add('is--active');

        this.moveImg();
    }

    autoSlide() {
        this.$dots[this.$current].classList.remove('is--active');

        if (this.$current === this.$dots.length - 1) {
            this.$current = 0;
        } else {
            this.$current++;
        }

        this.$dots[this.$current].classList.add('is--active');

        this.moveImg();
    }

    moveImg() {
        for (let i = 0; i < this.$slides.length; i ++) {
            this.$slides[i].style.transform = `translateX(-${(this.$slides[0].clientWidth * this.$current) + (this.$offset * this.$current)}px)`;
        }
    }

	initialize() {
        this.setup();
        if (this.$holder) {
            this.init();
        }
	}
}

new Slider();
