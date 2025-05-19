import { BackButtonComponent } from "../../components/back-button/index.js"
import { MainPage } from "../main/index.js"
import { ajax } from "../../modules/ajax.js";
import { receiptUrls } from "../../modules/receiptUrls.js";

export class ReceiptCreationPage {
    constructor(parent, id) {
        this.parent = parent
        this.id = id
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

    
}