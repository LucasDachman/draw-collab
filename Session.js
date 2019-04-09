module.exports = class Session {
    constructor(name) {
        console.log('got it!');
        
        this.name = name;
        this.mouseX = 0;
        this.mouseY = 0;
        this.timer = 0;
        this.resetTimer()
    }

    resetTimer() {
        this.timer = 10;
    }

    decrementTimer() {
        this.timer -= 1;
    }
}