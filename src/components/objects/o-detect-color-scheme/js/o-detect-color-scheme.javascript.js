export class DetectColorScheme {
	constructor() {
		this.initialize();
	}

	setup() {
		this.$holder = document.getElementsByClassName('o-detect-color-scheme')[0];
        this.$body = document.getElementsByTagName('body');
        if (this.$holder) {
            this.$modalOverlay = this.$holder.children[0];
            this.$modal = this.$holder.children[1];
            document.getElementsByClassName('o-switch-button__check')[0].getAttribute('data-id') ? this.$switchBtn = document.getElementsByClassName('o-switch-button__check')[0] : '';
            this.$themedStyleSheet;
        }
	}

	eventListeners() {
        if (this.$switchBtn) {
            this.$switchBtn.addEventListener('change', (e) => {
    
                const head = document.getElementsByTagName('head')[0];
                for (let i = 0; i < head.children.length; i ++) {
                    if (head.children[i].getAttribute('data-id') === 'color-scheme') {
                        this.$themedStyleSheet = head.children[i];
                    }
                }
    
                if (e.target.checked) {
                    // Dark theme
                    this.$themedStyleSheet.href = './css/dark.css';
                } else {
                    // Light theme
                    this.$themedStyleSheet.href = './css/light.css';
                }
    
            });
        }
    }

    setInitial() {
        let themedStyleSheet = document.createElement('link');
        themedStyleSheet.rel = 'stylesheet';
        themedStyleSheet.href = './css/light.css';
        themedStyleSheet.setAttribute('data-id', 'color-scheme');
        document.getElementsByTagName('head')[0].appendChild(themedStyleSheet);
    }

    checkSupport() {
        if (window.matchMedia('(prefers-color-scheme)').media !== 'not all') {
            localStorage.setItem('color-scheme', true);
            this.showModal();
        } else {
            localStorage.setItem('color-scheme', false);
        }
    }

    showModal() {
        this.$modal.style.display = 'block';
        this.$modalOverlay.style.display = 'block';
        setTimeout(() => {
            this.$modalOverlay.style.opacity = '.3';
            this.$modal.style.opacity = '1';
        }, 100);
    }

	initialize() {
		this.setup();
        this.eventListeners();
        // this.setInitial();
        // this.checkSupport();
	}
}

new DetectColorScheme();
