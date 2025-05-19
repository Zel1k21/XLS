import { BackButtonComponent } from "../../components/back-button/index.js";
import { MainPage } from "../main/index.js";
import { receiptUrls } from "../../modules/receiptUrls.js";

export class CreateReceiptPage {
    constructor(parent) {
        this.parent = parent;
    }

    get pageRoot() {
        return document.getElementById('create-receipt-page');
    }

    getHTML() {
        return (`
            <div id="create-receipt-page">
                <div class="card mb-3 p-3">
                    <h3 class="mb-3">Создание нового рецепта</h3>
                    <form id="receipt-form">
                        <div class="mb-3">
                            <label for="receipt-name" class="form-label">Название рецепта</label>
                            <input type="text" class="form-control" id="receipt-name" required>
                        </div>
                        <div class="mb-3">
                            <label for="receipt-image-file" class="form-label">Изображение</label>
                            <input type="file" class="form-control" id="receipt-image-file" accept="image/*">
                            <div class="mt-2" id="image-preview-container"></div>
                            <input type="hidden" id="receipt-image" required>
                        </div>
                        <div class="mb-3">
                            <label for="receipt-ingredients" class="form-label">Ингредиенты</label>
                            <textarea class="form-control" id="receipt-ingredients" rows="3" required></textarea>
                            <div class="form-text">Введите ингредиенты, разделяя их запятыми</div>
                        </div>
                        <div id="steps-container">
                            <h4 class="mb-3">Шаги приготовления</h4>
                            <div class="step-item mb-3">
                                <div class="input-group">
                                    <span class="input-group-text">Шаг 1</span>
                                    <input type="text" class="form-control step-input" required>
                                    <button type="button" class="btn btn-danger remove-step" disabled>Удалить</button>
                                </div>
                            </div>
                        </div>
                        <button type="button" class="btn btn-secondary mb-3" id="add-step-btn">Добавить шаг</button>
                        <div class="d-grid gap-2">
                            <button type="submit" class="btn btn-primary">Создать рецепт</button>
                        </div>
                    </form>
                </div>
            </div>
        `);
    }

    clickBack() {
        const mainPage = new MainPage(this.parent);
        mainPage.render();
    }

    addEventListeners() {
        const form = document.getElementById('receipt-form');
        const addStepBtn = document.getElementById('add-step-btn');
        const stepsContainer = document.getElementById('steps-container');
        const imageFileInput = document.getElementById('receipt-image-file');
        const imagePreviewContainer = document.getElementById('image-preview-container');
        const hiddenImageInput = document.getElementById('receipt-image');

        // Обработка выбора изображения
        imageFileInput.addEventListener('change', (e) => {
            const file = e.target.files[0];
            if (file) {
                const reader = new FileReader();
                reader.onload = (event) => {
                    const base64Image = event.target.result;
                    hiddenImageInput.value = base64Image;
                    
                    // Показываем предпросмотр
                    imagePreviewContainer.innerHTML = `
                        <img src="${base64Image}" class="img-thumbnail mt-2" style="max-height: 200px">
                    `;
                };
                reader.readAsDataURL(file);
            }
        });

        // Добавление нового шага
        addStepBtn.addEventListener('click', () => {
            const stepItems = stepsContainer.querySelectorAll('.step-item');
            const newStepNumber = stepItems.length + 1;
            
            const newStepItem = document.createElement('div');
            newStepItem.className = 'step-item mb-3';
            newStepItem.innerHTML = `
                <div class="input-group">
                    <span class="input-group-text">Шаг ${newStepNumber}</span>
                    <input type="text" class="form-control step-input" required>
                    <button type="button" class="btn btn-danger remove-step">Удалить</button>
                </div>
            `;
            
            stepsContainer.appendChild(newStepItem);
            
            // Добавляем обработчик для кнопки удаления
            const removeBtn = newStepItem.querySelector('.remove-step');
            removeBtn.addEventListener('click', () => {
                stepsContainer.removeChild(newStepItem);
                this.updateStepNumbers();
            });
        });

        // Отправка формы
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            this.submitForm();
        });
    }

    updateStepNumbers() {
        const stepItems = document.querySelectorAll('.step-item');
        stepItems.forEach((item, index) => {
            const stepNumber = index + 1;
            item.querySelector('.input-group-text').textContent = `Шаг ${stepNumber}`;
            
            // Отключаем кнопку удаления для первого шага
            const removeBtn = item.querySelector('.remove-step');
            if (stepNumber === 1) {
                removeBtn.disabled = true;
            } else {
                removeBtn.disabled = false;
            }
        });
    }

    async submitForm() {
        const name = document.getElementById('receipt-name').value;
        const imageData = document.getElementById('receipt-image').value;
        const ingredients = document.getElementById('receipt-ingredients').value;
        
        const stepInputs = document.querySelectorAll('.step-input');
        const steps = Array.from(stepInputs).map(input => {
            return {
                step: Array.from(stepInputs).indexOf(input) + 1,
                text: input.value
            };
        });

        const newReceipt = {
            title: name,
            src: imageData,
            ingredients: ingredients,
            steps: steps
        };

        const response = await fetch(receiptUrls.createReceipt(), {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(newReceipt),
        });

        if (response.status !== 201 && response.status !== 200) {
            alert(`Ошибка при создании рецепта: ${response.status}`);
            return;
        }

        alert('Рецепт успешно создан!');
        const mainPage = new MainPage(document.getElementById('root'));
        mainPage.render();
    }

    render() {
        this.parent.innerHTML = '';
        const html = this.getHTML();
        this.parent.insertAdjacentHTML('beforeend', html);

        const backButton = new BackButtonComponent(this.pageRoot);
        backButton.render(this.clickBack.bind(this));

        this.addEventListeners();
    }
}