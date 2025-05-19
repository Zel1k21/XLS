export class CreateReceiptDto {
    src: string;
    title: string;
    ingredients: string;
    steps: [
        {
        step: number;
        text: string;
        }
    ]
}
