export class TextSlider {
	constructor() {
		this.initialize();
	}

	setup() {
		this.$holder = document.getElementsByClassName('m-text-slider')[0];
        this.$body = document.getElementsByTagName('body');
        
        this.$previous = document.getElementsByClassName('m-text-slider__previous')[0];
        this.$next = document.getElementsByClassName('m-text-slider__next')[0];

        this.$slides = document.getElementsByClassName('m-text-slider__slide');

        this.$current = 0;

        this.$offset = 0;

        if (this.$holder) {
            this.$autoSlide = !!this.$holder.getAttribute('data-autoplay');
            if (this.$autoSlide) {
                this.$autoSlideInterval = Number(this.$holder.getAttribute('data-interval-time'));
                this.$interval = setInterval(this.autoSlide.bind(this), this.$autoSlideInterval);
            }
        }
    }
    
    init() {
        this.eventListeners();
    }

	eventListeners() {
        this.$previous.addEventListener('click', () => {
            this.previousSlide();
        });

        this.$next.addEventListener('click', () => {
            this.nextSlide();
        });
    }

    previousSlide() {

        if (this.$current === 0) {
            this.$current = this.$slides.length - 1;
        } else {
            this.$current--;
        }

        this.moveImg();
    }

    nextSlide() {

        if (this.$current === this.$slides.length - 1) {
            this.$current = 0;
        } else {
            this.$current++;
        }

        this.moveImg();
    }

    autoSlide() {

        if (this.$current === this.$slides.length - 1) {
            this.$current = 0;
        } else {
            this.$current++;
        }

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

new TextSlider();

export default TextSlider;
