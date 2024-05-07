import { MathUtils, Spherical, Vector3 } from 'three';

const _spherical = new Spherical();
const _target = new Vector3();

class FirstPersonControls {
    constructor(camera, domElement) {
        this.camera = camera;
        this.domElement = domElement;

        // API
        this.enabled = true;
        this.lookSpeed = 0.005;

        this.moveUp = false;
        this.moveDown = false;
        this.lookLeft = false;
        this.lookRight = false;

        // private variables
        let lat = 0;
        let lon = 0;

        this.onKeyDown = function (event) {
            switch (event.code) {
                case 'ArrowUp':
                    this.moveUp = true;
                    break;
                case 'ArrowDown':
                    this.moveDown = true;
                    break;
                case 'ArrowLeft':
                    this.lookLeft = true;
                    break;
                case 'ArrowRight':
                    this.lookRight = true;
                    break;
            }
        };

        this.onKeyUp = function (event) {
            switch (event.code) {
                case 'ArrowUp':
                    this.moveUp = false;
                    break;
                case 'ArrowDown':
                    this.moveDown = false;
                    break;
                case 'ArrowLeft':
                    this.lookLeft = false;
                    break;
                case 'ArrowRight':
                    this.lookRight = false;
                    break;
            }
        };

        this.update = function () {
            return function update(delta) {
                if (this.enabled === false) return;

                let actualLookSpeed = delta * this.lookSpeed;

                lon += actualLookSpeed * (this.lookRight ? 1 : 0) - actualLookSpeed * (this.lookLeft ? 1 : 0);
                lat += actualLookSpeed * (this.moveUp ? 1 : 0) - actualLookSpeed * (this.moveDown ? 1 : 0);

                lat = Math.max(-85, Math.min(85, lat));

                let phi = MathUtils.degToRad(90 - lat);
                const theta = MathUtils.degToRad(lon);

                const targetPosition = this.camera.position.clone();
                targetPosition.add(new Vector3(Math.sin(phi) * Math.cos(theta), Math.cos(phi), Math.sin(phi) * Math.sin(theta)));

                this.camera.lookAt(targetPosition);
            };
        }();

        this.dispose = function () {
            window.removeEventListener('keydown', this.onKeyDown.bind(this));
            window.removeEventListener('keyup', this.onKeyUp.bind(this));
        };

        window.addEventListener('keydown', this.onKeyDown.bind(this));
        window.addEventListener('keyup', this.onKeyUp.bind(this));
    }
}

export { FirstPersonControls };
