import { MTLLoader } from './jsm/loaders/MTLLoader.js';
import { OBJLoader } from './jsm/loaders/OBJLoader.js';
import * as THREE from 'three';

class Bird {
    constructor(birdType, angle, radius, angularVelocity, scene) {
        this.birdType = birdType;
        this.mesh = null;
        this.isVisible = true;
        this.scene = scene;
        this.radius = radius;
        this.angle = angle;
        this.angularVelocity = angularVelocity;
        this.hasCompletedVerticalArc = false; // Flag to track vertical arc completion
        this.isActive = true; // Flag to track bird's activity
        const x = Math.cos(angle) * radius;
        const y = 25;
        const z = Math.sin(angle) * radius;
        this.loadModel(birdType, x, y, z);
        console.log(`Creating bird at (${x}, ${y}, ${z})`);
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

    move() {
        if (this.mesh && this.isVisible) {
            this.angle += this.angularVelocity;
            const speed = 0.2;

            const newX = Math.cos(this.angle) * this.radius;
            const newZ = Math.sin(this.angle) * this.radius;

            const verticalPhaseShift = Math.PI / 2;

            let verticalOffset = 22 + 20 * Math.sin(0.5 * this.angle + verticalPhaseShift); // Start at y = 25 and reach y = 45

            // Ensure that the bird's vertical motion reaches its peak at y = 45
            if (verticalOffset > 55) {
                verticalOffset = 55;
            }

            // Update positions
            this.mesh.position.x = newX;
            this.mesh.position.z = newZ;
            this.mesh.position.y = verticalOffset;

            // Update orientation to face the direction of movement
            const targetX = newX + Math.cos(this.angle);
            const targetZ = newZ + Math.sin(this.angle);
            this.mesh.lookAt(targetX, verticalOffset, targetZ);

            if (this.angularVelocity < 0) {
                this.mesh.rotateY(-Math.PI / 2); // Rotate -90 degrees for left movement
            } else {
                this.mesh.rotateY(Math.PI / 2); // Rotate 90 degrees for right movement
            }
            


            // Check if the bird has completed a vertical arc and reached the initial y position (25)
            if (Math.abs(this.mesh.position.y - 26) < 0.1) {
                this.hasCompletedVerticalArc = true;
            }

            // Hide the bird if it has completed the vertical arc and reached the initial y position (25)
            if (Math.abs(this.mesh.position.y - 25) < 0.1 && this.hasCompletedVerticalArc) {
                this.hide();
            }
        }
    }

    hide() {
        if (this.mesh) {
            this.mesh.visible = false;
            this.isVisible = false;
            console.log('Bird hidden');
            this.isActive = false; // Set bird's activity flag to false when hidden
        }
    }
}

export default Bird;


