export class Hamburger {
	constructor() {
		this.initialize();
	}

	setup() {
        this.$holder = document.getElementsByClassName('o-hamburger');
		this.$body = document.getElementsByTagName('body');
	}

	eventListeners() {
		for (let x = 0; x < this.$holder.length; x++) {
			this.$holder[x].addEventListener('click', (e) => {
				e.preventDefault();
				const children = this.$holder[x].children;
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

	initialize() {
		this.setup();
		this.eventListeners();
	}
}

new Hamburger();
