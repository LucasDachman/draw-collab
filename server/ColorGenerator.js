module.exports = class ColorGenerator {

    constructor() {
        // this.colors = ['red', 'green', 'blue'];
        this.colors = [
            '#3971bc',// darkBlue
            '#ec453f', // red
            '#f08b33', //orange
            '#252022', // black
            '#6de7eb', // lightBlue
            '#fceb42', // yellow
            '#a6398f' // purple
        ];
        this.index = 0;
    }

    nextColor() {
        if (this.index === this.colors.length) this.index = 0;
        return this.colors[this.index++];
    }
}