import { v4 as v4uuid } from "uuid";

import {TimelineEvent} from '../types';

export default class AdvertisedForSale implements TimelineEvent {
    readonly id = v4uuid();
    date: Date;
    price: Number;
    mileage: Number;

    constructor (date:Date, price:Number, mileage: Number) {
        this.date = date;
        this.price = price;
        this.mileage = mileage;
    }
}