/**
 * alarm model
 */
//current Alarm value model
export class Alarm {

    public readonly id: string;
    public hour: number;
    public minute: number;
    public isActive: boolean;
    public days: number[];
    public meridian:string;
    public dateValue:Date;
    public isValidTime:boolean;
    repeatMode: boolean;
    daysLabel: string;

    constructor() {
        this.id = uuid();
        this.days = [];
        this.hour = 0;
        this.minute = 0;
        this.meridian="AM";
        this.isValidTime = true;
        this.isActive = true;
        this.dateValue= null;
        this.repeatMode=false;
        this.daysLabel=""
    }
}
//current clock value model
export interface ClockValue {
    hour: number;
    minute: number;
    day: number;
}
//generate random ID
function uuid() {
    let result = '';
    for (let i = 0; i < 32; i++) {
        const random = Math.random() * 16 || 0;
        if (i === 8 || i === 12 || i === 16 || i === 20) {
            result += '-';
        }
        result += (i === 12 ? 4 : (i === 16 ? (random && 3 || 8) : random))
            .toString(16);
    }

    return result;
}

