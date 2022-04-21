import {fireEvent, getByTestId, render, screen} from '@testing-library/react';
import App from './App';
import userEvent from "@testing-library/user-event";


//todo add the correct result to line 18
describe("Checking to see if the calculation of the country is correct (for Country3)", () => {
    test('Testing for the latitude and longitude of City3', () => {
        render(<App/>);

        const calculateButton = screen.getByTestId("part-b-button");
        userEvent.click(calculateButton);


        const paragraph = screen.getByTestId("part-b-paragraph");

        //todo add Entered Country as country later
        expect(paragraph.textContent).toEqual('Your Distance To Geographic North Pole: ')
    });
});