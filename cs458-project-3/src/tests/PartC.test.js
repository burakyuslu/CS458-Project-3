import { render, screen} from '@testing-library/react';
import App from '../App';
import userEvent from "@testing-library/user-event";
import SunCalc from "suncalc";

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
describe("Checking for manual input to part C (like part A): ", () => {

    test(' do not accept empty input (both)', () => {
        const {getByLabelText, getByTestId} = render(<App/>);
        const radio = getByLabelText("Enter the coordinates yourself.");
        expect(radio.checked).toEqual(false);
        userEvent.click(radio);
        expect(radio.checked).toEqual(true);

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
        const {getByLabelText, getByTestId} = render(<App/>);
        const radio = getByLabelText("Enter the coordinates yourself.");
        expect(radio.checked).toEqual(false);
        userEvent.click(radio);
        expect(radio.checked).toEqual(true);

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
        const {getByLabelText, getByTestId} = render(<App/>);
        const radio = getByLabelText("Enter the coordinates yourself.");
        expect(radio.checked).toEqual(false);
        userEvent.click(radio);
        expect(radio.checked).toEqual(true);

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
        const {getByLabelText, getByTestId} = render(<App/>);
        const radio = getByLabelText("Enter the coordinates yourself.");
        expect(radio.checked).toEqual(false);
        userEvent.click(radio);
        expect(radio.checked).toEqual(true);

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
        const {getByLabelText, getByTestId} = render(<App/>);
        const radio = getByLabelText("Enter the coordinates yourself.");
        expect(radio.checked).toEqual(false);
        userEvent.click(radio);
        expect(radio.checked).toEqual(true);

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
        const {getByLabelText, getByTestId} = render(<App/>);
        const radio = getByLabelText("Enter the coordinates yourself.");
        expect(radio.checked).toEqual(false);
        userEvent.click(radio);
        expect(radio.checked).toEqual(true);

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

describe("Checking sunCalc api: ", () => {
    test('to confirm mock data for geolocation', async () => {
        //location (39.907588, 32.765829) is Bilkent Uni
        const lat = 39.907588;
        const long = 32.765829;
        const defaultDate = new Date("2022-04-24T00:00:00.000+03:00");

        const distance = SunCalc.getMoonPosition(defaultDate, lat, long).distance;
        expect(Math.round(distance )).toEqual(367554);
        // value taken from https://www.timeanddate.com/moon/turkey/ankara
    });
});
