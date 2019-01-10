import {
    LevelsObj,
    LevelsArrMap,
} from './Levels.js';

import {
    editFoodElement
} from './loader.js';
import{
    gameObj,
    StartFunction
} from './main.js';
import { stopTime } from './Timer.js';

import{
    playSound,
    playBackgroundSound
} from "./Sound.js";
import {
    saveAndShow
} from "./menu.js";
export class Collider {
    constructor(level){
        this.level=level;
        this.tile_size = LevelsObj[level].tileSize;
        this.columns = LevelsObj[level].columns;
        this.rows = LevelsObj[level].rows;
        this.colissionMap = LevelsArrMap[level];
    }

    collideObject(object,scrollLeft) {
        if(parseInt(gameObj.width)-object.getLeft()<40){
            object.setLeft(39);
            WinGame();
            return;
        }
            
        if (object.getLeft() < scrollLeft) {
            object.setLeft(scrollLeft);
            object.Velcoity.x = 0;
        } else if (object.getRight() > this.columns * this.tile_size) {
            object.setRight(this.columns * this.tile_size);
            object.Velcoity.x = 0;
        }
        if (object.getTop() < 0) {
            object.setTop(0);
            object.Velcoity.y = 0;
        } else if (object.getBottom() > this.rows * this.tile_size) {
            object.setBottom(this.rows * this.tile_size);
            object.Velcoity.y = 0;
            object.Jump = false;
            deadOnce();
        }
    
        let bottom, left, right, top, value ,ind;
        
        //CHECK TOP LEFT COLLISION
        top = Math.floor(object.getTop() / this.tile_size);
        left = Math.floor(object.getLeft() / this.tile_size);
        ind = top * this.columns + left;
        value = this.colissionMap[ind];
        collide(value,ind,this.level, object, left * this.tile_size, top * this.tile_size, this.tile_size);
    
        //CHECK TOP RIGHT COLLISION
        top = Math.floor(object.getTop() / this.tile_size);
        right = Math.floor(object.getRight() / this.tile_size);
        ind = top * this.columns + right;
        value = this.colissionMap[ind];
        collide(value,ind,this.level, object, right * this.tile_size, top * this.tile_size, this.tile_size);
        
        //CHECK BOTTOM LEFT COLLISION
        bottom = Math.floor(object.getBottom()/ this.tile_size);
        left = Math.floor(object.getLeft() / this.tile_size);
        ind = bottom * this.columns + left;
        value = this.colissionMap[ind] ;
        collide(value,ind,this.level, object, left * this.tile_size, bottom * this.tile_size, this.tile_size);
        
        
        bottom = Math.floor(object.getBottom()/ this.tile_size);
        left = Math.floor(object.getLeft() / this.tile_size);
        ind = bottom * this.columns + left;
        value = this.colissionMap[bottom * this.columns + left] ;
        collide(value,ind,this.level, object, left * this.tile_size, bottom * this.tile_size, this.tile_size);
        
        //CHECK BOTTOM RIGHT COLLISION
        bottom = Math.floor(object.getBottom()/ this.tile_size);
        right = Math.floor(object.getRight() / this.tile_size);
        ind = bottom * this.columns + right;
        value = this.colissionMap[bottom * this.columns + right];
        collide(value,ind,this.level, object, right * this.tile_size, bottom * this.tile_size, this.tile_size);
    }    

}
function collide(value,ind,level, object, tile_x, tile_y, tile_size) {
    /*
  0 background
	1 tiles
	2 enimies
	3 box
	4 food
    5 hole
*/  
    let flagElement = document.getElementById("flagLevel");
    switch (value) {
        case 1:
            collideTop(object, tile_y);
            collideBottom(object, tile_y + tile_size);
            break;
        case 2:
            let bo=true;
            if(collideRight(object, tile_x + tile_size))
                bo=false;
            else if(collideLeft(object, tile_x))
                bo=false;
            else if(collideTop(object, tile_y))
                bo=false;
            if(!bo){
                deadOnce();
                return;
            }
            break;
        case 3:
            collideRight(object, tile_x + tile_size);
            collideLeft(object, tile_x);
            collideTop(object, tile_y);
            collideBottom(object, tile_y + tile_size);
            break;
        case 4:
            //playSound(1);
            editFoodElement(ind,level);
            let score = document.getElementById("score").textContent;
            document.getElementById("score").textContent = parseInt(score) + 10 ;
            break;
    }
  
    // if(collideRight(object,parseInt(flagElement.style.left)+parseInt(flagElement.width)))
    //     console.log("WIN");
    // else if(collideLeft(object,parseInt(flagElement.style.left)))
    //     console.log("WIN");
    // else if(collideTop(object,parseInt(flagElement.style.top)))
    //     console.log("WIN");
}
function collideBottom(object, tile_bottom) {
    if (object.getTop() < tile_bottom && object.getOldTop() >= tile_bottom) {
        object.setTop(tile_bottom);
        object.Velcoity.y = 0;
        return true;

    }
    return false;
}
function collideLeft(object, tile_left) {
   // debugger;
    if (object.getRight() > tile_left && object.getOldRight() <= tile_left) {
        object.setRight(tile_left-0.1);
        object.Velcoity.x = 0;
        return true;
    }
    return false;
}

function collideRight(object, tile_right) {
    if (object.getLeft() < tile_right && object.getOldLeft() >= tile_right) {
        object.setLeft(tile_right);
        object.Velcoity.x = 0;
        return true;
    }
    return false;
}

function collideTop(object, tile_top) {
    if (object.getBottom()> tile_top && object.getOldBottom() <= tile_top) {
        object.setBottom(tile_top -0.1);
        object.Velcoity.y = 0;
        object.Jump = false;
        return true;
    }
    return false;
}

function restart(){
    gameObj.restartLevel();    
}

function deadOnce(){
    //playSound(2);
    gameObj.lives--;
    document.getElementById("lifes").textContent = gameObj.lives ;
    restart();
    if(gameObj.lives<=0){
        playSound(3);
        gameObj.running=false;
        let winElement = document.getElementById("gameOver");
        document.getElementById("Lscore").textContent=document.getElementById("score").textContent;        
        winElement.style.display="block";
        setTimeout(()=>{winElement.style.display="none";},2000);
        saveAndShow();
    }
}
function WinGame(){
    debugger;
    playSound(4);
    gameObj.running=false;
    let nextLevel = gameObj.level +1;
    if(nextLevel<3){
        document.getElementById("Wscore").textContent=document.getElementById("score").textContent;
        let winElement = document.getElementById("winScreen");
        let worldElement = document.getElementsByClassName("world")[0];
        if (worldElement.parentNode) {
            worldElement.parentNode.removeChild(worldElement);
          }
        winElement.style.display="block";
        setTimeout(()=>{winElement.style.display="none";},2000);
        stopTime();
        StartFunction(nextLevel);
    }
    else saveAndShow();
   
}
