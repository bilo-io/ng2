export class RgbFormat {
    constructor(
        public red: number,
        public green: number,
        public blue: number,
        public alpha: number) { }
}
export class HsvFormat {
    constructor(
        public hue: number,
        public saturation: number,
        public brightness: number) { }
}
export class Color {

    public rgb: RgbFormat;
    public hsv: HsvFormat;
    constructor() {
    }
} 