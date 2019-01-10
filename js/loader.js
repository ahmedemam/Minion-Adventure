import {
    LevelsObj,
    LevelsArrMap,
    foodCollision,
} from './Levels.js';
import {
    startTime,
    stopTime,
    startWatch
} from './Timer.js';

import{
    playSound,
    playBackgroundSound
} from "./Sound.js";
/*
  0 background
	1 tiles
	2 enimies
	3 box
	4 food
    5 hole
    6 flag
*/
let hero = document.createElement('img');
let ArrayFood = new Map();
function loadLevel(level, MinionChar) {
    startTime();
    playBackgroundSound();
    let world = document.createElement("div");
    world.setAttribute("class", "world");
    let cloud = document.createElement("div");
    cloud.setAttribute("id", "cloud");
    let mountain = document.createElement("div");
    mountain.setAttribute("id", "mountain");
    let pines = document.createElement("div");
    pines.setAttribute("id", "pines");
    world.appendChild(cloud);
    world.appendChild(mountain);
    world.appendChild(pines);

    // draw hero
    let elementFlag = document.createElement('img');
    let tile_size = 30;
    world.style.width = LevelsObj[level].columns * tile_size + "px";
    document.getElementsByTagName("html")[0].style.width = LevelsObj[level].columns * tile_size + "px";
    hero.src = "assets/" + MinionChar;
    hero.style.left = "60px";
    hero.style.top = ((LevelsObj[level].rows - 5) * tile_size) + "px";
    hero.style.position = "absolute";
    hero.width = tile_size;
    hero.height = tile_size * 2;
    elementFlag.src = "assets/flag.png";
    elementFlag.setAttribute("id","flagLevel");
    elementFlag.style.top = ((LevelsObj[level].rows - 5) * tile_size) + "px";
    elementFlag.style.left = ((LevelsObj[level].columns - 2) * tile_size) + "px";
    elementFlag.style.position = "absolute";
    elementFlag.width = tile_size;
    elementFlag.height = 2 * tile_size;
    world.appendChild(hero);
    world.appendChild(elementFlag);
    // drawing 2 picture
    for (let i = 0; i < LevelsObj[level].rows; i++) {
        for (let j = 0; j < LevelsObj[level].columns; j++) {
            let arrValue = LevelsArrMap[level][i * LevelsObj[level].columns + j];
            let elementSrc = null;
            switch (arrValue) {
                case 1:
                    elementSrc = "assets/Tile2.png";
                    break;
                case 2:
                    elementSrc = "assets/enemy3.gif";
                    break;
                case 3:
                    elementSrc = "assets/box111.png";
                    break;
                case 4:
                    elementSrc = "assets/apple.png";
                    break;
                case 5:
                    elementSrc = "assets/18.png";
                    break;
            }
            if (elementSrc) {
                let element = document.createElement("img");
                element.src = elementSrc;
                element.style.top = (i * tile_size) + "px";
                element.style.position = "absolute";
                element.style.left = (j * tile_size) + "px";
                element.width = tile_size;
                element.height = tile_size;
                world.appendChild(element);
                if(arrValue==4)//food
                    ArrayFood.set(i * LevelsObj[level].columns + j,element);
            }
        }
    }
    document.body.appendChild(world);
    return [world,hero];
}

function editFoodElement(ind,level){
    //debugger;
    let element = ArrayFood.get(ind);
    element.style.display = "none";
    ArrayFood.set(ind,element);
    foodCollision(ind,level);
}
function editHero(left, top) {
    hero.style.left = left;
    hero.style.top = top;
}

export {
    loadLevel,
    hero,
    editHero,
    editFoodElement
}