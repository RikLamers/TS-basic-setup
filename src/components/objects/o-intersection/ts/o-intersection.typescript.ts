	export default class Intersection {
	private module: string;
	private moduleEl: HTMLElement;
	private elmToAnimate: NodeListOf<HTMLElement>;

	constructor(module: string) {
		this.module = module;
		this.initialize();
	}

	private setup(): void {
		this.moduleEl = document.querySelector(this.module);
		this.elmToAnimate = document.querySelectorAll('.o-intersection__animation');
	}

	private eventListeners(): void {
		this.checkCompatibility();
	}

	private checkCompatibility(): void {
		if ('IntersectionObserver' in window && 'IntersectionObserverEntry' in window && 'intersectionRatio' in window.IntersectionObserverEntry.prototype) {

			const observer = new IntersectionObserver((entries) => {

				for (let i = 0; i < entries.length; i++) {
					const entry = entries[i];
					const target = entries[i].target as HTMLElement;

					const direction = target.getAttribute('data-direction');

					const duration = target.getAttribute('data-duration') ? target.getAttribute('data-duration') : '2000';

					const delay = target.getAttribute('data-delay') ? target.getAttribute('data-delay') : '0';

					const easing = target.getAttribute('data-ease') ? target.getAttribute('data-ease') : 'ease-out';

					if (entry.isIntersecting) {
						target.style.animation = `animation-${direction} ${duration}ms ${delay}ms forwards ${easing}`;
					}

				}

			});

			for (let x = 0; x < this.elmToAnimate.length; x++) {
				observer.observe(this.elmToAnimate[x]);
			}

		} else {
			// FALLBACK SET EVERY ELEMENTS OPACITY TO 1
			for (let i = 0; i < this.elmToAnimate.length; i++) {
				console.log(this.elmToAnimate[i]);
				this.elmToAnimate[i].style.opacity = '1';
			}
		}
	}

	private initialize(): void {
		this.setup();
		this.eventListeners();
	}
}
