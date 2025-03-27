import { AccordionItem } from "../accordion-item/index.js";

export class AccordionBody {
    constructor(parent){
        this.parent = parent;
    }

    getHTML() {
        return ( `
            <div class = "accordion" id = "accordion"> </div>
            `)
    }

    get pageRoot() {
        return document.getElementById('accordion')
    }

    getData() {
        return [
            {   
                id: "1",
                title: "Акция",
                text: "Такой акции вы еще не видели 1"
            },
            {
                id: "2",
                title: "Акция",
                text: "Такой акции вы еще не видели 2"
            },
            {
                id: "3",
                title: "Акция",
                text: "Такой акции вы еще не видели 3"
            },
        ]
    }

    render() {
        const html = this.getHTML()
        this.parent.insertAdjacentHTML('beforeend', html)

        const data = this.getData()
        data.forEach((item) => {
            const accordion_item = new AccordionItem(this.pageRoot)
            accordion_item.render(item)
        })
    }
}