import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader.js';
import * as THREE from 'three';

class Bird {
    constructor(birdType, positionX, positionY, positionZ, scene) {
        this.birdType = birdType;
        this.mesh = null;
        this.isVisible = true;
        this.scene = scene;
        this.loadModel(birdType, positionX, positionY, positionZ);
        console.log(`Creating bird at (${positionX}, ${positionY}, ${positionZ})`);
    }

    loadModel(birdType, x, y, z) {
        const mtlLoader = new MTLLoader();
        mtlLoader.setPath('Assets/Birds/');
        mtlLoader.load(`${birdType}.mtl`, (materials) => {
            materials.preload();
            const objLoader = new OBJLoader();
            objLoader.setMaterials(materials);
            objLoader.setPath('Assets/Birds/');
            objLoader.load(`${birdType}.obj`, (obj) => {
                this.mesh = obj;
                this.mesh.position.set(x, y, z);
                this.scene.add(this.mesh);
                console.log(`Bird added to scene at (${x}, ${y}, ${z})`);
            });
        });
    }

    move(dx, dy) {
        if (this.mesh && this.isVisible) {
            this.mesh.position.x += dx;
            this.mesh.position.y += dy;
            console.log(`Moved bird to (${this.mesh.position.x}, ${this.mesh.position.y})`);
        }
    }

    hide() {
        if (this.mesh) {
            this.mesh.visible = false;
            this.isVisible = false;
            console.log('Bird hidden');
        }
    }
}
