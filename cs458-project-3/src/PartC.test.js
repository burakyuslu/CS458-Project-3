import { render, screen} from '@testing-library/react';
import App from './App';
import userEvent from "@testing-library/user-event";

describe("Checking to see if the calculation for distance to the Moon is correct", () => {
    test('Testing for the distance by not entering the values yourself', () => {
        render(<App/>);

        const radioButtonGPS = screen.getByTestId("part-c-radio-1");
        userEvent.click(radioButtonGPS);


        const calculateButton = screen.getByTestId("part-c-button-1");
        userEvent.click(calculateButton);

        const paragraph = screen.getByTestId("part-c-paragraph");

        expect(paragraph.textContent).toEqual('Your Distance To The Moon\'s Core: ')
    });

    test('Testing for the distance by entering the values yourself', () => {
        render(<App/>);

        const radioButtonGPS = screen.getByTestId("part-c-radio-2");
        userEvent.click(radioButtonGPS);


        const calculateButton = screen.getByTestId("part-c-button-2");
        userEvent.click(calculateButton);

        //todo add latitude
        const latitude = screen.getByTestId("part-c-field-1");
        userEvent.type(latitude, "");

        //todo add longitude
        const longitude = screen.getByTestId("part-c-field-2");
        userEvent.type(longitude, "");

        const paragraph = screen.getByTestId("part-c-paragraph");

        expect(paragraph.textContent).toEqual('Your Distance To The Moon\'s Core: ')
    });
});