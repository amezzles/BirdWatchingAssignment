import CollectionsMenu from './CollectionsMenu.js';

export default class Player {

    collectionsMenu;
    camera;

    constructor(collectionsMenu, camera){
        this.collectionsMenu = collectionsMenu;
        this.camera = camera;
    }

    viewCollections(){
        return 0;
    }
}