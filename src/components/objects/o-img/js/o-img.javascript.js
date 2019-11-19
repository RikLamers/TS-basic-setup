export class Img {
	constructor() {
		this.initialize();
	}

	setup() {
		this.$holder = document.getElementsByClassName('o-img')[0];
        this.$body = document.getElementsByTagName('body');
        this.$img = document.querySelectorAll('img');
        this.$bgImage = document.getElementsByClassName('o-img__bg');
	}

	eventListeners() {}
    
    canUseWebP() {
        Modernizr.on('webp', () => {
            const result = !!Modernizr.webp;
            if (result) {
                // Has WebP support
                // get all img tags
                for (let i = 0; i < this.$img.length; i++) {
                    if (this.$img[i].src.match(/\.(jpe?g|png)/)) {
                        let imgUrl = this.$img[i].src.split(window.location.origin)[1].split('.').slice(0, -1)[0];
                        imgUrl = `${imgUrl}.webp`;
                        this.$img[i].src = imgUrl;
                    }
                }

                // Get all bg img
                for (let x = 0; x < this.$bgImage.length; x++) {
                    if (this.$bgImage[x].getAttribute('data-img').match(/\.(jpe?g|png)/)) {
                        let bgImgUrl = this.$bgImage[x].getAttribute('data-img').split('.').slice(0, -1)[0];
                        bgImgUrl = `${bgImgUrl}.webp`;
                        this.$bgImage[x].style.backgroundImage = `url(${bgImgUrl})`;
                        this.$bgImage[x].removeAttribute('data-img');
                    }
                }

            } else {
                // Get all bg img
                for (let x = 0; x < this.$bgImage.length; x++) {
                    this.$bgImage[x].style.backgroundImage = `url(${this.$bgImage[x].getAttribute('data-img')})`;
                    this.$bgImage[x].removeAttribute('data-img');
                }
            }
        });
    }

	initialize() {
        this.setup();
        if (this.$holder || this.$bgImage || this.$img) {
            this.eventListeners();
            this.canUseWebP();
        }
	}
}

new Img();
