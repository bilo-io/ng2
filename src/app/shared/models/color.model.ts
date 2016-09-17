export interface IColor {
    r: number;
    g: number;
    b: number;
    a: number;
}
export class Color implements IColor {

    public r: number;
    public g: number;
    public b: number;
    public a: number;

    constructor(public hex:string) {}
    
    public static hexRemoveAlpha(hex: string): string {
        if (hex.length > 7) {
            return '#' + hex.substr(3, hex.length - 3);
        } else {
            return hex;
        }
    }

    public static rgbFromHex(hex: string) {

    }
}