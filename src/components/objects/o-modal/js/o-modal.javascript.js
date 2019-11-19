export class Modal {
	constructor() {
		this.initialize();
	}

	setup() {
		this.$holder = document.getElementsByClassName('o-modal')[0];
		this.$body = document.getElementsByTagName('body');
		if (this.$holder) {
			this.$modals = document.getElementsByClassName('o-modal');
			this.$overlay = document.getElementsByClassName('o-modal__overlay')[0];
			this.$openBtn = document.getElementsByClassName('o-modal__open');
			this.$closeModal = document.getElementsByClassName('o-modal--close');
			this.$activeModal;
		}
	}

	eventListeners() {
		for (let i = 0; i < this.$openBtn.length; i++) {
			this.$openBtn[i].addEventListener('click', (e) => {
				this.searchCorrectModal(this.$openBtn[i].getAttribute('data-modal'));
			});
		}

		for (let x = 0; x < this.$closeModal.length; x++) {
			this.$closeModal[x].addEventListener('click', this.closeModal.bind(this));
		}

		this.$overlay.addEventListener('click', this.closeModal.bind(this));
	}

	searchCorrectModal(name) {
		for (let i = 0; i < this.$modals.length; i++) {
			if (this.$modals[i].getAttribute('data-modal') === name) {
				this.$activeModal = this.$modals[i];
				this.displayModal(this.$activeModal);
			}
		}
	}

	displayModal(modal) {
		this.$overlay.style.display = 'block';
		this.$overlay.style.opacity = '.3';
		setTimeout(() => {
			modal.style.display = 'block';
			modal.style.opacity = '1';
		}, 100);
	}

	closeModal() {
		this.$activeModal.style.opacity = '0';
		this.$overlay.style.opacity = '0';
		setTimeout(() => {
			this.$activeModal.style.display = 'none';
			this.$overlay.style.display = 'none';
		}, 100);
	}

	initialize() {
		this.setup();
		if (this.$holder) {
			this.eventListeners();
		}
	}
}

new Modal();
