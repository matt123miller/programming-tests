import { v4 as v4uuid } from "uuid";

import { Unique, VRM, Make, Model, TimelineEvent } from "../types";
import Timeline from '../Timeline';

export default class Vehicle implements Unique {
    readonly  id = v4uuid();
    regDate: Date;
    vrm: VRM;
    make: Make;
    model: Model;

    private _timeline = new Timeline();
    public get timeline() {
        // Potentially make this lazily evaluated and sort whenever it's requested
        return this._timeline.events;
    }
    /**
     *
     */
    constructor(regDate: Date, vrm: VRM, make: Make, model: Model) {
        this.regDate = regDate;
        this.vrm = vrm;
        this.make = make;
        this.model = model;

        // Does the creation count as an event? We have a registration date after all
    }

    addToTimeline(newEvent: TimelineEvent) : Array<TimelineEvent> {
        
        this._timeline.add(newEvent);
        
        // Starting to have mixed feelings about returning the timeline
        return this.timeline;
    }

    /**
     * Call through to the Timeline but accessible to other code who doesn't 
     * know or care about the timeline.
     */
    calculateMileageValues() {
        return this._timeline.calculateMileageValues();
    }

}
