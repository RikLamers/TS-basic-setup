interface IData {
	albumId: number;
	id: number;
	thumbnailUrl: string;
	title: string;
	url: string;
};

export default class Pagination {
	private module: string;
	private moduleEl: HTMLElement;
	private body: HTMLBodyElement;
	private paginationInfinity: boolean;
	private paginationLoadBtn: boolean;
	private loadBtn: HTMLElement;
	private postPerPage: number;
	private pages: number;
	private data: IData[];
	private initPlacedData: any;

	constructor(module: string) {
		this.module = module;
		this.initialize();
	}

	private async setup() {
		this.moduleEl = document.querySelector('.o-pagination');
		this.body = document.querySelector('body');

		this.paginationInfinity = !!document.querySelector('.o-pagination__infinity-scroll');
		this.paginationLoadBtn = !!document.querySelector('.o-pagination__loadBtn');

		this.loadBtn = document.querySelector('.o-pagination__btn');

		this.postPerPage = 20;
		this.pages = 1;
		if (this.moduleEl) {
			this.data = await fetch('https://jsonplaceholder.typicode.com/photos')
				.then((res) => res.json())
				.then((data) => data);
			this.initPlacedData = await this.placeData(this.data);
		}
	}

	private eventListeners(): void {

		if (this.paginationInfinity) {
			window.addEventListener('scroll', () => {
				const scrollTop = Number(this.getScrollTop()) as number;
				const docHeight = Number(this.getDocumentHeight()) as number;
				const windowHeight = window.innerHeight as number;

				if (scrollTop < (docHeight - windowHeight)) {
					return;
				} else {
					this.loadNextPage(1, this.data);
				}
			});
		}

		if (this.paginationLoadBtn) {
			this.loadBtn.addEventListener('click', (e) => {
				e.preventDefault();
				this.loadNextPage(1, this.data);
			});
		}

	}

	private getScrollTop(): number {
		return (window.pageYOffset !== undefined) ? window.pageYOffset : (document.documentElement.scrollTop || document.body.scrollTop);
	}

	private getDocumentHeight(): number {
		const body = document.body;
		const html = document.documentElement;

		return Math.max(
			body.scrollHeight, body.offsetHeight,
			html.clientHeight, html.scrollHeight, html.offsetHeight,
		);
	};

	private async placeData(res: IData[]) {
		for (let i = 0; i < this.postPerPage; i++) {
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

				this.moduleEl.innerHTML += el;
			}
		}
	}

	private loadNextPage(page: number, res: IData[]): void {
		const oldPages = this.pages;
		const newPages = this.pages + page;

		for (let i = (oldPages * this.postPerPage); i < (newPages * this.postPerPage); i++) {
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

				this.moduleEl.innerHTML += el;
			}
		}

		this.pages++;

	}

	private initialize(): void {
		this.setup();
		if (this.moduleEl) {
			this.eventListeners();
		}
	}
}

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
