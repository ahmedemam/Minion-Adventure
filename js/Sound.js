/// sound functions
let isMuted = true; // false: not muted - true: muted
console.log(isMuted);
//window.addEventListener("load", playBackgroundSound);
// play play ground sound
let soundObject = new Audio();
function playBackgroundSound() {
    soundObject.src = "../sound_assets/bgmusic.mpeg";
    soundObject.loop = true;
    soundObject.play();
    // let buttonClicked = document.getElementById("clickMe");
    // buttonClicked.addEventListener("click", switchSound)

}
function switchSound() {
    if (isMuted) {
        soundObject.pause();
        soundObject.currentTime = 0;
        soundObject.muted = true;
        soundObject.loop = false;
    } else {
        soundObject.play();
        soundObject.muted = false;
        soundObject.loop = true;
    }
}
//playBackgroundSound();

// play specific sound
function playSound(inputAction) {
    let soundObject = new Audio();
    if (isMuted === false) {
        if (inputAction === 1) // play food sound
        {
            soundObject.src = "../sound_assets/apple.mpeg";
        } else if (inputAction === 2) // play enemy crash
        {
            soundObject.src = "../sound_assets/enemy.mpeg";
        } else if (inputAction === 3) // play game over
        {
            soundObject.src = "../sound_assets/gameover.mpeg";
        } else if (inputAction === 4) // play winning sound
        {
            soundObject.src = "../sound_assets/winning.mpeg";
        }
        soundObject.play();
    }
}
function setMuted(){
    switchSound();
    isMuted = !isMuted;
}

export{
    playSound,
    playBackgroundSound,
    setMuted
}