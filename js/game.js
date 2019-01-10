import {
    Vec,
    Person
    // this.HeroObj
} from './character.js';
import {
    pI
} from './math.js';
//import {collideObject} from './collision.js';
import {
    Collider
} from './collision.js';
//import Engine from './engine.js';
import {
    hero,
    editHero
} from './loader.js'
// let hero = document.createElement('minion');
// hero.setAttribute("id","minion");
// hero.style.src="../assets/"+MinionChar;
// hero.style.left="2px";
// hero.style.top="20px";
// hero.style.height="60px";
// hero.style.width="30px";
// document.body.appendChild(hero);
export class Game {
    constructor(level,lives, world, hero,time_step,sl) {
        this.level = level;
        this.HeroObj = new Person(parseInt(hero.style.left), parseInt(hero.style.top), hero.width, hero.height, 1, 0, 0.5, -20, 'Hero');
        this.ColliderObj = new Collider(level);
        // this.Eng = new Engine(1000 / 30, this.update,this);
        //this.this.scroll_Left = 0;
        this.heroElement = hero;
        this.scroll_Left=sl;
        this.running = true;
        this.lives=lives;
        this.width=world.style.width;
        this.accumulated_time = 0; // Amount of time that's accumulated since the last update.
        this.animation_frame_request = undefined, // reference to the AFR
        this.time = undefined, // The most recent timestamp of loop execution.
        this.time_step = time_step, // 1000/30 = 30 frames per second
        this.updated = false; // Whether or not the update function has been called since the last cycle.
        this.run = function (time_stamp) { // This is one cycle of the game loop
            this.accumulated_time += time_stamp - this.time;
            this.time = time_stamp;
            if (this.accumulated_time >= this.time_step * 3) {
                this.accumulated_time = this.time_step;
            }
            while (this.accumulated_time >= this.time_step) {
                this.accumulated_time -= this.time_step;
                this.update(time_stamp);
                this.updated = true; // If the game has updated, we need to draw it again.
            }
            /* This allows us to only draw when the game has updated. */
            if (this.updated) {
                this.updated = false;
                this.update(time_stamp);
                //console.log(this.scroll_Left);
            }
            if(this.running)
                this.animation_frame_request = window.requestAnimationFrame(this.handleRun);
        }
        this.handleRun = (time_step) => {
            this.run(time_step);
        };
    }
    update() {
        if (controller.up && this.HeroObj.Jump == false) {
            this.HeroObj.Velcoity.y = this.HeroObj.Speed.y;
            this.HeroObj.Jump = true;
        }
        if (controller.left)
            this.HeroObj.Velcoity.x -= this.HeroObj.Speed.x;
        if (controller.right) {
            this.HeroObj.Velcoity.x += this.HeroObj.Speed.x;
        }
        this.HeroObj.Velcoity.y += 1;
        this.HeroObj.Velcoity.x *= 0.9;
        this.HeroObj.Old.x = this.HeroObj.pos.x;
        this.HeroObj.Old.y = this.HeroObj.pos.y;
        this.HeroObj.pos.x += this.HeroObj.Velcoity.x;
        this.HeroObj.pos.y += this.HeroObj.Velcoity.y;
        this.ColliderObj.collideObject(this.HeroObj,this.scroll_Left);
        this.heroElement.style.left=this.HeroObj.pos.x + "px";
        this.heroElement.style.top= this.HeroObj.pos.y + "px";
        let w = window.screen;
        let wid = w.width;
        let margin = wid / 2;
        let left = this.scroll_Left;
        let right = left + wid;
        let center = this.HeroObj.pos.plus(this.HeroObj.Size.times(0.5));
        if (center.x > right - margin)
            this.scroll_Left = center.x + margin - wid;
        this.scroll_Left = Math.min(this.scroll_Left, parseInt(this.width) - wid);
        window.scrollTo(this.scroll_Left, 0);
    }
    start() {
        this.accumulated_time = this.time_step;
        this.time = window.performance.now();
        this.animation_frame_request = window.requestAnimationFrame(this.handleRun);
    }
    stop() {
        if(this.animation_frame_request)
            this.window.cancelAnimationFrame(this.animation_frame_request);
    }
    pauseAndPlay(){
        this.running = !this.running;
    }
    restartLevel(){
        this.HeroObj.pos.x = 30;
        this.HeroObj.pos.y = 70;
        this.heroElement.style.left=this.HeroObj.pos.x + "px";
        this.heroElement.style.top= this.HeroObj.pos.y + "px";
        this.scroll_Left=0;
        window.scrollTo(this.scroll_Left,0);
    }
}
//let this.scroll_Left = 0;
let controller = {
    left: false,
    right: false,
    up: false,
    keyListener: function (event) {
        let key_state = (event.type == "keydown") ? 1 : 0;
        switch (event.keyCode) {
            case 37: //left key
                console.log("hello");
                controller.left = key_state;
                break;
            case 38: //up key
                controller.up = key_state;
                break;
            case 39: //right key
                controller.right = key_state;
                break;
        }
    }
}

window.addEventListener("keydown", controller.keyListener);
window.addEventListener("keyup", controller.keyListener);