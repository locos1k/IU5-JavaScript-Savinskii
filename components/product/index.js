export class ProductComponent {
    constructor(parent) {
        this.parent = parent;
    }

    getHTML(data) {
        return `
            <div class="card mb-3" style="max-width: 900px;">
                <div class="row g-0">
                    <div class="col-md-5">
                        <img
                            src="${data.src}"
                            class="img-fluid rounded-start"
                            alt="${data.title}"
                            style="height: 100%; object-fit: cover;"
                        >
                    </div>
                    <div class="col-md-7">
                        <div class="card-body">
                            <h3 class="card-title">${data.title}</h3>
                            <p class="card-text">${data.details}</p>
                            <p class="card-text">
                                <small class="text-muted">Тип орбиты: ${data.type}</small>
                            </p>

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