export class ActiveTab {
	constructor() {
		this.initialize();
	}

	setup() {
		this.$holder = document.getElementsByClassName('o-active-tab');
        this.$body = document.getElementsByTagName('body')[0];
	}

	eventListeners() {
        window.addEventListener('visibilitychange', (e) => {
            switch(document.visibilityState) {
                case 'prerender':
                    // console.log('Tab is pre-rendering');
                    break;

                case 'hidden':
                    // console.log('Tab is hidden');
                    break;

                case 'visible':
                    // console.log('Tab is open');
                    break;

            }
        });
    }

	initialize() {
        this.setup();
        if (this.$holder) {
            this.eventListeners();
        }
	}
}

new ActiveTab();
