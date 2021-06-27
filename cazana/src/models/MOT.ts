import { VRM, TimelineEvent } from "../types";


export default class MOT implements TimelineEvent {
    date: Date;
    mileage: Number;
    result: Boolean;

    /**
     *
     */
    constructor(date:Date, mileage: Number, result: Boolean) {
        this.date = date;
        this.mileage = mileage;
        this.result = result;
    }
}

// - date
//     - mileage
//     - result(pass / fail)