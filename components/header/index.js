export class HeaderComponent {
    constructor(parent) {
        this.parent = parent;
    }

    getHTML(showButton = false, buttonText = "Домой") {
        return `
        <header class="space-header">
            ${showButton ? `
                <div class="nav-left">
                    <button id="home-button" class="home-btn">
                        ${buttonText}
                    </button>
                </div>
            ` : ''}

            <div class="nav-logo">
                <a href="#" id="logo-link">
                    <img src="img/nasa-logo.png" alt="NASA">
                </a>
            </div>
        </header>
        `;
    }

    addListeners(listener, showButton = false) {
        if (showButton) {
            document.getElementById('home-button').onclick = listener;
        }

        document.getElementById('logo-link').onclick = listener;
    }

    render(listener, showButton = false, buttonText = "Домой") {
        const html = this.getHTML(showButton, buttonText);
        this.parent.insertAdjacentHTML('beforeend', html);
        this.addListeners(listener, showButton);
    }
}