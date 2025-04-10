import { ProductComponent } from "../../components/product/index.js"
import { BackButtonComponent } from "../../components/back-button/index.js"
import { MainPage } from "../main/index.js"
import { AccordionBody } from "../../components/accordion-body/index.js"


export class ProductPage {
    constructor(parent, id) {
        this.parent = parent
        this.id = id
    }

    getData() {
        if (this.id == 1) {
            return {
                id: 1,
                src: "static/images/Наполеон.jpg",
                text: "Для теста:<br> - 500 г пшеничной муки;<br> - пачка маргарина;<br> - 2 яйца; <br> - одна чайная ложка соли (5 г);<br> - 7 мл уксуса;<br> - одна чайная ложка растительного масла;<br> - полчашки воды."
            }
        } else if (this.id == 2){
            return {
                id: 2,
                src: "static/images/медовик.webp",
                text: "- 500 г муки;<br> - 4 яйца;<br> - 250 г сахара;<br> - 25 г меда;<br> - 200 г сметаны;<br> - 150 мл сгущенного молока;<br> - 80г сливочного масла;<br> - 5 г разрыхлителя;<br> - сода на кончике ножа;<br> - уксус для гашения;<br> - ванильный экстракт."
            }
        } else if (this.id == 3){
            return {
                id: 3,
                src: "static/images/Бисквитный.webp",
                text: "- 6 яиц;<br> - 250 г сахара;<br> - 400 г муки;<br> -  10 г разрыхлителя;<br> - щепотка соли;<br> - лимонный сок на глаз;<br> - малина, клубника, черника или другие ягоды по вашему выбору;<br> - кондитерские крошки для украшения."
            }
        }
    }

    get pageRoot() {
        return document.getElementById('product-page')
    }

    getHTML() {
        return (
            `
                <div id="product-page"></div>
            `
        )
    }

    clickBack() {
        const mainPage = new MainPage(this.parent)
        mainPage.render()
    }

    render() {
        this.parent.innerHTML = ''
        const html = this.getHTML()
        this.parent.insertAdjacentHTML('beforeend', html)

        const backButton = new BackButtonComponent(this.pageRoot)
        backButton.render(this.clickBack.bind(this))

        const data = this.getData()
        const stock = new ProductComponent(this.pageRoot)
        stock.render(data)

        const accordion_b = new AccordionBody(this.pageRoot, this.id)
        accordion_b.render()
    }
}