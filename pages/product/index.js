import { HeaderComponent } from "../../components/header/index.js";
import { ProductComponent } from "../../components/product/index.js";
import { MainPage } from "../main/index.js";

export class ProductPage {
    constructor(parent, id, data) {
        this.parent = parent;
        this.id = id;
        this.data = data;
    }

    get pageRoot() {
        return document.getElementById('product-page');
    }

    getCurrent() {
        return this.data.find(item => item.id === this.id);
    }

    getHTML() {
        return `
            <div>
                <div id="header-root"></div>

                <div class="container mt-5">
                    <div id="product-page"></div>
                </div>
            </div>
        `;
    }

    clickHome() {
        const page = new MainPage(this.parent);
        page.render();
    }

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
}