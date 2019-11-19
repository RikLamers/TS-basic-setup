export class Navigation {
	constructor() {
		this.initialize();
	}

	setup() {
		this.$holder = document.getElementsByClassName('m-navigation')[0];
		this.$body = document.getElementsByTagName('body')[0];
		this.$main = document.getElementsByTagName('main');
		this.$nav = this.$holder;
		this.$navButton = document.getElementsByClassName('o-hamburger')[0];
		this.$btnMenu = document.getElementsByClassName('o-hamburger__menu')[0];
		this.$navList = document.getElementsByClassName('m-navigation__list')[0];
		this.$navItem = document.getElementsByClassName('m-navigation__item')[0];
		this.$navLink = document.getElementsByClassName('m-navigation__link');
		this.$mobileNavIsVisibile = false;

	}

	eventListeners() {
		this.$navButton.addEventListener('click', (e) => {
			e.preventDefault();
			this.toggleNav();
		});

		for (let i = 0; i < this.$navLink.length; i++) {
			this.$navLink[i].addEventListener('click', () => {
				this.$navButton.classList.remove('is--active');
				this.$navList.classList.remove('is--active');
				this.$btnMenu.classList.remove('is--active');
				this.$mobileNavIsVisibile = false;
			});
		}
	}

	toggleNav() {
		if (this.$mobileNavIsVisibile) {
			this.$navButton.classList.remove('is--active');
			this.$body.style.overflowY = '';
			this.$mobileNavIsVisibile = false;
			this.$navList.classList.remove('is--active');

		} else {
			this.$navButton.classList.add('is--active');
			this.$body.style.overflowY = 'hidden';
			this.$mobileNavIsVisibile = true;
			this.$navList.classList.add('is--active');
		}
	}

	initialize() {
		this.setup();
		this.eventListeners();
	}
}

new Navigation();
