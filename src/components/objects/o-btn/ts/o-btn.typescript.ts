export default class Btn {
	private module: string;
	private moduleEl: HTMLElement;
	private allBtn: NodeListOf<HTMLElement>;

	constructor(module: string) {
		this.module = module;
		this.initialize();
	}

	private setVariables(): void {
		this.moduleEl = document.querySelector(this.module);
		this.allBtn = document.querySelectorAll('.o-btn');
	}

	private eventListeners(): void {
		for (let i = 0; i < this.allBtn.length; i++) {
			this.allBtn[i].addEventListener('click', (e) => {
				const target = e.target as HTMLElement;
				const clickElm = document.createElement('div') as HTMLElement;
				clickElm.className = 'o-btn--hover';
				this.allBtn[i].appendChild(clickElm);

				const posX = e.pageX as number;
				const posY = e.pageY as number;

				clickElm.style.left = `${posX - target.getBoundingClientRect().left}px`;
				clickElm.style.top = `${posY - target.getBoundingClientRect().top}px`;
				clickElm.className += 'o-btn--animation';

				setTimeout(() => {
					clickElm.remove();
				}, 600);
			});
		}
	}

	private initialize(): void {
		this.setVariables();
		if (this.moduleEl) {
			this.eventListeners();
		}
	}
}
