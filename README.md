# ЛР 3. Простое веб-приложение. Верстка

**Савинский А. Ю. ИУ5-44Б**

## Содержание <!-- omit in toc -->

- [Цель работы](#цель-данной-лабораторной-работы)
- [Тема](#тема)
- [Сайт для вдохновения](#сайт-для-вдохновения)
- [Дополнительные задания](#дополнительные-задания)
- [План](#план)
- [Задание](#задание)

## Цель данной лабораторной работы 
Знакомство с node, npm, написание простого приложения на JavaScript. В ходе выполнения работы, вам предстоит ознакомиться с кодом реализации простого интерфейса и вывода данных, и затем выполнить задания по варианту.

## Тема
Заявки на переходы космических аппаратов на различные орбиты

## Сайт для вдохновения
Стиль вдохновлен сайтом https://www.nasa.gov/

## Дополнительные задания
1. На странице подробнее каждой карточки добавить поле для ввода скорости спутника на определенной орбите, при вводе значения и нажатии кнопки "Сохрнаить" новое значение должно отображаться на карточке на главной странице

components/product-card/index.js
```js
...
getHTML(data) {
    return `
        <div class="card" style="width: 300px;">
           ...
                <h5 class="card-title">${data.title}</h5>
                <p class="card-text">${data.text}</p>
                <p class="card-text"><strong>Скорость на орбите:</strong> ${data.speed}</p>
                <span class="badge orbit-badge mb-3">${data.type}</span>
           ...
        </div>
    `;
}
...
```

components/product/index.js
```js
export class ProductComponent {
    constructor(parent) {
        this.parent = parent;
    }

    getHTML(data) {
        return `
            <div class="card mb-3" style="max-width: 900px;">
                <div class="row g-0">
                    <div class="col-md-5">
                        ...
                            <p class="card-text">
                                <strong>Скорость на орбите:</strong> ${data.speed}
                            </p>

                            <div class="mt-3">
                                <label for="speed-input" class="form-label">Изменить скорость</label>
                                <input
                                    id="speed-input"
                                    type="text"
                                    class="form-control"
                                    value="${data.speed}"
                                >
                            </div>

                            <button id="save-speed-button" class="btn details-btn mt-3">
                                Сохранить
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }

    addListeners(listener) {
        document
            .getElementById("save-speed-button")
            .addEventListener("click", listener);
    }

    render(data, listener) {
        const html = this.getHTML(data);
        this.parent.insertAdjacentHTML('beforeend', html);
        this.addListeners(listener);
    }
}
```

pages/product/index.js
```js
...
    saveSpeed() {
        const current = this.getCurrent();
        const newSpeed = document.getElementById("speed-input").value;

        current.speed = newSpeed;

        const page = new MainPage(this.parent);
        page.render();
    }

    render() {
        this.parent.innerHTML = '';
        this.parent.insertAdjacentHTML('beforeend', this.getHTML());

        const header = new HeaderComponent(document.getElementById("header-root"));
        header.render(this.clickHome.bind(this), true, "Назад");

        const data = this.getCurrent();
        const product = new ProductComponent(this.pageRoot);
        product.render(data, this.saveSpeed.bind(this));
    }
...
```
## План

1. Инструменты для работы
2. Что такое node, npm и package.json
3. Как работать с html в JS
4. Инициализация проекта
5. Создание главной страницы, подключение bootstrap
6. Простая кнопка на JavaScript
7. Структурирование проекта
8. Верстка главной страницы
9. Верстка страницы продукта

## Задание 
Знакомство с node, npm. Верстка интерфейса с карточками (страница списка с фильтрацией и страница подробнее), данные получать через mock объекты (коллекция). Добавить кнопку добавления (копировать первую карточку), кнопку удаления карточки. В хедере на обеих страницах должна быть кнопка Домой