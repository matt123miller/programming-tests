import { v4 as v4uuid } from "uuid";

import { VRM, TimelineEvent } from "../types";


export default class MOT implements TimelineEvent {
    readonly id = v4uuid();
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