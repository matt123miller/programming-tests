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

    addToTimeline(newEvent: TimelineEvent) : Set<TimelineEvent> {
        
        this.timeline.add(newEvent);
        
        // Starting to have mixed feelings about returning the timeline
        return this.timeline;
    }

    // Task
    // Provide a way to estimate a vehicle’s current mileage using the timeline.
    // 1. Calculate the average annual mileage using the events in the timeline.
    // 2. Estimate the vehicle’s current mileage by projecting from the most recent 
    // event using the average annual mileage.
    // 3. If there are no timeline events with mileage, calculate using 7,900 miles 
    // per year as the average.






}
