import { render, screen} from '@testing-library/react';
import App from '../App';
import userEvent from "@testing-library/user-event";

describe("Existing fields for part C: ", () => {
    test('radio button for two choices', () => {
        render(<App/>);
        const radioGroup = screen.getByTestId("part-c-radio-group");
        expect(radioGroup).toBeDefined();
    });

    test('button for calculation', () => {
        render(<App/>);
        const calculateButton = screen.getByTestId("part-c-button");

        expect(calculateButton).toBeDefined();
    });

    test('text to show result', () => {
        render(<App/>);
        const paragraph = screen.getByTestId("part-c-paragraph");
        expect(paragraph.textContent).toContain("Your Distance To The Moon's Core:");
    });
});

function clickButton() {
    const calculateButton = screen.getByTestId("part-c-button");
    userEvent.click(calculateButton);
}
// add select b radio
describe("Checking for the input to part C for manual coord input (like part A): ", () => {
    test(' do not accept empty input (both)', () => {
        const {getByTestId} = render(<App/>);

        const latitude = getByTestId("part-c-field-1");
        const longitude = getByTestId("part-c-field-2");
        userEvent.type(latitude, "");
        userEvent.type(longitude, "");
        clickButton();

        const paragraph = getByTestId("part-c-paragraph");
        expect(paragraph.textContent).toContain(" - ");

        const error = getByTestId("part-c-error");
        expect(error.textContent).toStrictEqual("Fill both input.");
    });

    test(' do not accept empty input (one)', () => {
        const {getByTestId} = render(<App/>);

        const latitude = getByTestId("part-c-field-1");
        const longitude = getByTestId("part-c-field-2");
        userEvent.type(latitude, "");
        userEvent.type(longitude, "0.1276");
        clickButton();

        const paragraph = getByTestId("part-c-paragraph");
        expect(paragraph.textContent).toContain(" - ");

        const error = getByTestId("part-c-error");
        expect(error.textContent).toStrictEqual("Fill both input.");
    });

    test(' do not accept inputs including letter or symbols (both) ', () => {
        const {getByTestId} = render(<App/>);

        const latitude = getByTestId("part-c-field-1");
        const longitude = getByTestId("part-c-field-2");
        userEvent.type(latitude, "12Ab&");
        userEvent.type(longitude, "12Ab&");
        clickButton();

        const paragraph = getByTestId("part-c-paragraph");
        expect(paragraph.textContent).toContain(" - ");

        const error = getByTestId("part-c-error");
        expect(error.textContent).toStrictEqual("Input is not a number.");
    });

    test(' do not accept inputs including letter or symbols (one) ', () => {
        const {getByTestId} = render(<App/>);

        const latitude = getByTestId("part-c-field-1");
        const longitude = getByTestId("part-c-field-2");
        userEvent.type(latitude, "12Ab&");
        userEvent.type(longitude, "12.015");
        clickButton();

        const paragraph = getByTestId("part-c-paragraph");
        expect(paragraph.textContent).toContain(" - ");

        const error = getByTestId("part-c-error");
        expect(error.textContent).toStrictEqual("Input is not a number.");
    });

    test(' do not accept wrong coordinates (both)', () => {
        const {getByTestId} = render(<App/>);

        const latitude = getByTestId("part-c-field-1");
        const longitude = getByTestId("part-c-field-2");
        userEvent.type(latitude, "-110.1054");
        userEvent.type(longitude, "280.5610");
        clickButton();

        const paragraph = getByTestId("part-c-paragraph");
        expect(paragraph.textContent).toContain(" - ");

        const error = getByTestId("part-c-error");
        expect(error.textContent).toStrictEqual("Coordinate does not exist.");
    });

    test(' do not accept wrong coordinates (one)', () => {
        const {getByTestId} = render(<App/>);

        const latitude = getByTestId("part-c-field-1");
        const longitude = getByTestId("part-c-field-2");
        userEvent.type(latitude, "-110.1054");
        userEvent.type(longitude, "12.015");
        clickButton();

        const paragraph = getByTestId("part-c-paragraph");
        expect(paragraph.textContent).toContain(" - ");

        const error = getByTestId("part-c-error");
        expect(error.textContent).toStrictEqual("Coordinate does not exist.");
    });
});

describe("Checking for preconditions for GPS (like part B): ", () => {

});

describe("Checking to see if the calculation for distance to the Moon is correct", () => {
    test('Testing for the distance by not entering the values yourself', () => {
        render(<App/>);

        const radioButtonGPS = screen.getByTestId("part-c-radio-1");
        userEvent.click(radioButtonGPS);


        const calculateButton = screen.getByTestId("part-c-button");
        userEvent.click(calculateButton);

        const paragraph = screen.getByTestId("part-c-paragraph");

        expect(paragraph.textContent).toEqual('Your Distance To The Moon\'s Core: ')
    });

    test('Testing for the distance by entering the values yourself', () => {
        render(<App/>);

        const radioButtonGPS = screen.getByTestId("part-c-radio-2");
        userEvent.click(radioButtonGPS);


        const calculateButton = screen.getByTestId("part-c-button");
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