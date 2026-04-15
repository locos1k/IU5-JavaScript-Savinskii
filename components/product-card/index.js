export class ProductCardComponent {
    constructor(parent) {
        this.parent = parent;
    }

    getHTML(data) {
        return `
            <div class="card" style="width: 300px;">
                <img
                    class="card-img-top"
                    src="${data.src}"
                    alt="${data.title}"
                    style="height: 200px; object-fit: cover;"
                >
                <div class="card-body">
                    <h5 class="card-title">${data.title}</h5>
                    <p class="card-text">${data.text}</p>
                    <p class="card-text"><strong>Скорость на орбите:</strong> ${data.speed}</p>
                    <span class="badge orbit-badge mb-3">${data.type}</span>
                    <div>
                        <button
                            class="btn details-btn me-2"
                            id="click-card-${data.id}"
                            data-id="${data.id}"
                        >
                            Подробнее
                        </button>

                        <button
                            class="btn delete-btn"
                            id="delete-card-${data.id}"
                            data-id="${data.id}"
                        >
                            Удалить
                        </button>
                    </div>
                </div>
            </div>
        `;
    }

    addListeners(data, openListener, deleteListener) {
        document
            .getElementById(`click-card-${data.id}`)
            .addEventListener("click", openListener);

        document
            .getElementById(`delete-card-${data.id}`)
            .addEventListener("click", (e) => {
                const id = Number(e.target.dataset.id);
                deleteListener(id);
            });
    }

    render(data, openListener, deleteListener) {
        const html = this.getHTML(data);
        this.parent.insertAdjacentHTML('beforeend', html);
        this.addListeners(data, openListener, deleteListener);
    }
}