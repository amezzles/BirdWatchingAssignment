import Bird from './Bird.js';
import Photo from './Photo.js';
import * as THREE from 'three'; // Import THREE if not imported already

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

    // Function to change the image
    changeImage() {
        var img = document.getElementById('image');
        img.src = "./jsm/images/photoCapture.png";
    }

}