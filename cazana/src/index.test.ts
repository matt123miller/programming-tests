import { VRMDetails } from './models'

test('VRMDetails Constructor', () => {

    const validDate = new Date('2021-06-27T09:00:00');

    const vrm = new VRMDetails(validDate, 'abc', 'xyz');
    expect(vrm.date).toEqual(validDate)
    expect(vrm.from).toEqual('abc')
    expect(vrm.to).toEqual('xyz')
})