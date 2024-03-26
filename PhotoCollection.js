import Photo from './Photo.js';

export default class PhotoCollection{

    photos = []; //array of type Photo

    constructor(){
    }

    updatePhotoCollection(photo){
        this.birds.push(photo);
    }

}