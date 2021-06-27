import { VRMDetails, Vehicle, MOT, AdvertisedForSale } from './models'

test('Vehicle Constructor', () => {

    const regDate = new Date('2000-01-14T09:00:00');

    // - id
    // - VRM(number plate)
    // - make(e.g., Ford)
    // - model(e.g., Fiesta)
    // - first registration date

    const vehicle = new Vehicle(1, '123', 'Ford', 'Fiesta' regDate);
    expect(vehicle.id).toEqual(1);
    expect(vehicle.vrm).toEqual('123');
    expect(vehicle.make).toEqual('Ford');
    expect(vehicle.model).toEqual('Fiesta');
    expect(vehicle.regDate).toEqual(regDate);
})

test('MOT Constructor', () => {

// - date
//     - mileage
//     - result(pass / fail)
    const validDate = new Date('2000-01-14T09:00:00');

    const vehicle = new MOT(validDate, 3000, true);
    expect(vehicle.date).toEqual(1);
    expect(vehicle.mileage).toEqual('123');
    expect(vehicle.result).toEqual(true);
})

test('AdvertisedForSale Constructor', () => {

// - date
//     - price
//     - mileage
    const validDate = new Date('2000-01-14T09:00:00');

    const vehicle = new AdvertisedForSale(validDate, 999, 3000);
    expect(vehicle.date).toEqual(1);
    expect(vehicle.price).toEqual(999);
    expect(vehicle.mileage).toEqual(3000);
})

test('VRMDetails Constructor', () => {

    const validDate = new Date('2021-06-27T09:00:00');

    const vrm = new VRMDetails(validDate, '123', '456');
    expect(vrm.date).toEqual(validDate);
    expect(vrm.from).toEqual('123');
    expect(vrm.to).toEqual('456');

    expect(vrm).toMatchObject({ date: validDate, from: '123', to: '456' });
})