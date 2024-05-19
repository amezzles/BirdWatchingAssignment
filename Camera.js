import Bird from './Bird.js';
import Photo from './Photo.js';
import * as THREE from 'three'; // Import THREE if not imported already

export default class Camera {

    birdInFrameBool; //boolean type
    birdInFrame; //Bird type

    constructor() {
        this.birdInFrameBool = false;
        this.birdInFrame = null; // Initialize birdInFrame to null
    }

    // Method to set the bird in frame
    setBirdInFrame(bird) {
        this.birdInFrame = bird;
        this.birdInFrameBool = true;
    }

    // Method to unset the bird in frame
    unsetBirdInFrame() {
        this.birdInFrame = null;
        this.birdInFrameBool = false;
    }

    takePhoto() {
        if (this.birdInFrameBool && this.birdInFrame !== null) {
            return new Photo(); // Assuming Photo constructor takes no arguments
        } else {
            console.log('No bird in frame to capture.');
            return null;
        }
    }

    // Method to check if the bird is in frame
    isBirdInFrame() {
        return this.birdInFrameBool;
    }

    // Method to get the bird in frame
    getBirdInFrame() {
        return this.birdInFrame;
    }
}
