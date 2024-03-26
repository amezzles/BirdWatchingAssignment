import Bird from './Bird.js';
import Photo from './Photo.js';

export default class Camera {

    birdInFrameBool; //boolean type
    birdInFrame; //Bird type

    constructor() {
        this.birdInFrameBool = false;
    }

    takePhoto() {
        if (this.birdInFrameBool === true){
            return new Photo();
        }
    }

}