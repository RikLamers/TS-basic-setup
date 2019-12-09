export default class Modal {
	private module: string;
	private moduleEl: HTMLElement;
	private modals: NodeListOf<HTMLElement>;
	private overlay: HTMLElement;
	private openBtn: NodeListOf<HTMLElement>;
	private closeModal: NodeListOf<HTMLElement>;
	private activeModal: HTMLElement | null;

	constructor(module: string) {
		this.module = module;
		this.initialize();
	}

	private setup(): void {
		this.moduleEl = document.querySelector(this.module);
		if (this.moduleEl) {
			this.modals = document.querySelectorAll('.o-modal');
			this.overlay = document.querySelector('.o-modal__overlay');
			this.openBtn = document.querySelectorAll('.o-mald__open');
			this.closeModal = document.querySelectorAll('.o-modal__close');
			this.activeModal = null;
		}
	}

	private eventListeners(): void {
		for (let i = 0; i < this.openBtn.length; i++) {
			this.openBtn[i].addEventListener('click', () => {
				this.searchCorrectModal(this.openBtn[i].getAttribute('data-modal'));
			});
		}

		for (let x = 0; x < this.closeModal.length; x++) {
			this.closeModal[x].addEventListener('click', this.closeModalAction.bind(this));
		}

		this.overlay.addEventListener('click', this.closeModalAction.bind(this));
	}

	private searchCorrectModal(name: string): void {
		for (let i = 0; i < this.modals.length; i++) {
			if (this.modals[i].getAttribute('data-modal') === name) {
				this.activeModal = this.modals[i];
				this.displayModal(this.activeModal);
			}
		}
	}

	private displayModal(modal: HTMLElement): void {
		this.overlay.style.display = 'block';
		this.overlay.style.opacity = '.3';
		setTimeout(() => {
			modal.style.display = 'block';
			modal.style.opacity = '1';
		}, 100);
	}

	private closeModalAction(): void {
		this.activeModal.style.opacity = '0';
		this.overlay.style.opacity = '0';
		setTimeout(() => {
			this.activeModal.style.display = 'none';
			this.overlay.style.display = 'none';
		}, 100);
	}

	private initialize(): void {
		this.setup();
		if (this.moduleEl) {
			this.eventListeners();
		}
	}
}
