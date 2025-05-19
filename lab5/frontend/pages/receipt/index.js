import { ReceiptComponent } from "../../components/receipt/index.js"
import { BackButtonComponent } from "../../components/back-button/index.js"
import { MainPage } from "../main/index.js"
import { AccordionBody } from "../../components/accordion-body/index.js"
import { ajax } from "../../modules/ajax.js";
import { receiptUrls } from "../../modules/receiptUrls.js";


export class ReceiptPage {
    constructor(parent, id) {
        this.parent = parent
        this.id = id
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

    get pageRoot() {
        return document.getElementById('receipt-page')
    }

    getHTML() {
        return (
            `
                <div id="receipt-page"></div>
            `
        )
    }

    clickBack() {
        const mainPage = new MainPage(this.parent)
        mainPage.render()
    }

    async render() {
        this.parent.innerHTML = ''
        const html = this.getHTML()
        this.parent.insertAdjacentHTML('beforeend', html)

        const backButton = new BackButtonComponent(this.pageRoot)
        backButton.render(this.clickBack.bind(this))

        const data = await this.getData()
        const receipt = new ReceiptComponent(this.pageRoot)
        receipt.render(data.filter(e => e.id == this.id)[0])

        const accordion_b = new AccordionBody(this.pageRoot, this.id)
        accordion_b.render(data.filter(e => e.id == this.id)[0])
    }
}