import { validate as validUuid } from "uuid";

import Timeline from './Timeline';
import { ChangeOfVrm, Vehicle, MOT, AdvertisedForSale } from './models'
import { EventsByYearWithMileage } from "./types";

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

test('Timeline - Chunk events into annual groups', () => {

    const d1 = new Date('2000-01-01T09:00:00');
    const d2 = new Date('2000-06-01T09:00:00');
    const d3 = new Date('2001-02-01T09:00:00');
    const d4 = new Date('2001-03-01T09:00:00');
    const d5 = new Date('2003-03-15T09:00:00');
    const d6 = new Date('2004-04-01T09:00:00');
    const d7 = new Date('2004-04-01T12:00:00');

    const mot1 = new MOT(d1, 1000, true)
    const vrm1 = new ChangeOfVrm(d2, '1', '2');
    const mot2 = new MOT(d3, 3000, true);
    const vrm2 = new ChangeOfVrm(d4, '2', '3');
    const advert1 = new AdvertisedForSale(d5, 100, 8000);
    const advert2 = new AdvertisedForSale(d6, 100, 10000);
    const mot3 = new MOT(d7, 10000, true);


    // First start by simple grouping, where the first date is also the start of a year
    let timeline = new Timeline();

    timeline.add(mot1);
    timeline.add(vrm1);
    timeline.add(mot2);
    timeline.add(mot3);

    let grouping = timeline.groupIntoYears();
    expect(Object.keys(grouping)).toHaveLength(3);
    expect(grouping).toHaveProperty('2000')
    expect(grouping).toHaveProperty('2001')
    expect(grouping).toHaveProperty('2004')
    expect(grouping['2000'].events).toHaveLength(2);

    // Now add something that should get inserted in the middle
    timeline.add(advert1); // has year 2003
    grouping = timeline.groupIntoYears();
    expect(Object.keys(grouping)).toHaveLength(4);
    expect(grouping).toHaveProperty('2000')
    expect(grouping).toHaveProperty('2001')
    expect(grouping).toHaveProperty('2003')
    expect(grouping).toHaveProperty('2004')

})

test('Timeline - Get the average mileage of all years in the timeline', () => {

    const testData: EventsByYearWithMileage = {
        '20015': { mileage: 10000, events: [], },
        '2016': { mileage: 8000, events: [], },
        '2017': { mileage: 13000, events: [], },
        '2018': { mileage: 27000, events: [], },
        '2019': { mileage: 1000, events: [], },
        '2020': { mileage: 1000, events: [], },
    }

    // Manually doing the maths for the above mileage comes out to....
    const totalMileage = 60000
    // 10000
    const myAverage = totalMileage / 6;

    const average = Timeline.getAverageMileageOfYears(testData);

    expect(average).toBe(myAverage);
})

test('Timeline - Estimate the current mileage based on previous events', () => {
    let testData: EventsByYearWithMileage = {
        '2018': { mileage: 27000, events: [], },
        '2019': { mileage: 1500, events: [], },
        '2020': { mileage: 1500, events: [], },
    }

    const timeline = new Timeline();

    let estimatedMileage = timeline.estimateCurrentMileage(testData, 10000);

    expect(estimatedMileage).toBe(40000);

    testData = {
        '2018': { mileage: 12000, events: [], },
        '2019': { mileage: 3000, events: [], },
        '2020': { mileage: 3000, events: [], },
    }

    estimatedMileage = timeline.estimateCurrentMileage(testData, 6000);

    expect(estimatedMileage).toBe(24000);

    testData = {
        '20015': { mileage: 10000, events: [], },
        '2016': { mileage: 8000, events: [], },
        '2017': { mileage: 13000, events: [], },
        '2018': { mileage: 12000, events: [], },
        '2019': { mileage: 3000, events: [], },
        '2020': { mileage: 3000, events: [], },
    }

    estimatedMileage = timeline.estimateCurrentMileage(testData, 7000);

    expect(estimatedMileage).toBe(56000);
})


test.todo('Timeline - searchFromBackForMileage')


test('Timeline - Calculate annual mileage with mixture of mileage and non-mileage events', () => {

    const timeline = new Timeline();

    timeline.add({ id: '1', mileage: 1000, date: new Date('2000-01-01T09:00:00') })
    timeline.add({ id: '2', mileage: 2000, date: new Date('2001-01-01T09:00:00') })
    timeline.add({ id: '3', mileage: 2500, date: new Date('2002-01-01T09:00:00') })
    timeline.add({ id: '4', mileage: 4000, date: new Date('2003-01-01T09:00:00') })

    let grouping = timeline.groupIntoYears();
    expect(grouping['2000'].mileage).toBe(1000);
    expect(grouping['2001'].mileage).toBe(1000);
    expect(grouping['2002'].mileage).toBe(500);
    expect(grouping['2003'].mileage).toBe(1500);


    timeline.add({ id: '5', mileage: 6000, date: new Date('2004-01-01T09:00:00') })
    timeline.add({ id: '6', date: new Date('2004-02-01T09:00:00') })
    timeline.add({ id: '7', mileage: 6700, date: new Date('2004-03-01T09:00:00') })
    timeline.add({ id: '8', date: new Date('2004-04-01T09:00:00') })
    timeline.add({ id: '9', mileage: 8000, date: new Date('2005-01-01T09:00:00') })
    timeline.add({ id: '10', mileage: 10000, date: new Date('2006-01-01T09:00:00') })

    grouping = timeline.groupIntoYears();
    // Should now have 7 different years
    expect(Object.keys(grouping)).toHaveLength(7);
    expect(grouping['2004'].mileage).toBe(2700);
    expect(grouping['2005'].mileage).toBe(1300);
    expect(grouping['2006'].mileage).toBe(2000);
})