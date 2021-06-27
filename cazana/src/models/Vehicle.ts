import { VRM, Make, Model, TimelineEvent } from "../types";


// Task
// Provide a way to estimate a vehicle’s current mileage using the timeline.
// 1. Calculate the average annual mileage using the events in the timeline.
// 2. Estimate the vehicle’s current mileage by projecting from the most recent event using the
// average annual mileage.
// 3. If there are no timeline events with mileage, calculate using 7, 900 miles per year as the
// average.

export default class Vehicle {
    readonly  id:Number;
    regDate: Date;
    vrm: VRM;
    make: Make;
    model: Model;

    timeline: Set<TimelineEvent> = new Set();

    /**
     *
     */
    constructor(id:Number, regDate: Date, vrm: VRM, make: Make, model: Model) {
        this.id = id;
        this.regDate = regDate;
        this.vrm = vrm;
        this.make = make;
        this.model = model;
    }

    addToTimeline(event: TimelineEvent) : Set<TimelineEvent> {

        this.timeline.add(event);

        return this.timeline;
    }
}
