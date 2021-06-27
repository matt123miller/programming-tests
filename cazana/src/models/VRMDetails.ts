
import { TimelineEvent, VRM } from "../types";

export default class VRMDetails implements TimelineEvent {

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