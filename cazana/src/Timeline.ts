import diffInDays from 'date-fns/differenceInDays';
import minDate from 'date-fns/min';
import { Unique, TimelineEvent, EventsByYear, EventsByYearWithMileage } from "./types";

// Basically an enum
// Come back to this idea.
type SortDirection = 'NewToOld' | 'OldToNew';


export default class Timeline {

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

        this.sortDirection = sortDirection == 'NewToOld' ? -1 : 1;
    }

    /**
     * 
     * @param newEvent 
     * @returns 
     */
    add(newEvent: TimelineEvent): Array<TimelineEvent> {

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

    /**
     * Calls each of the functions in turn that fulfils the test requirements
     * Provide a way to estimate a vehicle’s current mileage using the timeline.
     * 1. Calculate the average annual mileage using the events in the timeline.
     * 2. Estimate the vehicle’s current mileage by projecting from the most recent
     * event using the average annual mileage.
     * 3. If there are no timeline events with mileage, calculate using 7,900 miles
     * per year as the average.
     */
    calculateMileageValues() {

    }

    /**
     * 
     */
    durationOfTimeline() {
        // Just throw an error for lengths 0 and 1
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

    /** 
     * This could group things in relation to the earliest date and then every 365 days
     * is a year, but that's more complex and could be a stretch goal. 
     * @returns 
     */
    groupIntoYears() {

        const eventsByYear: EventsByYear = {};

        // Nice and simple loop
        for (const event of this.events) {
            const yearString = event.date.getFullYear().toString();
            // probably a much nicer way to do the following 2 branches
            if (eventsByYear[yearString]) {
                eventsByYear[yearString].events.push(event);
            }
            else {
                eventsByYear[yearString] = { events: [event] };
            }
        }

        const eventsWithMileage = this.getMileageBetweenYears(eventsByYear);

        return eventsWithMileage;
    }


    /**
     * Seems like I overcomplicated this.
     * @param yearsWithEvents 
     * @returns 
     */
    getMileageBetweenYears(yearsWithEvents: EventsByYear): EventsByYearWithMileage {

        const defaultMileage = 7900;
        // Objects aren't ordered after all
        const yearNums = Object.keys(yearsWithEvents).map(y => Number(y));
        const firstEventYearNum = Math.min(...yearNums);
        const firstYear = yearsWithEvents[firstEventYearNum];
        // The events are already sorted by date, no need to do further searching
        const firstYearsLastEventWithMileage = this.searchFromBackForMileage(firstYear.events);
        // @ts-ignore
        firstYear.mileage = firstYearsLastEventWithMileage?.mileage || defaultMileage;

        let prevYearLastEventWithMileage = firstYearsLastEventWithMileage;

        //for each year other than first
        // find the last event with mileage
        // Find the different in mileage compare to last years
        // If no event was found though fall back to default value of 7,900
        // record the difference


        for (const key in yearsWithEvents) {
            if (key == String(firstEventYearNum)) {
                continue;
            }
            const year = yearsWithEvents[key];

            const lastEventWithMileage = this.searchFromBackForMileage(year.events);

            let mileage = defaultMileage;

            // If there was an event this year with mileage we'll use that to work out how far we think they travelled
            // Otherwise use the fallback of 7900
            if (typeof lastEventWithMileage !== 'undefined') {
                if (prevYearLastEventWithMileage?.mileage) {
                    // @ts-ignore
                    mileage = lastEventWithMileage?.mileage - prevYearLastEventWithMileage?.mileage;
                }
            }

            // I'm not sure how to fix this TS error yet so I'm ignoring it. Forgive me.
            // @ts-ignore
            year.mileage = mileage;

            prevYearLastEventWithMileage = lastEventWithMileage;
        }

        return yearsWithEvents as EventsByYearWithMileage;
    }

    /**
     * 
     * @param arr 
     * @returns 
     */
    private searchFromBackForMileage(arr: TimelineEvent[]) {
        // .reverse does it in place so need to spread into new array
        const reversed = [...arr].reverse();
        return reversed.find(e => !!e.mileage);
    }

    /**
     * I see this function as stateless and not relying on or changing any data on an instance
     * so static it is.
     * Calculate the average annual mileage using the events in the timeline.
     * @param yearsWithMileage
     */
    static getAverageMileageOfYears(yearsWithMileage: EventsByYearWithMileage) {
        const keys = Object.keys(yearsWithMileage);
        const total = keys.reduce((total, year) => total += yearsWithMileage[year].mileage, 0);
        return total / keys.length;
    }


    /**
     * Estimate the vehicle’s current mileage by projecting from the most recent  
     * event using the average annual mileage.
     * @param yearsWithMileage 
     * @param averageAnnualMileage 
     * @returns 
     */
    estimateCurrentMileage(yearsWithMileage: EventsByYearWithMileage, averageAnnualMileage: number) {
        // total up all the mileage
        const totalMileage = Object.keys(yearsWithMileage).reduce((total, year) => total += yearsWithMileage[year].mileage, 0);
        // Add the average
        return totalMileage + averageAnnualMileage;
    }
}