import Bird from './Bird.js';

export default class BirdCollection{

    birds = []; //array of type Bird

    constructor(){

    }

    updateBirdCollection(bird){
        this.birds.push(bird);
    }

}