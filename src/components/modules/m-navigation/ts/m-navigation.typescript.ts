export default class Navigation {
	private module: string;
	private moduleEl: HTMLElement;
	private body: HTMLBodyElement;
	private navBtn: HTMLElement;
	private btnMenu: HTMLElement;
	private navList: HTMLElement;
	private navItem: HTMLElement;
	private navLink: NodeListOf<HTMLElement>;
	private mobileNavIsVisible: boolean;

	constructor(module: string) {
		this.module = module;
		this.initialize();
	}

	private setVariables() {
		this.moduleEl = document.querySelector(this.module);
		this.body = document.querySelector('body');
		this.navBtn = document.querySelector('.o-hamburger');
		this.btnMenu = document.querySelector('.o-hamburger__menu');
		this.navList = document.querySelector('.m-navigation__list');
		this.navItem = document.querySelector('.m-navigation__item');
		this.navLink = document.querySelectorAll('.m-navigation__link');
		this.mobileNavIsVisible = false;
	}

	private eventListeners() {
		this.navBtn.addEventListener('click', (e) => {
			e.preventDefault();
			this.toggleNav();
		});

		for (let i = 0; i < this.navLink.length; i++) {
			this.navLink[i].addEventListener('click', () => {
				this.navBtn.classList.remove('is--active');
				this.navList.classList.remove('is--active');
				this.btnMenu.classList.remove('is--active');
				this.mobileNavIsVisible = false;
			});
		}
	}

	private toggleNav() {
		if (this.mobileNavIsVisible) {
			this.navBtn.classList.remove('is--active');
			this.navList.classList.remove('is--active');
			this.btnMenu.classList.remove('is--active');
			this.body.style.overflowY = '';
			this.mobileNavIsVisible = false;
		} else {
			this.navBtn.classList.add('is--active');
			this.navList.classList.add('is--active');
			this.btnMenu.classList.add('is--active');
			this.body.style.overflowY = 'hidden';
			this.mobileNavIsVisible = true;
		}
	}

	private initialize() {
		this.setVariables();
		if (this.moduleEl) {
			this.eventListeners();
		}
	}
}
