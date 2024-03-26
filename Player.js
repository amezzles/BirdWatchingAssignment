import CollectionsMenu from './CollectionsMenu.js';
import Camera from './Camera.js';

export default class Player {

    collectionsMenu; //Collections Menu
    camera; //Camera Type

    constructor(){
        this.collectionsMenu = new CollectionsMenu();
        this.camera = new Camera();
    }

    viewCollections(){

    }
}