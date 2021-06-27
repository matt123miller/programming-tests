import { v4 as v4uuid } from "uuid";

import { TimelineEvent, VRM } from "../types";

export default class ChangeOfVrm implements TimelineEvent {

    readonly id = v4uuid();
    date: Date;
    from: VRM;
    to: VRM;

    /**
     * In a real system I'd probably change VRM via the vehicle instead and 
     * return this object. But for now this will do.
     */
    constructor(date: Date, from: VRM, to: VRM) {
        this.date = date;
        this.from = from;
        this.to = to;
    }
}