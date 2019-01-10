import {loadLevel} from "./loader.js";
import {Game} from "./game.js";
import {map} from "./menu.js";
let MinionChar = "hero1.png";
// var element1 = document.getElementById("start");
// var element2 = document.getElementById("pause");
// var element3 = document.getElementById("sound");
// var element4 = document.getElementById("exit");

// element2.style.display = "none";
// element1 = addEventListener("click",StartFunction);
// element2 = addEventListener("click",PauseFunction);
// element3 = addEventListener("click",SoundFunction);
// element4 = addEventListener("click",ExitFunction);


 let gameObj;
function StartFunction(level=0)
{
    // let startMenu = document.getElementById("startMenu");
    // startMenu.style.display = "none";
    map(level+1);
    document.getElementById("lifes").textContent="3";
    let ret = loadLevel(level,MinionChar);
    gameObj = new Game(level,3,ret[0],ret[1],1000/24,0);
    gameObj.start();
}
//StartFunction();
function PauseFunction()
{

}

function SoundFunction()
{
    
}

function ExitFunction()
{
    
}
function setCharacter(character){
    if(character==1)
        MinionChar="hero1.png";
    else MinionChar="hero2.png";
}   
export{
    gameObj,
    StartFunction,
    setCharacter
}