export default class Tab {
	private module: string;
	private moduleEl: HTMLElement;
	private tabBtn: NodeListOf<HTMLElement>;
	private tabWidth: number;
	private tabMenu: HTMLElement;
	private tabIndicator: HTMLElement;
	private indicator: number;
	private activeTab: number;
	private tabContentSections: NodeListOf<HTMLElement>;

	constructor(module: string) {
		this.module = module;
		this.initialize();
	}

	private setVariables(): void {
		this.moduleEl = document.querySelector(this.module);
		this.tabBtn = document.querySelectorAll('.m-tab__item');
		this.tabWidth = 0;
		this.tabMenu = document.querySelector('.m-tab__menu');
		this.tabIndicator = document.querySelector('.m-tab__indicator');
		this.indicator = 0;
		this.activeTab = 0;
		this.tabIndicator.style.marginLeft = `${this.indicator}px`;
		this.setInitialWidth();
		this.tabContentSections = document.querySelectorAll('.m-tab__content--section');
		this.tabContentSections[0].style.display = 'block';
	}

	private eventListeners(): void {

		for (let x = 0; x < this.tabBtn.length; x++) {

			this.tabBtn[x].addEventListener('click', (e) => {
				let newRound = document.createElement('div');
				newRound.className = 'm-tab__item--circle';
				this.tabBtn[x].appendChild(newRound);

				const posX = e.pageX - this.tabBtn[x].offsetLeft;
				const posY = e.pageY - this.tabBtn[x].offsetTop;

				newRound.style.left = `${posX}px`;
				newRound.style.top = `${posY}px`;
				newRound.className += ' m-tab__item--animation';

				this.activeTab = Number(this.tabBtn[x].getAttribute('data-tab-id')) - 1;

				this.tabIndicator.style.marginLeft = `${this.indicator + (Number(this.tabBtn[x].getAttribute('data-tab-id')) - 1) * this.tabWidth}px`;

				const getSection = this.displayRightText(Number(this.tabBtn[x].getAttribute('data-tab-id')));
				getSection.style.display = 'block';

				setTimeout(() => {
					newRound.remove();
				}, 1000);

			});

		}

		window.addEventListener('resize', () => {
			for (let i = 0; i < this.tabBtn.length; i++) {
				this.tabBtn[i].style.width = `${window.innerWidth / this.tabBtn.length}px`;
			}

			this.tabIndicator.style.width = `${window.innerWidth / this.tabBtn.length}px`;

			this.tabWidth = window.innerWidth / this.tabBtn.length > 150 ? 150 : window.innerWidth / this.tabBtn.length;

			this.tabIndicator.style.marginLeft = `${this.indicator + (Number(this.tabBtn[this.activeTab].getAttribute('data-tab-id')) - 1) * this.tabWidth}px`;
		});

	}

	private setInitialWidth(): void {
		for (let i = 0; i < this.tabBtn.length; i++) {
			this.tabBtn[i].style.width = `${window.innerWidth / this.tabBtn.length}px`;
		}

		this.tabIndicator.style.width = `${window.innerWidth / this.tabBtn.length}px`;

		this.tabWidth = window.innerWidth / this.tabBtn.length > 150 ? 150 : window.innerWidth / this.tabBtn.length;
	}

	private displayRightText(tabId: number): HTMLElement {
		let section;
		for (let i = 0; i < this.tabContentSections.length; i++) {
			const sectionId = Number(this.tabContentSections[i].getAttribute('data-tab-content-id')) as number;
			if (sectionId === tabId) {
				section = this.tabContentSections[i];
			} else {
				this.tabContentSections[i].style.display = 'none';
			}
		}
		return section as HTMLElement;
	}

	private resize(): number {
		return window.innerWidth;
	}

	private initialize(): void {
		this.setVariables();
		if (this.moduleEl) {
			this.eventListeners();
		}
	}
}
