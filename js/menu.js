import {
    gameObj,
    StartFunction,
    setCharacter
} from "./main.js";

import {
    setMuted
} from "./Sound.js";
let menuDiv = document.getElementById('MenuShow');
let divCharachter = document.getElementById('char_menu');
let isEsc = false;
window.addEventListener('keyup', function (key) {
    if (key.keyCode === 27) { // escape char
        if (gameObj) {
            gameObj.pauseAndPlay();
        }
        if (isEsc === false) { // false means show menu
            menuDiv.style.display = "block";
            if (!gameObj)
                divCharachter.style.display = "block";
            isEsc = true;
            // Pause
        } else if (isEsc === true) { // true means hide menu
            menuDiv.style.display = "none";
            divCharachter.style.display = "none";
            isEsc = false;
            gameObj.start();
        }
    }
});


// start game button - load levels
let startGame = document.getElementById('startGame');
startGame.addEventListener('click', function () {
    if (!gameObj) {
        StartFunction(0);
        menuDiv.style.display = "none";
        divCharachter.style.display = "none";
        isEsc = false;
    }
});
// continu game button - disapled / enabled
let continuGame = document.getElementById('continuGame');
continuGame.addEventListener('click', function () {
    if (gameObj) {
        gameObj.running = true;
        menuDiv.style.display = "none";
        gameObj.start();
    }

});
// play/mute sound
let playSound = document.getElementById('playSound');
playSound.addEventListener('click', function () {
    //debugger;
    setMuted();
});
// exit game
let exitButton = document.getElementById('exitButton');
exitButton.addEventListener('click', function () {
    // ask user for exit, save data and close the tab 
    // please enter your name
    let confirmAction = confirm("Are you sure?");
    let userName = "";
    if (confirmAction === true) {
        saveAndShow();
        window.opener = self;
        ///////////////////// error not working closed 
    }
});

//////////////////////////////////////////
let choosenHero = 1;
let hero1 = document.getElementById('hero1');
let hero2 = document.getElementById('hero2');
hero1.addEventListener('click', function () {
    choosenHero = 1;
    setCharacter(choosenHero);
});
hero2.addEventListener('click', function () {
    choosenHero = 2;
    setCharacter(choosenHero);
});
///////////////////////////////////////////////
function map(level) {
    let circle_image = document.getElementsByClassName("circle");
    if (level === 1) {
        circle_image[0].src = "../assets/green.png";
    } else if (level === 2) {
        circle_image[1].src = "../assets/green.png";
    } else if (level === 3) {
        circle_image[2].src = "../assets/green.png";
    } else {
        console.log("No level matched");
    }
}

function saveAndShow() {
    let userName = prompt("Enter your name");
    let score = parseInt(document.getElementById("score").textContent);
    let autoIncrement = 0;
    if (!localStorage.getItem("AutoIncrement")) {
        localStorage.setItem("AutoIncrement", "1");
        autoIncrement = 1;
    } else {
        autoIncrement = parseInt(localStorage.getItem("AutoIncrement"));
    }
    if (score > 0) {
        let player={
            playerId:autoIncrement+"",
            playerName:userName+"",
            playerScore:score+""
        };
        window.localStorage.setItem('ID-'+autoIncrement, JSON.stringify(player));
        autoIncrement++;   
        localStorage.setItem("AutoIncrement",autoIncrement);
    }
    showTable(autoIncrement);
}

function showTable(autoIncrement) {
    document.getElementById("MenuShow").style.display="none";
    document.getElementById("char_menu").style.display="none";
    document.getElementsByClassName("world")[0].style.display="none";
    let myTableDiv = document.getElementById("myDynamicTable");
    let table = document.getElementById("players");
    table.border = '1';
    for (let i = 1; i < autoIncrement; i++) {
        let tr = document.createElement('TR');
        table.appendChild(tr);
        let playerObj = JSON.parse(localStorage.getItem("ID-"+i));
        if(playerObj){
            Object.keys(playerObj).forEach(function (item) {
                let td = document.createElement('TD');
                td.width = '75';
                td.innerHTML = playerObj[item];
                //td.appendChild(document.createTextNode("id"));
                tr.appendChild(td);
            });
        }
      }
    myTableDiv.appendChild(table);
    myTableDiv.style.display="block";
    }
export {
    map,
    saveAndShow
}