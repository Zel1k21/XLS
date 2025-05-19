import { ReceiptCardComponent } from "../../components/receipt-card/index.js";
import { ReceiptPage } from "../receipt/index.js";
import { CreateReceiptPage } from "../receipt/create.js";
import { receiptUrls } from '../../modules/receiptUrls.js';

export class MainPage {
    constructor(parent) {
        this.parent = parent;
    };

    get pageRoot() {
        return document.getElementById('main-page')
    }

    getHTML() {
        return (
            `
                <div class="container mb-4">
                    <div class="d-flex justify-content-between align-items-center">
                        <h2>Рецепты</h2>
                        <button id="create-receipt-btn" class="btn btn-primary">Создать рецепт</button>
                    </div>
                </div>
                <div id="main-page" class="d-flex flex-wrap"></div>
            `
        )
    }

    async getData() {
        const response = await fetch(receiptUrls.getReceipts())
        return await response.json()
    }

    renderData() {
        this.items.forEach((item) => {
            const receiptCard = new ReceiptCardComponent(this.pageRoot)
            receiptCard.render(item, this.clickCard.bind(this))
        })
    }

    async render() {
        this.parent.innerHTML = ''
        const html = this.getHTML()
        this.parent.insertAdjacentHTML('beforeend', html)

        // Добавляем обработчик для кнопки создания рецепта
        const createBtn = document.getElementById('create-receipt-btn');
        if (createBtn) {
            createBtn.addEventListener('click', this.clickCreateReceipt.bind(this));
        }

        this.items = await this.getData()
        this.renderData()
    }

    clickCard(e) {
        const cardId = +e.target.dataset.id

        const receiptPage = new ReceiptPage(this.parent, cardId)
        receiptPage.render(this.items.filter(e => e.id == cardId)[0])
    }

    clickCreateReceipt() {
        const createReceiptPage = new CreateReceiptPage(this.parent);
        createReceiptPage.render();
    }
}