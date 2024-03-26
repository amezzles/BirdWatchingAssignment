import CollectionsMenu from './CollectionsMenu.js';
import Camera from './Camera.js';

export default class Player {

    collectionsMenu;
    camera;

    constructor(){
        this.collectionsMenu = new CollectionsMenu();
        this.camera = new Camera();
    }

    viewCollections(){
        return 0;
    }
}