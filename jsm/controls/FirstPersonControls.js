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

        this.constrainVertical = true;
        this.verticalMin = Math.PI / 1.3; //default = 0 radians (0 degrees)
        this.verticalMax = Math.PI / 2.4; //default = Math.PI (180 degrees)

        // private variables
        let lat = 0;
        let lon = 0;

        this.onKeyDown = function (event) {
            switch (event.code) {
                case 'ArrowUp':
                case 'KeyW':
                    console.log('up pressed');
                    this.moveUp = true;
                    break;
                case 'ArrowDown':
                case 'KeyS':
                    console.log('down pressed');
                    this.moveDown = true;
                    break;
                case 'ArrowLeft':
                case 'KeyA':
                    this.lookLeft = true;
                    break;
                case 'ArrowRight':
                case 'KeyD':
                    this.lookRight = true;
                    break;
            }
        };
        
        this.onKeyUp = function (event) {
            switch (event.code) {
                case 'ArrowUp':
                case 'KeyW':
                    this.moveUp = false;
                    break;
                case 'ArrowDown':
                case 'KeyS':
                    this.moveDown = false;
                    break;
                case 'ArrowLeft':
                case 'KeyA':
                    this.lookLeft = false;
                    break;
                case 'ArrowRight':
                case 'KeyD':
                    this.lookRight = false;
                    break;
            }
        };
        
        this.update = function () {
            return function update(delta) {
                if (this.enabled === false) return;

                let actualHorizontalLookSpeed = delta * this.lookSpeed * 1.3;
                let actualVerticalLookSpeed = delta * this.lookSpeed * 0.02; 
                
                //horizontal movement
                lon += actualHorizontalLookSpeed * (this.lookRight ? 1 : 0) - actualHorizontalLookSpeed * (this.lookLeft ? 1 : 0);
                
                //vertical movement
                lat += actualVerticalLookSpeed * (this.moveUp ? 1 : 0) - actualVerticalLookSpeed * (this.moveDown ? 1 : 0);

                const phi = MathUtils.degToRad(90) - lat;
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
