import App, {calculateDistToNP} from '../App';
import {render, screen} from "@testing-library/react";
import userEvent from "@testing-library/user-event";

describe("Existing fields for part B: ", () => {
    test('button for calculation', () => {
        render(<App/>);

        const calculateButton = screen.getByTestId("part-b-button");

        expect(calculateButton).toBeDefined();
    });

    test('text to show result', () => {
        render(<App/>);
        const paragraph = screen.getByTestId("part-b-paragraph");
        expect(paragraph.textContent).toContain("Your Distance To Geographic North Pole:");
    });
});

describe("Checking part B preconditions are satisfied: ", () => {
    test('show error if location request is blocked', () => {
        const {getByTestId} = render(<App/>);
        const calculateButton = getByTestId("part-b-button");
        userEvent.click(calculateButton);

        const error = getByTestId("part-b-error");
        expect(error.textContent).toContain("Enable your browser's access to GPS");
    });

    test('show error if geolocation is not supported', () => {
        const {getByTestId} = render(<App/>);
        const calculateButton = getByTestId("part-b-button");
        userEvent.click(calculateButton);

        const error = getByTestId("part-b-error");
        expect(error.textContent).toStrictEqual("Geolocation is not supported.");
    });

    test('show the error message for other errors ', () => {
        const {getByTestId} = render(<App/>);
        const calculateButton = getByTestId("part-b-button");
        userEvent.click(calculateButton);

        const error = getByTestId("part-b-error");
        expect(error.textContent).toContain("Geolocation error:");
    });
});

describe("Checking part B api: ", () => {
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