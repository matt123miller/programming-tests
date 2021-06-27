import {TimelineEvent} from '../types';

export default class AdvertisedForSale implements TimelineEvent {
    date: Date;
    price: Number;
    mileage: Number;

    constructor (date:Date, price:Number, mileage: Number) {
        this.date = date;
        this.price = price;
        this.mileage = mileage;
    }
}