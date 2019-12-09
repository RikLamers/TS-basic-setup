export default class Encrypter {
	private module: string;
	private moduleEl: HTMLElement;
	private body: HTMLBodyElement;
	private jsEncrypter: NodeListOf<HTMLElement>;
	private keyCode: number[];
	private keys: string[];
	private allNodesToEncrypt: HTMLElement[];

	constructor(module: string) {
		this.module = module;
		this.initialize();
	}

	private setVariables(): void {
		this.moduleEl = document.querySelector(this.module);
		if (this.moduleEl) {
			this.body = document.querySelector('body');
			this.jsEncrypter = document.querySelectorAll('.js-encrypter');
			this.keyCode = [32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,57,58,59,60,61,62,63,64,91,92,93,94,95,96,97,98,99,100,101,102,103,104,105,106,107,108,109,110,111,112,113,114,115,116,117,118,119,120,121,122,123,124,125];
			this.keys = [' ', '!', '"', '#', '$', '%', '&', '\'', '(', ')', '*', '+', ',', '-', '.', '/', '0', '1', '2', '3', '4', '5', '6', '7', '8', '9', ':', ';', '<', '=', '>', '?', '@', '[', '\\', ']', '^', '_', '\`', 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z', '\{', '|', '\}'];
			this.allNodesToEncrypt = this.getAllNodes();
			console.log(this.allNodesToEncrypt);
			this.getEncryptData(this.allNodesToEncrypt);
		}
	}

	private eventListeners(): void {
		for (let i = 0; i < this.jsEncrypter.length; i++) {
			this.jsEncrypter[i].addEventListener('click', (e) => {
				const target = e.target as HTMLElement;
				if (target.getAttribute('data-encrypt')) {
					const decryptedValue = this.getDecrypted(target);
				}
			});
		}
	}

	private getDecrypted(el: HTMLElement): string {
		let decryptedString = '';
		const getAllCode = el.getAttribute('data-encrypt').split('%');
		for (let i = 0; i < getAllCode.length; i++) {
			for (let x = 0; x < this.keyCode.length; x++) {
				if (Number(getAllCode[i]) === this.keyCode[x]) {
					decryptedString = `${decryptedString}${this.keys[x]}`;
				}
			}
		}
		return decryptedString;
	}

	private getAllNodes(): HTMLElement[] {
		const nodes = this.body.childNodes as NodeListOf<HTMLElement>;
		const nodesToEncrypt = [];
		for (let i = 0; i < nodes.length; i++) {
			if (nodes[i].nodeName !== '#text' && nodes[i].getAttribute('data-encrypt')) {
				nodesToEncrypt.push(nodes[i]);
			}
		}
		return nodesToEncrypt;
	}

	private getEncryptData(el: HTMLElement[]): void {
		if (el.length > 1) {
			for (let i = 0; i < el.length; i++) {
				const getData = el[i].getAttribute('data-encrypt');
				const encryptedData = this.encryptData(getData);
				el[i].setAttribute('data-encrypt', encryptedData);
			}
		} else if (el.length === 1) {
			const getData = el[0].getAttribute('data-encrypt');
			const encryptedData = this.encryptData(getData);
			el[0].setAttribute('data-encrypt', encryptedData);
		}
	}

	private encryptData(data: string): string {
		let encryptedString = '';
		for (let i = 0; i < data.length; i++) {
			for (let x = 0; x < this.keys.length; x++) {
				if (data[i] === this.keys[x]) {
					encryptedString = `${encryptedString}${this.keyCode[x]}%`;
				}
			}
		}
		return encryptedString;
	}

	private initialize(): void {
		this.setVariables();
		if (this.moduleEl) {
			this.eventListeners();
		}
	}
}
