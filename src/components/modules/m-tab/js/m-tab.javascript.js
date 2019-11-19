export class Tab {
	constructor() {
		this.initialize();
	}

	setup() {
		this.$holder = document.getElementsByClassName('m-tab')[0];
		this.$body = document.getElementsByTagName('body');
		if (this.$holder) {
			// Menu elements
			this.$tabBtn = document.getElementsByClassName('m-tab__item');
			this.$tabBtnWidth = 0;
			this.$tabMenu = document.getElementsByClassName('m-tab__menu')[0];
			this.$tabIndicator = document.getElementsByClassName('m-tab__indicator')[0];
			this.$indicator = 0;
			this.$activeTab = 0;
			this.$tabIndicator.style.marginLeft = `${this.$indicator}px`;
			this.setInitialWidth();

			// Content elements
			this.$tabContentSections = document.getElementsByClassName('m-tab__content--section');
			this.$tabContentSections[0].style.display = 'block';
		}
	}

	eventListeners() {

		for (let x = 0; x < this.$tabBtn.length; x++) {

			this.$tabBtn[x].addEventListener('click', (e) => {
				let newRound = document.createElement('div');
				newRound.className = 'm-tab__item--circle';
				this.$tabBtn[x].appendChild(newRound);

				const posX = e.pageX - this.$tabBtn[x].offsetLeft;
				const posY = e.pageY - this.$tabBtn[x].offsetTop;

				newRound.style.left = `${posX}px`;
				newRound.style.top = `${posY}px`;
				newRound.className += ' m-tab__item--animation';

				this.$activeTab = this.$tabBtn[x].getAttribute('data-tab-id') -1;

				this.$tabIndicator.style.marginLeft = `${this.$indicator + (this.$tabBtn[x].getAttribute('data-tab-id') -1) * this.$tabBtnWidth}px`;

				const getSection = this.displayRightText(this.$tabBtn[x].getAttribute('data-tab-id'));
				getSection.style.display = 'block';

				setTimeout(() => {
					newRound.remove();
				}, 1000);

			});

		}

		window.addEventListener('resize', () => {
			for (let i = 0; i < this.$tabBtn.length; i++) {
				this.$tabBtn[i].style.width = `${window.innerWidth / this.$tabBtn.length}px`;
			}

			this.$tabIndicator.style.width = `${window.innerWidth / this.$tabBtn.length}px`;

			this.$tabBtnWidth = window.innerWidth / this.$tabBtn.length > 150 ? 150 : window.innerWidth / this.$tabBtn.length;

			this.$tabIndicator.style.marginLeft = `${this.$indicator + (this.$tabBtn[this.$activeTab].getAttribute('data-tab-id') -1) * this.$tabBtnWidth}px`;
		});

	}

	setInitialWidth() {
		for (let i = 0; i < this.$tabBtn.length; i++) {
			this.$tabBtn[i].style.width = `${window.innerWidth / this.$tabBtn.length}px`;
		}

		this.$tabIndicator.style.width = `${window.innerWidth / this.$tabBtn.length}px`;

		this.$tabBtnWidth = window.innerWidth / this.$tabBtn.length > 150 ? 150 : window.innerWidth / this.$tabBtn.length;
	}

	displayRightText(tabId) {
		let section;
		for (let i = 0; i < this.$tabContentSections.length; i++) {
			const sectionId = this.$tabContentSections[i].getAttribute('data-tab-content-id');
			if (sectionId === tabId) {
				section = this.$tabContentSections[i];
			} else {
				this.$tabContentSections[i].style.display = 'none';
			}
		}
		return section;
	}

	resize() {
		return window.innerWidth;
	}

	initialize() {
		this.setup();
		if (this.$holder) {
			this.eventListeners();
		}
	}
}

new Tab();
