export class Btn {
	constructor() {
		this.initialize();
	}

	setup() {
		this.$holder = document.getElementsByClassName('o-btn')[0];
        this.$body = document.getElementsByTagName('body');
        this.$allBtn = document.getElementsByClassName('o-btn');
	}

	eventListeners() {
        for (let i = 0; i < this.$allBtn.length; i++) {
            this.$allBtn[i].addEventListener('click', (e) => {
                let clickElm = document.createElement('div');
                clickElm.className = 'o-btn--hover';
                this.$allBtn[i].appendChild(clickElm);

                const posX = e.pageX;
                const posY = e.pageY;

                clickElm.style.left = `${posX - e.target.getBoundingClientRect().left}px`;
				clickElm.style.top = `${posY - e.target.getBoundingClientRect().top}px`;
                clickElm.className += ' o-btn--animation';
                
                setTimeout(() => {
					clickElm.remove();
                }, 600);
                
            });
        }
	}

	initialize() {
		this.setup();
		this.eventListeners();
	}
}

new Btn();
