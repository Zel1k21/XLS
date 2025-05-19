import { ajax } from '../../modules/ajax.js';
import { ReceiptCardComponent } from "../../components/receipt-card/index.js";
import { ReceiptPage } from "../receipt/index.js";
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
                <div id="main-page" class="d-flex flex-wrap"></div>
            `
        )
    }

    getData() {
        ajax.get(receiptUrls.getReceipts(), (data) => {
            this.items = data;
            this.renderData()
        })
    }

    renderData() {
        this.items.forEach((item) => {
            const receiptCard = new ReceiptCardComponent(this.pageRoot)
            receiptCard.render(item, this.clickCard.bind(this))
        })
    }

    render() {
        this.parent.innerHTML = ''
        const html = this.getHTML()
        this.parent.insertAdjacentHTML('beforeend', html)

        this.getData()

    }

    clickCard(e) {
        const cardId = +e.target.dataset.id

        const receiptPage = new ReceiptPage(this.parent, cardId)
        receiptPage.render(this.items.filter(e => e.id == cardId)[0])
    }

}