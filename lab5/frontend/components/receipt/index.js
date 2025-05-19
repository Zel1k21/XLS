export class ReceiptComponent {
    constructor(parent) {
        this.parent = parent
    }

    getHTML(data) {
        return (
            `
                <div class="card mb-3" style="width: 540px;">
                    <div class="row g-0">
                        <div class="col-md-4">
                            <img src="${data.src}" class="img-fluid" alt="картинка">
                        </div>
                        <div class="col-md-8">
                            <div class="card-body">
                                <h5 class="card-title">Необходимые ингредиенты</h5>
                                <p class="card-text">${data.ingredients}</p>
                            </div>
                        </div>
                    </div>
                </div>
            `
        )
    }

    getData() {
        return new Promise((resolve, reject) => {
            ajax.get(receiptUrls.getReceipts(), (data, status) => {
                if (status != 200) {
                    reject(`API вернуло код ${status}`);
                    return;
                }
                resolve(data);
            });
        });
    }

    async render(data) {
        const html = this.getHTML(data)
        this.parent.insertAdjacentHTML('beforeend', html)
    }
}