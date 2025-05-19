export class AccordionItem{
    constructor(parent){
        this.parent = parent;
    }

    getHTML(data, index){
        return(
        `
        <div class = "accordion-item" id = "accordion-item-${index + 1}">
            <h2 class="accordion-header" id="heading-${index + 1}">
                <button class="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapse-${index + 1}" aria-expanded="true" aria-controls="collapse-${index + 1}">
                    Шаг ${index + 1}:
                </button>
            </h2>
            <div id="collapse-${index + 1}" class="accordion-collapse collapse" aria-labelledby="heading-${index + 1}" data-bs-parent="#accordion">
                <div class="accordion-body">
                    ${data.text}
                </div>
            </div>
        </div>
        `
    )
    }

    render(data, index){
        const html = this.getHTML(data, index)
        this.parent.insertAdjacentHTML('beforeend', html)
    }
}
