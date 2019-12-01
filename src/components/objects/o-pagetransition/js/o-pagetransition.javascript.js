import Highway from '@dogstudio/highway';
import TriangleFold from '../h/triangle-fold/h.triangle-fold';



export class PageTransition {
	constructor() {
		this.initialize();
	}

	setup() {
		this.$holder = document.getElementsByClassName('o-pagetransition');
		this.$body = document.getElementsByTagName('body')[0];
		this.$h = new Highway.Core({
			transitions: {
				default: TriangleFold
			}
		});
	}

	eventListeners() {}

	initialize() {
        this.setup();
        if (this.$holder) {
            this.eventListeners();
        }
	}
}

new PageTransition();
