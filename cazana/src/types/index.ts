export interface Unique {
    /** v4 uuid */
    readonly id: String;
}
export interface TimelineEvent extends Unique {
    date: Date;
}


export type VRM = String;
export type Make = String;
export type Model = String;