import { validate as validUuid } from "uuid";

import Timeline from './Timeline';
import { ChangeOfVrm, Vehicle, MOT, AdvertisedForSale } from './models'

test('Vehicle Constructor', () => {

    const regDate = new Date('2000-01-01T09:00:00');

    const vehicle = new Vehicle(regDate, '123', 'Ford', 'Fiesta');
    expect(validUuid(vehicle.id)).toBeTruthy();
    expect(vehicle.vrm).toEqual('123');
    expect(vehicle.make).toEqual('Ford');
    expect(vehicle.model).toEqual('Fiesta');
    expect(vehicle.regDate).toEqual(regDate);
})

test('MOT Constructor', () => {

    const validDate = new Date('2000-01-01T09:00:00');

    const mot = new MOT(validDate, 3000, true);
    expect(mot.date).toEqual(validDate);
    expect(mot.mileage).toEqual(3000);
    expect(mot.result).toEqual(true);
})

test('AdvertisedForSale Constructor', () => {

    const validDate = new Date('2000-01-01T09:00:00');

    const advert = new AdvertisedForSale(validDate, 999, 3000);
    expect(advert.date).toEqual(validDate);
    expect(advert.price).toEqual(999);
    expect(advert.mileage).toEqual(3000);
})

test('ChangeOfVrm Constructor', () => {

    const validDate = new Date('2021-06-27T09:00:00');

    const vrm = new ChangeOfVrm(validDate, '123', '456');
    expect(vrm.date).toEqual(validDate);
    expect(vrm.from).toEqual('123');
    expect(vrm.to).toEqual('456');

    expect(vrm).toMatchObject({ date: validDate, from: '123', to: '456' });
})

test('Vehicle Timeline - adding to timeline', () => {

    const regDate = new Date('2000-01-01T09:00:00');
    const motDate = new Date('2000-01-15T09:00:00');
    const advertiseDate = new Date('2000-01-15T09:00:00');

    const vehicle = new Vehicle(regDate, '123', 'Ford', 'Fiesta');
    const mot = new MOT(motDate, 3000, true);
    const advert = new AdvertisedForSale(advertiseDate, 2000, 4000);

    vehicle.addToTimeline(mot);

    expect(vehicle.timeline).toContain(mot);
    expect(vehicle.timeline).toHaveLength(1);

    vehicle.addToTimeline(advert);

    expect(vehicle.timeline).toContain(advert);
    expect(vehicle.timeline).toHaveLength(2);
})


test('Timeline - Each event is unique', () => {

    const regDate = new Date('2000-01-01T09:00:00');
    const motDate = new Date('2000-01-15T09:00:00');
    const advertiseDate = new Date('2000-01-16T09:00:00');

    const timeline = new Timeline();

    const mot1 = new MOT(motDate, 3000, true);
    const advert = new AdvertisedForSale(advertiseDate, 2000, 4000);

    // Because each TimelineEvent has it's own generated id I can trust
    timeline.add(mot1);
    timeline.add(mot1);

    expect(timeline.events).toContain(mot1);
    expect(timeline.events).toHaveLength(1);

    const mot2 = new MOT(motDate, 3000, true);

    timeline.add(mot2);

    expect(timeline.events).toContain(mot1);
    expect(timeline.events).toContain(mot2);
    expect(timeline.events).toHaveLength(2);

    // Checking that order or insertion makes no difference
    timeline.add(mot1);

    expect(timeline.events).toContain(mot1);
    expect(timeline.events).toContain(mot2);
    expect(timeline.events).toHaveLength(2);
})

test('Timeline - Get most recent event', () => {

    let timeline = new Timeline();

    const mot1Date = new Date('2000-01-15T09:00:00');
    const mot1 = new MOT(mot1Date, 3000, true);
    const mot2Date = new Date('2000-01-20T09:00:00');
    const mot2 = new MOT(mot2Date, 3000, true);
    const mot3Date = new Date('2000-01-25T09:00:00');
    const mot3 = new MOT(mot3Date, 3000, true);

    expect(timeline.latestEvent).toBeFalsy();
    expect(timeline.latestEvent).toBeNull();

    timeline.add(mot1);

    expect(timeline.latestEvent).toBeTruthy();
    expect(timeline.latestEvent).toBe(mot1);

    timeline.add(mot2);
    timeline.add(mot3);

    expect(timeline.latestEvent).toBe(mot3);

    timeline = new Timeline();

    // checking insertion order doesn't matter
    timeline.add(mot2)
    timeline.add(mot1)

    expect(timeline.latestEvent).toBe(mot2);
})

test('Timeline - Find the length of the timeline in days', () => {
    // The durationOfTimeline function mostly just calls a date-fns function and
    // I'm not gonna write tests for that. I'm mostly testing my own logic around it.

    const d1 = new Date('2000-01-01T09:00:00');
    const d2 = new Date('2000-02-01T09:00:00');
    const d3 = new Date('2000-03-01T09:00:00');
    const d4 = new Date('2000-03-15T09:00:00');
    const d5 = new Date('2000-04-01T09:00:00');

    const vrmChange1 = new ChangeOfVrm(d1, '1', '2');
    const vrmChange2 = new ChangeOfVrm(d2, '2', '3');
    const vrmChange3 = new ChangeOfVrm(d3, '3', '4');
    const vrmChange4 = new ChangeOfVrm(d4, '4', '5');
    const vrmChange5 = new ChangeOfVrm(d5, '5', '6');

    const timeline = new Timeline();

    expect(() => timeline.durationOfTimeline()).toThrow();

    timeline.add(vrmChange1);

    expect(() => timeline.durationOfTimeline()).toThrow();

    timeline.add(vrmChange2);

    expect(() => timeline.durationOfTimeline()).not.toThrow();
    const res1 = timeline.durationOfTimeline();
    expect(res1.daysBetween).toBeGreaterThanOrEqual(0);
    expect(res1.oldestEvent.date).toBe(d1);
    expect(res1.latestEvent.date).toBe(d2);

    timeline.add(vrmChange5);
    timeline.add(vrmChange3);

    const res2 = timeline.durationOfTimeline();
    expect(res2.daysBetween).toBeGreaterThanOrEqual(0);
    expect(res2.oldestEvent.date).toBe(d1);
    expect(res2.latestEvent.date).toBe(d5);
})

test('Timeline - Calculate annual mileage with no mileage events', () => {
    // The only event without mileage is ChangeOfVrm
    // So lets use lots of those



})

test.todo('Timeline - Calculate annual mileage with all mileage events')

test.todo('Timeline - Calculate annual mileage with micture of mileage and non-mileage events')