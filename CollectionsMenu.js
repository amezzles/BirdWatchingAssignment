import BirdCollection from './BirdCollection.js';
import PhotoCollection from './PhotoCollection.js';

export default class CollectionsMenu {

    birdCollection; //type BirdCollection
    photoCollection; //type PhotoCollection

    constructor(birdCollection, photoCollection){
        this.birdCollection = birdCollection;
        this.photoCollection = photoCollection;
    }
}