import { v4 as v4uuid } from "uuid";

import { VRM, TimelineEvent } from "../types";


export default class MOT implements TimelineEvent {
    readonly id = v4uuid();
    date: Date;
    mileage: number;
    result: Boolean;

    /**
     *
     */
    constructor(date:Date, mileage: number, result: Boolean) {
        this.date = date;
        this.mileage = mileage;
        this.result = result;
    }
}