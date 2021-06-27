export interface Unique {
    /** v4 uuid */
    readonly id: String;
}
export interface TimelineEvent extends Unique {
    date: Date;
    // This is the vehicle mileage at the time of the event 
    mileage? : number;
}

export type EventsByYear = { 
    [index: string]: { 
        events: TimelineEvent[] 
    } 
}

export type EventsByYearWithMileage = {
    [index: string]: {
        events: TimelineEvent[],
        /**  This is the estimated mileage done in this year */
        mileage: number
    }
}

export type VRM = String;
export type Make = String;
export type Model = String;