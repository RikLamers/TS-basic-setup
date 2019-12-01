export default class Header {
    private module: string;
    private moduleEl: HTMLElement;
    private stickyHeader: HTMLElement;

	constructor(module: string) {
        this.module = module;
		this.initialize();
	}

	private setVariables() {
        this.moduleEl = document.querySelector(this.module);
        this.stickyHeader = document.querySelector('.m-header__sticky');
	}

    private eventListeners() { }
    
    private addMargin() {
        const margin = this.moduleEl.clientHeight;
        const nextSibling = this.moduleEl.nextElementSibling as HTMLElement;
        nextSibling.style.paddingTop = `${margin}px`;
    }

	private initialize() {
		this.setVariables();
        this.eventListeners();
        if (this.stickyHeader) {
            this.addMargin();
        }
	}
}
