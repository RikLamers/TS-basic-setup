export default class ConnectionCheck {
	private module: string;
	private moduleEl: HTMLElement;

	constructor(module: string) {
		this.module = module;
		this.initialize();
	}

	private setVariables(): void {
		this.moduleEl = document.querySelector(this.module);
	}

	private eventListeners(): void {
		window.addEventListener('offline', this.networkStatus);
		window.addEventListener('online', this.networkStatus);
	}

	private networkStatus(e: Event): void {
		if (e.type === 'offline') {
			// console.log('Internet connection is gone');
		} else if (e.type === 'online') {
			// console.log('Internet connection is back');
		}
	}

	private initialize(): void {
		this.setVariables();
		this.eventListeners();
	}
}
