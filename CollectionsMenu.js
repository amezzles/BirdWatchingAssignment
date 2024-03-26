import BirdCollection from './BirdCollection.js';
import PhotoCollection from './PhotoCollection.js';

export default class CollectionsMenu {

    birdCollection; //type BirdCollection
    photoCollection; //type PhotoCollection

    constructor(){
        this.birdCollection = new BirdCollection();
        this.photoCollection = new PhotoCollection();
    }

    updateCollections(photo, bird){
        this.photoCollection.updatePhotoCollection(photo);
        this.birdCollection.updateBirdCollection(bird);
    }
}