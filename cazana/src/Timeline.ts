import { Unique, TimelineEvent } from "./types";

// Basically an enum
type SortDirection = 'NewToOld' | 'OldToNew';

export default class events {

    // After implementing the id checks etc we can likely go back to array tbh.
    // I'll leave it as Set for now.
    events: Array<TimelineEvent> = [];

    sortDirection!: -1 | 1;



    public get latestEvent() {
        return this.sorted()[0] ?? null;
    }

    /**
     * 
     */
    constructor(sortDirection?:SortDirection) {
        // Honestly can't think what it would need

        // Come back to this idea.
        this.sortDirection = sortDirection == 'NewToOld' ? -1 : 1 ;
    }


    add(newEvent: TimelineEvent): Array<TimelineEvent> {

        // Because we're using a Set it returns the same key and value from entries
        // So we can desctructure the iterator and discard 1 of the values.

        for (const event of this.events) {
            if (newEvent.id === event.id) {
                return this.events;
            }
        }

        this.events.push(newEvent);

        return this.events;
    }

    /**
     * Return the events sorted by their date values
     */
    sorted() : Array<TimelineEvent> {
        return this.events.sort((a,b) => b.date.getTime() - a.date.getTime());
    }

    // Task
    // Provide a way to estimate a vehicle’s current mileage using the timeline.
    // 1. Calculate the average annual mileage using the events in the timeline.
    // 2. Estimate the vehicle’s current mileage by projecting from the most recent 
    // event using the average annual mileage.
    // 3. If there are no timeline events with mileage, calculate using 7,900 miles 
    // per year as the average.

}