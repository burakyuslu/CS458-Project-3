import App, {calculateDistToNP} from '../App';
import {render, screen} from "@testing-library/react";

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

describe("Checking haversine calculation: ", () => {
    test('location (39.907588, 32.765829) = Bilkent Uni', async () => {
        //location (39.907588, 32.765829) is Bilkent Uni
        const position = {coords: {
                latitude: 39.907588,
                longitude: 32.765829,
            }}
        const dist = calculateDistToNP(position);
        expect(Math.round(dist)).toEqual(5570);
        // compared value is taken from
        // https://www.distance.to/North-Pole/Bilkent,%C3%9Cniversiteler,%C3%87ankaya,Ankara,TUR
    });
});