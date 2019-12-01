export default class Slider {
	private module: string;
	private moduleEl: HTMLElement;
	private previous: HTMLElement;
	private next: HTMLElement;
	private slides: NodeListOf<HTMLElement>;
	private dotList: HTMLElement;
	private dots: NodeListOf<HTMLElement> | null;
	private current: number;
	private offset: number;
	private autoSlide: boolean;
	private autoSlideInterval: number;
	private interval: any;

	constructor(module: string) {
		this.module = module;
		this.initialize();
	}

	private setVariables(): void {
		this.moduleEl = document.querySelector(this.module);
		this.previous = document.querySelector('.m-slider__previous');
		this.next = document.querySelector('.m-slider__next');
		this.slides = document.querySelectorAll('.m-slider__slide');
		this.dotList = document.querySelector('.m-slider__dotlist');
		this.dots = null;
		this.current = 0;
		this.offset = 4;

		if (this.moduleEl) {
			this.autoSlide = !!this.moduleEl.getAttribute('data-autoplay');
			if (this.autoSlide) {
				this.autoSlideInterval = Number(this.moduleEl.getAttribute('data-interval-time'));
				this.interval = setInterval(this.autoSlideFunc.bind(this), this.autoSlideInterval);
			}
		}

	}

	private init(): void {
		for (let i = 0; i < this.slides.length; i++) {
			const dot = document.createElement('li') as HTMLElement;
			dot.setAttribute('class', 'm-slider__dot');
			this.dotList.appendChild(dot);
		}

		this.dots = document.querySelectorAll('.m-slider__dot');
		this.dots[this.current].classList.add('is--active');
		this.eventListeners();
	}

	private eventListeners(): void {
		this.previous.addEventListener('click', () => {
			this.previousSlide();
		});

		this.next.addEventListener('click', () => {
			this.nextSlide();
		});

		for (let i = 0; i < this.dots.length; i++) {
			this.dots[i].addEventListener('click', () => {
				this.jumpToSlide(i);
			});
		}
	}

	private previousSlide(): void {
		this.dots[this.current].classList.remove('is--active');

		if (this.current === 0) {
			this.current = this.dots.length - 1;
		} else {
			this.current--;
		}

		this.dots[this.current].classList.add('is--active');

		this.moveImg();
	}

	private nextSlide(): void {
		this.dots[this.current].classList.remove('is--active');

		if (this.current === this.dots.length - 1) {
			this.current = 0;
		} else {
			this.current++;
		}

		this.dots[this.current].classList.add('is--active');

		this.moveImg();
	}

	private jumpToSlide(i: number): void {
		this.dots[this.current].classList.remove('is--active');

		this.current = i;

		this.dots[this.current].classList.add('is--active');

		this.moveImg();
	}

	private autoSlideFunc(): void {
		this.dots[this.current].classList.remove('is--active');

		if (this.current === this.dots.length - 1) {
			this.current = 0;
		} else {
			this.current++;
		}

		this.dots[this.current].classList.add('is--active');

		this.moveImg();
	}

	private moveImg(): void {
		for (let i = 0; i < this.slides.length; i++) {
			this.slides[i].style.transform = `translateX(-${(this.slides[0].clientWidth * this.current) + (this.offset * this.current)}px)`;
		}
	}

	private initialize() {
		this.setVariables();
		if (this.moduleEl) {
			this.init();
		}
	}
}
