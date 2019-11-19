export class Pagination {
	constructor() {
		this.initialize();
	}

	async setup() {
		this.$holder = document.getElementsByClassName('o-pagination')[0];
        this.$body = document.getElementsByTagName('body');

        this.$paginationInfinity = !!document.getElementsByClassName('o-pagination__infinity-scroll')[0];
        this.$paginationLoadBtn = !!document.getElementsByClassName('o-pagination__loadbtn')[0];

        this.$loadBtn = document.getElementsByClassName('o-pagination__btn')[0];
        
        this.$postPerPage = 20;
        this.$pages = 1;
        if (this.$holder) {
            this.$data = await fetch('https://jsonplaceholder.typicode.com/photos')
                .then((res) => res.json())
                .then((data) => data);
            this.$initPlacedData = await this.placeData(this.$data);
        }
	}

	eventListeners() {

        if (this.$paginationInfinity) {
            window.addEventListener('scroll', (e) => {
                if (this.getScrollTop() < this.getDocumentHeight() - window.innerHeight) {
                    return;
                } else {
                    this.loadNextPage(1, this.$data);
                }
            });
        }

        if (this.$paginationLoadBtn) {
            this.$loadBtn.addEventListener('click', (e) => {
                e.preventDefault();
                this.loadNextPage(1, this.$data);
            });
        }

    }

    getScrollTop() {
        return (window.pageYOffset !== undefined) ? window.pageYOffset : (document.documentElement || document.body.parentNode || document.body).scrollTop;
    }

    getDocumentHeight() {
        const body = document.body;
        const html = document.documentElement;
        
        return Math.max(
            body.scrollHeight, body.offsetHeight,
            html.clientHeight, html.scrollHeight, html.offsetHeight
        );
    };
    
    async placeData(res) {
        for (let i = 0; i < this.$postPerPage; i++) {
            if (res[i]) {
                const el = `
                    <div class="o-card">
                        <div class="o-card__header">
                            <h3>${res[i].title}</h3>
                        </div>
                        <div class="o-card__img o-card__img--padding">
                            <div class="o-card__img--src o-img__bg" style="background: url(${res[i].thumbnailUrl})"></div>
                        </div>
                        <div class="o-card__content">
                            <p>Album ID: ${res[i].albumId}</p>
                            <p>ID: ${res[i].id}</p>
                        </div>
                    </div>
                `;
    
                this.$holder.innerHTML += el;
            }
        }
    }

    loadNextPage(page, res) {
        const oldPages = this.$pages;
        const newPages = this.$pages + page;

        for (let i = (oldPages * this.$postPerPage); i < (newPages * this.$postPerPage); i++) {
            if (res[i]) {
                const el = `
                    <div class="o-card">
                        <div class="o-card__header">
                            <h3>${res[i].title}</h3>
                        </div>
                        <div class="o-card__img o-card__img--padding">
                            <div class="o-card__img--src o-img__bg" style="background: url(${res[i].thumbnailUrl})"></div>
                        </div>
                        <div class="o-card__content">
                            <p>Album ID: ${res[i].albumId}</p>
                            <p>ID: ${res[i].id}</p>
                        </div>
                    </div>
                `;
    
                this.$holder.innerHTML += el;
            }
        }

        this.$pages++;

    }

	initialize() {
		this.setup();
		if (this.$holder) {
			this.eventListeners();
		}
	}
}

new Pagination();

// async function init() {
//     const response = await fetch('https://jsonplaceholder.typicode.com/photos');
//     const reader = response.body.getReader();
//     const contentLengthHeader = response.headers.get('Content-Length');
//     const resourceSize = parseInt(contentLengthHeader, 10);

//     async function read(reader, totalChunckSize = 0, chunkCount = 0) {
//         const {value: {length} = {}, done} = await reader.read();

//         if (done) {
//             return chunkCount;
//         }

//         const runningTotal = totalChunckSize + length;
//         const percentComplete = Math.round((runningTotal / resourceSize) * 100);

//         const progress = `${percentComplete}% (chunk ${chunkCount})`;

//         console.log(progress);
//         document.body.innerHTML += progress + '<br />';

//         return read(reader, runningTotal, chunkCount + 1);
//     }
//     const chunkCount = await read(reader);
//     console.log(`Finished! Received ${chunkCount} chunks.`);
// }

// init();
