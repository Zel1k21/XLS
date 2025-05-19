class ReceiptUrls {
    constructor() {
        this.baseUrl = 'http://localhost:3000';
    }

    getReceipts() {
        return `${this.baseUrl}/receipts`;
    }

    getReceiptById(id) {
        return `${this.baseUrl}/receipts/${id}`;
    }

    createReceipt() {
        return `${this.baseUrl}/receipts`;
    }
}

export const receiptUrls = new ReceiptUrls();
