import { v4 as v4uuid } from "uuid";

import { TimelineEvent, VRM } from "../types";

export default class ChangeOfVrm implements TimelineEvent {

    readonly id = v4uuid();
    date: Date;
    from: VRM;
    to: VRM;

    /**
     *
     */
    constructor(date: Date, from: VRM, to: VRM) {
        this.date = date;
        this.from = from;
        this.to = to;
    }
}