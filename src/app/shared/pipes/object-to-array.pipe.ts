import { Pipe } from '@angular/core';

@Pipe({
    name: 'objToArray',
    pure: false
})
export class ObjToArray {
    transform(object: any) {
        var newArray = [];
        for(var key in object) {
            newArray.push(object[key]);
        }
        return newArray;
    }
}