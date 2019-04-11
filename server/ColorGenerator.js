module.exports = class ColorGenerator {

    constructor() {
        this.colors = ['red', 'green', 'blue'];
        this.index = 0;
    }

    nextColor() {
        if (this.index === this.colors.length) this.index = 0;
        return this.colors[this.index++];
    }
}