export default class ActiveTab {
	private module: string;

	constructor(module: string) {
		this.module = module;
		this.initialize();
	}

	private eventListeners(): void {
		window.addEventListener('visibilitychange', () => {
			switch (document.visibilityState) {
				case 'hidden':
					// console.log('Tab is hidden');
					break;

				case 'visible':
					// console.log('Tab is open');
					break;
			}
		});
	}

	private initialize(): void {
		this.eventListeners();
	}
}

