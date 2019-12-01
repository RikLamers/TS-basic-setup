export default class DetectColorScheme {
	private module: string;
	private moduleEl: HTMLElement;
	private modalOverlay: HTMLElement;
	private modal: HTMLElement;
	private themedStyleSheet: HTMLLinkElement | null;
	private switchBtn: HTMLElement | null;

	constructor(module: string) {
		this.module = module;
		this.initialize();
	}

	private setVariables(): void {
		this.moduleEl = document.querySelector(this.module);
		if (this.moduleEl) {
			this.modalOverlay = this.moduleEl.children[0] as HTMLElement;
			this.modal = this.moduleEl.children[1] as HTMLElement;
			document.getElementsByClassName('o-switch-button__check')[0].getAttribute('data-id') ? this.switchBtn = document.querySelector('.o-switch-button__check') : null;
		}
	}

	private eventListeners(): void {
		if (this.switchBtn) {
			this.switchBtn.addEventListener('change', (e: Event) => {
				const head = document.querySelector('head') as HTMLHeadElement;
				const target = e.target as any;

				for (let i = 0; i < head.children.length; i++) {
					if (head.children[i].getAttribute('data-id') === 'color-scheme') {
						this.themedStyleSheet = head.children[i] as HTMLLinkElement;
					}
				}

				if (target.checked) {
					this.themedStyleSheet.href = './css/dark.css';
				} else {
					this.themedStyleSheet.href = './css/light.css';
				}
			});
		}
	}

	private setInitial(): void {
		const themedStyleSheet = document.createElement('link') as HTMLLinkElement;
		themedStyleSheet.rel = 'stylesheet';
		themedStyleSheet.href = './css/light.css';
		themedStyleSheet.setAttribute('data-id', 'color-scheme');
		document.querySelector('head').appendChild(themedStyleSheet);
	}

	private checkSupport(): void {
		if (window.matchMedia('(prefers-color-scheme)').media !== 'not all') {
			localStorage.setItem('color-scheme', 'true');
			this.showModal();
		} else {
			localStorage.setItem('color-scheme', 'false');
		}
	}

	private showModal(): void {
		this.modal.style.display = 'block';
		this.modalOverlay.style.display = 'block';
		setTimeout(() => {
			this.modalOverlay.style.opacity = '.3';
			this.modal.style.opacity = '1';
		}, 100);
	}

	private initialize(): void {
		this.setVariables();
		if (this.moduleEl) {
			this.eventListeners();
			this.setInitial();
			this.checkSupport();
		}
	}
}
