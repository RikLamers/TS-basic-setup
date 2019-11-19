export class Encrypter {
	constructor() {
		this.initialize();
	}

	setup() {
        this.$holder = document.getElementsByClassName('o-encrypter')[0];
        if (this.$holder) {
            this.$body = document.getElementsByTagName('body')[0];
            this.$JsEncrypter = document.getElementsByClassName('js-enrypter');
            this.$keyCode = [32, 33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,57,58,59,60,61,62,63,64,91,92,93,94,95,96,97,98,99,100,101,102,103,104,105,106,107,108,109,110,111,112,113,114,115,116,117,118,119,120,121,122,123,124,125];
            this.$keys = [' ', '!', '"', '#', '$', '%', '&', '\'', '(', ')', '*', '+', ',', '-', '.', '/', '0', '1', '2', '3', '4', '5', '6', '7', '8', '9', ':', ';', '<', '=', '>', '?', '@', '[', '\\', ']', '^', '_', '\`', 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z', '\{', '|', '\}'];
            this.$allNodesToEncrypt = this.getAllNodes();
            this.getEncryptData(this.$allNodesToEncrypt);
        }
	}

	eventListeners() {
        for (let i = 0; i < this.$JsEncrypter.length; i++) {
            this.$JsEncrypter[i].addEventListener('click', (e) => {
                if (e.target.getAttribute('data-encrypt')) {
                    const test = this.getDecrypted(e.target);
                    console.log(test);
                }
            });
        }
    }

    getDecrypted(el) {
        let decryptedString = '';
        const getAllCode = el.getAttribute('data-encrypt').split('%');
        for (let i = 0; i < getAllCode.length; i++) {
            for (let x = 0; x < this.$keyCode.length; x++) {
                if (Number(getAllCode[i]) === this.$keyCode[x]) {
                    decryptedString = `${decryptedString}${this.$keys[x]}`;
                }
            }
        }
        return decryptedString;
    }

    getAllNodes() {
        const nodes = this.$body.childNodes;
        const nodesToEncrypt = [];
        for (let i = 0; i < nodes.length; i++) {
            if (nodes[i].nodeName !== '#text' && nodes[i].getAttribute('data-encrypt')) {
                nodesToEncrypt.push(nodes[i]);
            }
        }
        return nodesToEncrypt;
    }
    
    getEncryptData(el) {

        if (el.length > 1) {
            for (let i = 0; i < el.length; i++) {
                const getData = el[i].getAttribute('data-encrypt');
                const encryptedData = this.encryptData(getData);
                el[i].setAttribute('data-encrypt', encryptedData);
            }
        } else if (el.length === 1) {
            const getData = el.getAttribute('data-encrypt');
            const encryptedData = this.encryptData(getData);
            el.setAttribute('data-encrypt', encryptedData);
        }
    }

    encryptData(data) {
        let encryptedString = '';
        for (let i = 0; i < data.length; i++) {
            for (let x = 0; x < this.$keys.length; x++) {
                if (data[i] === this.$keys[x]) {
                    encryptedString = `${encryptedString}${this.$keyCode[x]}%`;
                }
            }
        }
        return encryptedString;
    }

	initialize() {
        this.setup();
        if (this.$holder) {
            this.eventListeners();
        }
	}
}

new Encrypter();
