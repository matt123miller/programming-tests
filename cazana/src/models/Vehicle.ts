import { VRM, Make, Model, TimelineEvent } from "../types";

// - id
//     - VRM(number plate)
//     - make(e.g., Ford)
//     - model(e.g., Fiesta)
//     - first registration date


export default class Vehicle {
    id:Number;
    regDate: Date;
    vrm: VRM;
    make: Make;
    model: Model;

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
}