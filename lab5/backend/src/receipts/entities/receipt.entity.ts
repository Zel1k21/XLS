export class Receipt {
    id: number;
    src: string;
    title: string;
    ingredients: string;
    steps: [{
        step: number;
        text: string;
    }
    ]
}
