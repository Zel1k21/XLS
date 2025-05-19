import { AccordionItem } from "../accordion-item/index.js";
import { ajax } from "../../modules/ajax.js";
import { receiptUrls } from "../../modules/receiptUrls.js";

export class AccordionBody {
    constructor(parent, id) {
        this.parent = parent;
        this.id = id;
    }

    getHTML() {
        return (`
            <div class = "accordion" id = "accordion"> </div>
            `)
    }

    get pageRoot() {
        return document.getElementById('accordion')
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

    async render() {
        const html = this.getHTML()
        this.parent.insertAdjacentHTML('beforeend', html)

        const data = await this.getData()
        const recipe = data.filter(e => e.id == this.id)[0]

        if (recipe && recipe.steps) {
            recipe.steps.forEach((step, index) => {
                const accordion_item = new AccordionItem(this.pageRoot)
                accordion_item.render(step, index)
            })
        }
    }
}