// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom';

//location (39.907588, 32.765829) is Bilkent Uni
const mockGeolocation = {
    getCurrentPosition: jest.fn()
        .mockImplementationOnce((success) => Promise.resolve(success({
            coords: {
                latitude: 39.907588,
                longitude: 32.765829,
            }
        })))
};
global.navigator.geolocation = mockGeolocation;
global.navigator.permissions = {
    query: jest
        .fn()
        .mockImplementationOnce(() => Promise.resolve({ state: 'granted' })),
};