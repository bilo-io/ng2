export class Address {
    public fields:string[] = [];
    constructor(public address:string) {
        this.fields = this.address.split(',');
    }

    public static getAddressUpToIndex(index: number, address: string) {
        var addressArray = address.split(',');
        var addressString: string = '';
        for (var i = 0; i < addressArray.length && i < index; i++) {
            addressString += addressArray[i];
            if (i < index - 1 && i < addressArray.length - 1) {
                addressString += ', ';
            }
        }
        return addressString;
    }
}