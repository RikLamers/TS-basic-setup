export default class Img {
	private module: string;
	private moduleEl: HTMLElement;
	private img: NodeListOf<HTMLImageElement>;
	private bgImg: NodeListOf<HTMLElement>;

	constructor(module: string) {
		this.module = module;
		this.initialize();
	}

	private setVariables(): void {
		this.moduleEl = document.querySelector(this.module);
		this.img = document.querySelectorAll('img');
		this.bgImg = document.querySelectorAll('.o-img__bg');
	}

	private canUseWebP(): void {
		Modernizr.on('webp', () => {
			const result = !!Modernizr.webp;
			if (result) {
				// Has WebP support
				// get all img tags
				for (let i = 0; i < this.img.length; i++) {
					if (this.img[i].src.match(/\.(jpe?g|png)/)) {
						let imgUrl = this.img[i].src.split(window.location.origin)[1].split('.').slice(0, -1)[0];
						imgUrl = `${imgUrl}.webp`;
						this.img[i].src = imgUrl;
					}
				}

				// Get all bg img
				for (let x = 0; x < this.bgImg.length; x++) {
					if (this.bgImg[x].getAttribute('data-img').match(/\.(jpe?g|png)/)) {
						let bgImgUrl = this.bgImg[x].getAttribute('data-img').split('.').slice(0, -1)[0];
						bgImgUrl = `${bgImgUrl}.webp`;
						this.bgImg[x].style.backgroundImage = `url(${bgImgUrl})`;
						this.bgImg[x].removeAttribute('data-img');
					}
				}
			} else {
				// Get all bg img
				for (let x = 0; x < this.bgImg.length; x++) {
					this.bgImg[x].style.backgroundImage = `url(${this.bgImg[x].getAttribute('data-img')})`;
					this.bgImg[x].removeAttribute('data-img');
				}
			}
		});
	}

	private initialize(): void {
		this.setVariables();
		if (this.moduleEl || this.bgImg || this.img) {
			this.canUseWebP();
		}
	}
}
