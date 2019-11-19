export class Header {
	constructor() {
		this.initialize();
	}

	setup() {
		this.$holder = document.getElementsByClassName('m-header')[0];
        this.$body = document.getElementsByTagName('body');

        this.$stickyHeader = document.getElementsByClassName('m-header__sticky')[0];
        this.$nextSibling = this.$holder.nextElementSibling;
	}

    eventListeners() { }
    
    addMargin() {
        const margin = this.$holder.clientHeight;
        this.$nextSibling.style.paddingTop = `${margin}px`;
    }

	initialize() {
		this.setup();
        this.eventListeners();
        if (this.$stickyHeader) {
            this.addMargin();
        }
	}
}

new Header();
