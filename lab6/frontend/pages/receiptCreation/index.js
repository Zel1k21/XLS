import { MainPage } from "../main/index.js"

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