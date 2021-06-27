import diffInDays from 'date-fns/differenceInDays';
import { Unique, TimelineEvent } from "./types";

// Basically an enum
// Come back to this idea.
type SortDirection = 'NewToOld' | 'OldToNew';

export default class events {

    // After implementing the id checks etc we can likely go back to array tbh.
    // I'll leave it as Set for now.
    events: Array<TimelineEvent> = [];

    sortDirection!: -1 | 1;


    // It should be sorted every time you add so it's safe to just grab the last one
    public get latestEvent() {
        return this.events[this.events.length - 1] ?? null;
    }

    /**
     * 
     */
    constructor(sortDirection?: SortDirection) {
        // Honestly can't think what it would need

        this.sortDirection = sortDirection == 'NewToOld' ? -1 : 1;
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
        this.events = this.sorted();

        return this.events;
    }

    /**
     * Return the events sorted by their date values. [oldest ... most recent]
     */
    sorted(): Array<TimelineEvent> {
        return this.events.sort((a, b) => a.date.getTime() - b.date.getTime());
    }

    // Task
    // Provide a way to estimate a vehicle’s current mileage using the timeline.
    // 1. Calculate the average annual mileage using the events in the timeline.
    // 2. Estimate the vehicle’s current mileage by projecting from the most recent 
    // event using the average annual mileage.
    // 3. If there are no timeline events with mileage, calculate using 7,900 miles 
    // per year as the average.


    /**
     * 
     * @returns 
     */
    durationOfTimeline() {
        // Just throw an event for lengths 0 and 1
        // I can't know what consumers will do with that scenario.

        if (this.events.length <= 1) {
            throw new Error(`Timeline is too small. Please add more events.`);
        }

        const oldestEvent = this.events[0];
        const latestEvent = this.events[this.events.length - 1];
        // Can sometimes be 0, but almost always positive.
        const daysBetween = diffInDays(latestEvent.date, oldestEvent.date);

        // This is the sort of thing that I normally want a few weeks later so returning all now.
        return { daysBetween, oldestEvent, latestEvent };
    }
}