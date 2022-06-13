class Utils {
    constructor() {}
    getRandomColor() {
        let r = 255 * Math.random() | 0,
            g = 255 * Math.random() | 0,
            b = 255 * Math.random() | 0;
        return 'rgb(' + r + ',' + g + ',' + b + ')';
    }

    random(min, max) {
        return Math.round(Math.random() * (max - min) + min)
    }


}