import { HeaderComponent } from "../../components/header/index.js";
import { ProductCardComponent } from "../../components/product-card/index.js";
import { ProductPage } from "../product/index.js";
import { products } from "../../data/products.js";

export class MainPage {
    constructor(parent) {
        this.parent = parent;
        this.data = products;
        this.filteredData = products;
    }

    get pageRoot() {
        return document.getElementById('main-page');
    }

    getHTML() {
        return `
            <div>
                <div id="header-root"></div>

                <div class="container mt-5">
                    <div class="d-flex justify-content-between align-items-center mb-4">
                        <input
                            id="filter-input"
                            type="text"
                            class="form-control w-50"
                            placeholder="Поиск"
                        >

                        <button id="add-card-button" class="btn add-btn">
                            Добавить
                        </button>
                    </div>

                    <div class="card p-3 mb-4">
                        <h4 class="mb-3">Домашнее задание</h4>

                        <div class="mb-3">
                            <label for="orbit-prefix-input" class="form-label">
                                Проверка префиксов строки перехода
                            </label>
                            <input
                                id="orbit-prefix-input"
                                type="text"
                                class="form-control"
                                placeholder="Введите строку, например geostationary"
                            >
                            <button id="count-prefix-button" class="btn details-btn mt-2">
                                Посчитать префиксы
                            </button>
                            <p id="prefix-result" class="mt-2 mb-0"></p>
                        </div>

                        <div>
                            <label class="form-label">
                                Сортировка букв в словах и сортировка слов
                            </label>
                            <button id="sort-orbit-words-button" class="btn details-btn">
                                Отсортировать названия орбит
                            </button>
                            <p id="sort-result" class="mt-2 mb-0"></p>
                        </div>
                    </div>

                    <div id="main-page" class="d-flex flex-wrap gap-3"></div>
                </div>
            </div>
        `;
    }

    addListeners() {
        document.getElementById("filter-input")
            .addEventListener("input", this.filterCards.bind(this));

        document.getElementById("add-card-button")
            .addEventListener("click", this.addCard.bind(this));

        document.getElementById("count-prefix-button")
            .addEventListener("click", this.countOrbitPrefixes.bind(this));

        document.getElementById("sort-orbit-words-button")
            .addEventListener("click", this.sortOrbitWords.bind(this));
    }

    countOrbitRequestPrefixes(orbitWordsCollection, orbitRequestString) {
        let orbitPrefixCount = 0;

        orbitWordsCollection.forEach((orbitWord) => {
            if (orbitRequestString.startsWith(orbitWord)) {
                orbitPrefixCount += 1;
            }
        });

        return orbitPrefixCount;
    }

    countOrbitPrefixes() {
        const orbitRequestInput = document.getElementById("orbit-prefix-input").value.toLowerCase();

        const orbitWordsCollection = [
            "g",
            "ge",
            "geo",
            "geos",
            "geost",
            "orbit",
            "station",
            "geostationary"
        ];

        const orbitPrefixCount = this.countOrbitRequestPrefixes(
            orbitWordsCollection,
            orbitRequestInput
        );

        document.getElementById("prefix-result").textContent =
            `Количество слов-префиксов: ${orbitPrefixCount}`;
    }

    formatOrbitSentence(orbitSentenceString) {
        let normalizedOrbitSentence = orbitSentenceString.trim();

        do {
            normalizedOrbitSentence = normalizedOrbitSentence.replaceAll("  ", " ");
        } while (normalizedOrbitSentence.includes("  "));

        const orbitWordsArray = normalizedOrbitSentence.split(" ");

        const sortedOrbitWordsArray = orbitWordsArray.map((orbitWord) => {
            const lowerOrbitWord = orbitWord.toLowerCase();
            const sortedLetters = lowerOrbitWord.split("").sort().join("");
            return sortedLetters;
        });

        sortedOrbitWordsArray.sort();

        const formattedOrbitWordsArray = sortedOrbitWordsArray.map((orbitWord) => {
            return orbitWord.charAt(0).toUpperCase() + orbitWord.slice(1).toLowerCase();
        });

        return formattedOrbitWordsArray.join(" ");
    }

    sortOrbitWords() {
        const orbitNamesSentence = this.data
            .map((orbitObject) => orbitObject.type)
            .join(" ");

        const formattedOrbitSentence = this.formatOrbitSentence(orbitNamesSentence);

        document.getElementById("sort-result").textContent =
            `Результат сортировки: ${formattedOrbitSentence}`;
    }

    filterCards(e) {
        const value = e.target.value.toLowerCase();

        this.filteredData = this.data.filter((item) =>
            item.title.toLowerCase().includes(value)
        );

        this.renderCards();
    }

    addCard() {
        const first = this.data[0];

        const newCard = {
            ...first,
            id: Date.now(),
            title: first.title + " (копия)"
        };

        this.data.push(newCard);
        this.filteredData = [...this.data];
        this.renderCards();
    }

    deleteCard(id) {
        this.data = this.data.filter(item => item.id !== id);
        this.filteredData = this.filteredData.filter(item => item.id !== id);
        this.renderCards();
    }

    clickCard(e) {
        const id = Number(e.target.dataset.id);
        const page = new ProductPage(this.parent, id, this.data);
        page.render();
    }

    clickHome() {
        this.render();
    }

    renderCards() {
        this.pageRoot.innerHTML = '';

        this.filteredData.forEach((item) => {
            const card = new ProductCardComponent(this.pageRoot);
            card.render(
                item,
                this.clickCard.bind(this),
                this.deleteCard.bind(this)
            );
        });
    }

    render() {
        this.parent.innerHTML = '';
        this.parent.insertAdjacentHTML('beforeend', this.getHTML());

        const header = new HeaderComponent(document.getElementById("header-root"));
        header.render(this.clickHome.bind(this), false);

        this.addListeners();
        this.renderCards();
    }
}