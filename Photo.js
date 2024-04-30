import Bird from './Bird.js';

export default class Photo {

    birdInFrame; //Bird type

    constructor(birdInFrame) {
        this.birdInFrame = birdInFrame;
    }

    getBirdInFrame(){
        return this.birdInFrame;
    }
}