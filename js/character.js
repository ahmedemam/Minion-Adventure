
 class Vec {
     constructor(X = 0, Y = 0) {
         this.x = X;
         this.y = Y;
     }
     plus(other) {
         return new Vec(this.x + other.x, this.y + other.y);
     }
     times(factor) {
        return new Vec(this.x * factor, this.y * factor);
      }
      
 }
 class Person {
     constructor(X, Y, SIX, SIY, VELX, VELY, SX, SY, Ptype) {
         this.pos = new Vec(X,Y);
         this.Old = new Vec(X,Y);
         this.Size = new Vec(SIX, SIY);
         this.Velcoity = new Vec(VELX, VELY);
         this.Speed = new Vec(SX, SY);
         this.Type = Ptype;
         this.Jump = false;
     }
     getTop(){
         return this.pos.y;
     }
     getLeft(){
         return this.pos.x;
     }
     getBottom() {
         return this.pos.y + this.Size.y;
     };
     getRight() {
         return this.pos.x + this.Size.x;
     };
     setTop(a){
        this.pos.y = a;
    }
    setLeft(a){
        this.pos.x = a;
    }
     setBottom(a) {
        this.pos.y = a - this.Size.y;
    }
     setRight(a) {
        this.pos.x = a - this.Size.x;
    }
    getOldTop() {
        return this.Old.y;
    };
    getOldLeft() {
        return this.Old.x;
    };
     getOldBottom() {
        return this.Old.y + this.Size.y;
    };
    getOldRight() {
        return this.Old.x + this.Size.x;
    };

 }
 Object.setPrototypeOf(Person.prototype, Vec);

export {
    Vec,
    Person,
};