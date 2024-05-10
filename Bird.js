import { MTLLoader } from './jsm/loaders/MTLLoader.js';
import { OBJLoader } from './jsm/loaders/OBJLoader.js';
import * as THREE from 'three';

class Bird {
    constructor(birdType, positionX, positionY, positionZ, direction, scene) {
        this.birdType = birdType;
        this.mesh = null;
        this.isVisible = true;
        this.scene = scene;
        this.direction = direction;
        this.angle = 0;
        this.loadModel(birdType, positionX, positionY, positionZ);
        console.log(`Creating bird at (${positionX}, ${positionY}, ${positionZ})`);
    }

    loadModel(birdType, x, y, z) {
        const mtlLoader = new MTLLoader();
        mtlLoader.setPath('Assets/');
        mtlLoader.load(`${birdType}.mtl`, (materials) => {
            materials.preload();
            const objLoader = new OBJLoader();
            objLoader.setMaterials(materials);
            objLoader.setPath('Assets/');
            objLoader.load(`${birdType}.obj`, (obj) => {
                this.mesh = obj;
                this.mesh.position.set(x, y, z);
                this.mesh.scale.set(2, 2, 2);
                this.scene.add(this.mesh);             
                console.log(`Bird added to scene at (${x}, ${y}, ${z})`);
            });
        });
    }

    move(dx, dy) {
        if (this.mesh && this.isVisible) {
            this.angle += 0.008; // Controls the speed of the arc
            this.mesh.position.x += 0.2 * this.direction;  // Horizontal speed
            this.mesh.position.y = 30 + 20 * Math.sin(this.angle);
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

export default Bird;
