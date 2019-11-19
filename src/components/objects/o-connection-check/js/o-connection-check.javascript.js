export class ConnectionCheck {
	constructor() {
		this.initialize();
	}

	setup() {
		this.$holder = document.getElementsByClassName('o-connection-check')[0];
		this.$body = document.getElementsByTagName('body');
	}

	eventListeners() {
        window.addEventListener('offline', this.networkStatus);
        window.addEventListener('online', this.networkStatus);
    }
    
    networkStatus(e) {
        if (e.type === 'offline') {
            console.log('Internet connectie is gone');
        } else if (e.type === 'online') {
            console.log('Internet connectie is back');
        }
    }

	initialize() {
		this.setup();
		this.eventListeners();
	}
}

new ConnectionCheck();
