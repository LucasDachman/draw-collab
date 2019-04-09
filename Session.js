module.exports = class Session {
    constructor(name, color) {
        console.log('got it!');
        
        this.name = name;
        this.mouseX = 0;
        this.mouseY = 0;
        this.timer = 0;
        this.resetTimer()
        this.color = color;
    }

    resetTimer() {
        this.timer = 10;
    }

    decrementTimer() {
        this.timer -= 1;
    }
}