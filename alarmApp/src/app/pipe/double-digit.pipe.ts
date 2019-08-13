import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'doubleDigit'
})
export class DoubleDigitPipe implements PipeTransform {

    transform( value: number, args: number = 2 ): any {
        let val = value.toString();

        while (val.length < args) {
            val = '0' + val;
        }

        return val;
    }
}
