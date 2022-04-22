import {fireEvent, getByTestId, render, screen} from '@testing-library/react';
import App from './App';
import userEvent from "@testing-library/user-event";


describe("Checking geolocation", () => {

    test('to confirm mock data', async () => {
        navigator.geolocation.getCurrentPosition((position) => {
            expect(position.coords.latitude).toEqual(51.1);
            expect(position.coords.longitude).toEqual(45.3);
        });
    });


    test('should render the result', async () => {
        const {findByTestId, getByTestId} = render(<App/>);
        const calculateButton = getByTestId("part-b-button");
        userEvent.click(calculateButton);

        expect(await findByTestId("part-b-paragraph")).toBeDefined();
    });
});