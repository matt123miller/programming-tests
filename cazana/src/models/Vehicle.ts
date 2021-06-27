import { v4 as v4uuid } from "uuid";

import { Unique, VRM, Make, Model, TimelineEvent } from "../types";


// Task
// Provide a way to estimate a vehicle’s current mileage using the timeline.
// 1. Calculate the average annual mileage using the events in the timeline.
// 2. Estimate the vehicle’s current mileage by projecting from the most recent event using the
// average annual mileage.
// 3. If there are no timeline events with mileage, calculate using 7,900 miles per year as the
// average.

export default class Vehicle implements Unique {
    readonly  id = v4uuid();
    regDate: Date;
    vrm: VRM;
    make: Make;
    model: Model;

    // After implementing the id checks etc we can likely go back to array tbh.
    // I'll leave it as Set for now.
    timeline: Set<TimelineEvent> = new Set();

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

        // Because we're using a Set it returns the same key and value from entries
        // So we can desctructure the iterator and discard 1 of the values.

        for (const [_, event] of this.timeline.entries()) {
            if(newEvent.id === event.id) {
                return this.timeline;
            }
        }

        this.timeline.add(newEvent);

        return this.timeline;
    }

    // ok lets implement the actual task functionality now I've played around with TS and testing.
    // I'm considering splitting the timeline out into it's own class, 
    // then all the behaviour and data is cohesive and Vehicle can have a timeline reference.

    // Task
    // Provide a way to estimate a vehicle’s current mileage using the timeline.
    // 1. Calculate the average annual mileage using the events in the timeline.
    // 2. Estimate the vehicle’s current mileage by projecting from the most recent 
    // event using the average annual mileage.
    // 3. If there are no timeline events with mileage, calculate using 7,900 miles 
    // per year as the average.






}
