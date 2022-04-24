import App, {calculateDistToNP} from "../App";
import {render} from "@testing-library/react";
import userEvent from "@testing-library/user-event";

describe("Checking geolocation api: ", () => {
    test('to confirm mock data for geolocation', async () => {
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
        navigator.geolocation.getCurrentPosition((position) => {
            expect(position.coords.latitude).toEqual(39.907588);
            expect(position.coords.longitude).toEqual(32.765829);
        });
    });

    test('show error if location request is blocked', async () => {
        const mockGeolocation = {
            getCurrentPosition: jest.fn()
                .mockImplementationOnce((success, error) => Promise.resolve(error({
                    code: 1,
                    message: 'User denied Geolocation',
                })))
        };
        global.navigator.geolocation = mockGeolocation;
        navigator.geolocation.getCurrentPosition((position) => {
            expect(position).toBeNull();
        }, (error) => {
            expect(error.message).toContain("User denied Geolocation");
        });
    });

    test('show error if geolocation is not supported', async () => {
        global.navigator.geolocation = null;
        const {getByTestId} = render(<App/>);
        const calculateButton = getByTestId("part-b-button");
        userEvent.click(calculateButton);

        const error = getByTestId("part-b-error");
        expect(error.textContent).toStrictEqual("Geolocation is not supported.");

        const calcButtonC = getByTestId("part-c-button");
        userEvent.click(calcButtonC);

        const errorC = getByTestId("part-c-error");
        expect(errorC.textContent).toStrictEqual("Geolocation is not supported.");
    });

    test('show the error message for other errors ', async () => {
        const mockGeolocation = {
            getCurrentPosition: jest.fn()
                .mockImplementationOnce((success, error) => Promise.resolve(error({
                    code: 1,
                    message: 'error',
                })))
        };
        global.navigator.geolocation = mockGeolocation;
        navigator.geolocation.getCurrentPosition((position) => {
            expect(position).toBeNull();
        }, (error) => {
            expect(error.message).toContain("error");
        });
    });
});