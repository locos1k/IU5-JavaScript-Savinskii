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