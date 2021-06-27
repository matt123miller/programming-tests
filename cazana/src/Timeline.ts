import { Unique, TimelineEvent } from "./types";


export default class events {

    // After implementing the id checks etc we can likely go back to array tbh.
    // I'll leave it as Set for now.
    events: Set<TimelineEvent> = new Set();


    constructor() {
        // Honestly can't think what it would need
    }


    add(newEvent: TimelineEvent): Set<TimelineEvent> {

        // Because we're using a Set it returns the same key and value from entries
        // So we can desctructure the iterator and discard 1 of the values.

        for (const [_, event] of this.events.entries()) {
            if (newEvent.id === event.id) {
                return this.events;
            }
        }

        this.events.add(newEvent);

        return this.events;
    }

}