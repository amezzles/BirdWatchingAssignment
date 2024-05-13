import { MTLLoader } from './jsm/loaders/MTLLoader.js';
import { OBJLoader } from './jsm/loaders/OBJLoader.js';
import * as THREE from 'three';

class TerrainGenerator {
    constructor(scene) {
        this.scene = scene;
        this.treeModelsLarge = [];
        this.treeModelsSmall = [];
        this.grassModels = [];
        this.existingPositions = [];
        this.playerPosition = { x: 0, z: 0 };
    }

    loadModel(path, mtlFile, objFile) {
        return new Promise((resolve, reject) => {
            const mtlLoader = new MTLLoader();
            mtlLoader.setPath(path);
            mtlLoader.load(mtlFile, materials => {
                materials.preload();
                const objLoader = new OBJLoader();
                objLoader.setMaterials(materials);
                objLoader.setPath(path);
                objLoader.load(objFile, object => {
                    resolve(object);
                }, undefined, reject);
            });
        });
    }

    async init() {
        try {
            const tree1 = await this.loadModel('Assets/', 'Tree_1.mtl', 'Tree_1.obj');
            tree1.name = 'tree1';
            this.treeModelsSmall.push(tree1);

            const tree2 = await this.loadModel('Assets/', 'Tree_2.mtl', 'Tree_2.obj');
            tree2.name = 'tree2';
            this.treeModelsSmall.push(tree2);

            const tree3 = await this.loadModel('Assets/', 'Tree_3.mtl', 'Tree_3.obj');
            tree3.name = 'tree3';
            this.treeModelsLarge.push(tree3);

            const grass1 = await this.loadModel('Assets/', 'grass1_.mtl', 'grass1_.obj');
            this.grassModels.push(grass1);

            const grass2 = await this.loadModel('Assets/', 'grass2_.mtl', 'grass2_.obj');
            this.grassModels.push(grass2);

            const leafPile = await this.loadModel('Assets/', 'leaf_pile.mtl', 'leaf_pile.obj');
            leafPile.name = 'leaf pile';
            this.grassModels.push(leafPile);

            this.populateScene();
        } catch (error) {
            console.error('Failed to load models', error);
        }
    }

    clearTrees() {
        const treeNames = ['tree1', 'tree2', 'tree3'];

        // Remove tree objects from the scene
        for (let i = this.scene.children.length - 1; i >= 0; i--) {
            const obj = this.scene.children[i];
            if (treeNames.includes(obj.name)) {
                this.scene.remove(obj);
            }
        }

        // Clear positions associated with trees
        this.existingPositions = [];
    }

    addObject(models, minRadius, maxRadius, minDistance, baseScaleFactor) {
        for (let tries = 0; tries < 5; tries++) {
            const angle = Math.random() * Math.PI * 2; // 0 to 360 degrees
            const radius = Math.random() * (maxRadius - minRadius) + minRadius;
            const posX = this.playerPosition.x + radius * Math.cos(angle);
            const posZ = this.playerPosition.z + radius * Math.sin(angle);

            const isPositionValid = this.existingPositions.every(pos => {
                return Math.sqrt(Math.pow(pos.x - posX, 2) + Math.pow(pos.z - posZ, 2)) > minDistance;
            });

            if (isPositionValid) {
                const randomIndex = Math.floor(Math.random() * models.length);
                const originalObject = models[randomIndex];
                const obj = originalObject.clone();

                // Apply random scale factor for trees
                let scaleFactor = baseScaleFactor;
                if (models === this.treeModelsLarge || models === this.treeModelsSmall) {
                    scaleFactor = Math.random() * (4 - 3.5) + 3.5; // Random scale between 3.5 and 4
                }
                
                obj.position.set(posX, 0, posZ);
                obj.rotation.set(0, Math.random() * Math.PI * 2, 0);
                obj.scale.set(scaleFactor, scaleFactor, scaleFactor);
                this.scene.add(obj);
                this.existingPositions.push({ x: posX, z: posZ });
                return;
            }
        }
    }

    generateTrees(numLargeTrees, spacingLarge, numSmallTrees, spacingSmall) {
        this.clearTrees();

        for (let i = 0; i < numLargeTrees; i++) {
            this.addObject(this.treeModelsLarge, 60, 150, spacingLarge, 4, 'tree3');
        }

        for (let i = 0; i < numSmallTrees; i++) {
            this.addObject(this.treeModelsSmall, 80, 150, spacingSmall, 3, 'tree1/tree2');
        }

        console.log(`Generated ${numLargeTrees} large trees and ${numSmallTrees} small trees.`);
    }

    populateScene() {
        for (let i = 0; i < 600; i++) {
            this.addObject(this.treeModelsLarge, 60, 150, 6, 4);
        }
        for (let i = 0; i < 100; i++) {
            this.addObject(this.treeModelsSmall, 60, 150, 10, 3);
        }
        for (let i = 0; i < 2000; i++) {
            this.addObject(this.grassModels, 20, 100, 1, 15);
        }
    }
}

export default TerrainGenerator;


