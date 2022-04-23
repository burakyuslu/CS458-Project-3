import {calculateDistToNP} from './App';


describe("Checking part b", () => {
    // location (39.907588, 32.765829) is Bilkent Uni
    // is given in setupTests.js to mockGeolocation

    test('to confirm mock data for geolocation', () => {
        navigator.geolocation.getCurrentPosition((position) => {
            expect(position.coords.latitude).toEqual(39.907588);
            expect(position.coords.longitude).toEqual(32.765829);

            const dist = calculateDistToNP(position);
            expect(dist).not.toEqual(3461.05 );
            // compared value is taken from
            // https://www.distance.to/North-Pole/Bilkent,%C3%9Cniversiteler,%C3%87ankaya,Ankara,TUR
        });
    });

});