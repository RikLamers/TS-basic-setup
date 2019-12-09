export default class Hamburger {
	private module: string;
	private moduleEl: NodeListOf<HTMLElement>;

	constructor(module: string) {
		this.module = module;
		this.initialize();
	}

	private setup(): void {
		this.moduleEl = document.querySelectorAll(this.module);
	}

	private eventListeners(): void {
		for (let x = 0; x < this.moduleEl.length; x++) {
			this.moduleEl[x].addEventListener('click', (e) => {
				e.preventDefault();
				const children = this.moduleEl[x].children;
				for (let i = 0; i < children.length; i++) {
					if (children[i].classList.contains('o-hamburger__menu') && children[i].classList.contains('is--active')) {
						children[i].classList.remove('is--active');
					} else if (children[i].classList.contains('o-hamburger__menu')) {
						children[i].classList.add('is--active');
					}
				}
			});
		}
	}

	private initialize(): void {
		this.setup();
		this.eventListeners();
	}
}
