export class AccordionItem{
    constructor(parent){
        this.parent = parent;
    }

    getHTML(data){
        return(
        `
        <div class = "accordion-item" id = "accordion-item-${data.id}">
            <h2 class="accordion-header" id="heading-${data.id}">
                <button class="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapse-${data.id}" aria-expanded="true" aria-controls="collapse-${data.id}">
                    ${data.title}
                </button>
            </h2>
            <div id="collapse-${data.id}" class="accordion-collapse collapse" aria-labelledby="heading-${data.id}" data-bs-parent="#accordion">
                <div class="accordion-body">
                    ${data.text}
                </div>
            </div>
        </div>
        `
    )
    }

    render(data){
        const html = this.getHTML(data)
        this.parent.insertAdjacentHTML('beforeend', html)
    }
}