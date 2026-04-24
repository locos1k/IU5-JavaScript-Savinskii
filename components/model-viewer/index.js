import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";

export class ModelViewerComponent {
    constructor(parent) {
        this.parent = parent;
        this.scene = null;
        this.camera = null;
        this.renderer = null;
        this.controls = null;
        this.earthPlane = null;
    }

    getHTML() {
        return `
            <div class="model-viewer-wrapper mt-4">
                <h4 class="mb-3">Изображение Земли</h4>

                <div id="model-canvas-container" class="model-canvas-container"></div>

                <div class="mt-3 d-flex gap-2 flex-wrap">
                    <button id="zoom-in-btn" class="btn details-btn">+</button>
                    <button id="zoom-out-btn" class="btn details-btn">-</button>
                    <button id="view-front-btn" class="btn details-btn">Спереди</button>
                    <button id="view-back-btn" class="btn details-btn">Сзади</button>
                    <button id="view-left-btn" class="btn details-btn">Слева</button>
                    <button id="view-right-btn" class="btn details-btn">Справа</button>
                </div>
            </div>
        `;
    }

    initThree(imagePath) {
        const container = document.getElementById("model-canvas-container");

        const width = container.clientWidth;
        const height = 430;

        this.scene = new THREE.Scene();
        this.scene.background = new THREE.Color(0xf5f5f5);

        this.camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
        this.camera.position.set(0, 0, 5);

        this.renderer = new THREE.WebGLRenderer({ antialias: true });
        this.renderer.setSize(width, height);
        container.appendChild(this.renderer.domElement);

        const ambientLight = new THREE.AmbientLight(0xffffff, 2);
        this.scene.add(ambientLight);

        const textureLoader = new THREE.TextureLoader();

        textureLoader.load(
            imagePath,
            (texture) => {
                const geometry = new THREE.PlaneGeometry(4, 2.5);
                const material = new THREE.MeshBasicMaterial({
                    map: texture,
                    side: THREE.DoubleSide
                });

                this.earthPlane = new THREE.Mesh(geometry, material);
                this.scene.add(this.earthPlane);

                this.controls = new OrbitControls(this.camera, this.renderer.domElement);
                this.controls.enableDamping = true;
                this.controls.target.set(0, 0, 0);
                this.controls.update();

                this.animate();
            },
            undefined,
            () => {
                container.innerHTML = `<div class="p-3 border rounded">Не удалось загрузить изображение Земли</div>`;
            }
        );
    }

    setFrontView() {
        this.camera.position.set(0, 0, 5);
        this.controls.target.set(0, 0, 0);
        this.controls.update();
    }

    setBackView() {
        this.camera.position.set(0, 0, -5);
        this.controls.target.set(0, 0, 0);
        this.controls.update();
    }

    setLeftView() {
        this.camera.position.set(-5, 0, 0);
        this.controls.target.set(0, 0, 0);
        this.controls.update();
    }

    setRightView() {
        this.camera.position.set(5, 0, 0);
        this.controls.target.set(0, 0, 0);
        this.controls.update();
    }

    zoomIn() {
        this.camera.position.multiplyScalar(0.9);
        this.controls.update();
    }

    zoomOut() {
        this.camera.position.multiplyScalar(1.1);
        this.controls.update();
    }

    addListeners() {
        document.getElementById("zoom-in-btn").addEventListener("click", this.zoomIn.bind(this));
        document.getElementById("zoom-out-btn").addEventListener("click", this.zoomOut.bind(this));
        document.getElementById("view-front-btn").addEventListener("click", this.setFrontView.bind(this));
        document.getElementById("view-back-btn").addEventListener("click", this.setBackView.bind(this));
        document.getElementById("view-left-btn").addEventListener("click", this.setLeftView.bind(this));
        document.getElementById("view-right-btn").addEventListener("click", this.setRightView.bind(this));
    }

    animate() {
        requestAnimationFrame(this.animate.bind(this));

        if (this.controls) {
            this.controls.update();
        }

        this.renderer.render(this.scene, this.camera);
    }

    render(imagePath) {
        const html = this.getHTML();
        this.parent.insertAdjacentHTML("beforeend", html);
        this.initThree(imagePath);
        this.addListeners();
    }
}