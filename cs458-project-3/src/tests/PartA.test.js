import {render, screen} from '@testing-library/react';
import App from '../App';
import userEvent from "@testing-library/user-event";

function clickButton() {
  const calculateButton = screen.getByTestId("part-a-button");
  userEvent.click(calculateButton);
}

describe("Existing fields for part A: ", () => {
  test('latitude text field ', () => {
    render(<App/>);

    const latitude = screen.getByTestId("part-a-field-1");
    userEvent.type(latitude, "51.5072");

    expect(latitude).toHaveValue("51.5072");
  });

  test('longitude text field', () => {
    render(<App/>);

    const longitude = screen.getByTestId("part-a-field-2");
    userEvent.type(longitude, "0.1276");

    expect(longitude).toHaveValue("0.1276");
  });

  test('button for calculation', () => {
    render(<App/>);

    const calculateButton = screen.getByTestId("part-a-button");

    expect(calculateButton).toBeDefined();
  });

  test('text to show result', () => {
    render(<App/>);
    const paragraph = screen.getByTestId("part-a-paragraph");
    expect(paragraph.textContent).toContain("Your Country:");
  });
});

describe("Checking for the input to part A for both lat/long: ", () => {
  test(' do not accept empty input (both)', () => {
    const {getByTestId} = render(<App/>);

    const latitude = getByTestId("part-a-field-1");
    const longitude = getByTestId("part-a-field-2");
    userEvent.type(latitude, "");
    userEvent.type(longitude, "");
    clickButton();

    const paragraph = getByTestId("part-a-paragraph");
    expect(paragraph.textContent).toContain(" - ");

    const error = getByTestId("part-a-error");
    expect(error.textContent).toStrictEqual("Fill both input.");
  });

  test(' do not accept empty input (one)', () => {
    const {getByTestId} = render(<App/>);

    const latitude = getByTestId("part-a-field-1");
    const longitude = getByTestId("part-a-field-2");
    userEvent.type(latitude, "");
    userEvent.type(longitude, "0.1276");
    clickButton();

    const paragraph = getByTestId("part-a-paragraph");
    expect(paragraph.textContent).toContain(" - ");

    const error = getByTestId("part-a-error");
    expect(error.textContent).toStrictEqual("Fill both input.");
  });

  test(' do not accept inputs including letter or symbols (both) ', () => {
    const {getByTestId} = render(<App/>);

    const latitude = getByTestId("part-a-field-1");
    const longitude = getByTestId("part-a-field-2");
    userEvent.type(latitude, "12Ab&");
    userEvent.type(longitude, "12Ab&");
    clickButton();

    const paragraph = getByTestId("part-a-paragraph");
    expect(paragraph.textContent).toContain(" - ");

    const error = getByTestId("part-a-error");
    expect(error.textContent).toStrictEqual("Input is not a number.");
  });

  test(' do not accept inputs including letter or symbols (one) ', () => {
    const {getByTestId} = render(<App/>);

    const latitude = getByTestId("part-a-field-1");
    const longitude = getByTestId("part-a-field-2");
    userEvent.type(latitude, "12Ab&");
    userEvent.type(longitude, "12.015");
    clickButton();

    const paragraph = getByTestId("part-a-paragraph");
    expect(paragraph.textContent).toContain(" - ");

    const error = getByTestId("part-a-error");
    expect(error.textContent).toStrictEqual("Input is not a number.");
  });

  test(' do not accept wrong coordinates (both)', () => {
    const {getByTestId} = render(<App/>);

    const latitude = getByTestId("part-a-field-1");
    const longitude = getByTestId("part-a-field-2");
    userEvent.type(latitude, "-110.1054");
    userEvent.type(longitude, "280.5610");
    clickButton();

    const paragraph = getByTestId("part-a-paragraph");
    expect(paragraph.textContent).toContain(" - ");

    const error = getByTestId("part-a-error");
    expect(error.textContent).toStrictEqual("Coordinate does not exist.");
  });

  test(' do not accept wrong coordinates (one)', () => {
    const {getByTestId} = render(<App/>);

    const latitude = getByTestId("part-a-field-1");
    const longitude = getByTestId("part-a-field-2");
    userEvent.type(latitude, "-110.1054");
    userEvent.type(longitude, "12.015");
    clickButton();

    const paragraph = getByTestId("part-a-paragraph");
    expect(paragraph.textContent).toContain(" - ");

    const error = getByTestId("part-a-error");
    expect(error.textContent).toStrictEqual("Coordinate does not exist.");
  });
});


describe("Part A Google Maps api check: ", () => {
  test('coords are for a real country (Russia)', async () =>  {
    render(<App/>);

    const latitude = screen.getByTestId("part-a-field-1");
    userEvent.type(latitude, "51.5072");

    const longitude = screen.getByTestId("part-a-field-2");
    userEvent.type(longitude, "51.5072");

    clickButton();

    const paragraph = await screen.findByTestId("part-a-paragraph");

    expect(paragraph.textContent).toEqual('Your Country: Russia');
  });

  test('coordinates does not belong to a country', async () => {
    render(<App/>);
    // (0, 89) is at the Antarctic
    const latitude = screen.getByTestId("part-a-field-1");
    userEvent.type(latitude, "0");

    const longitude = screen.getByTestId("part-a-field-2");
    userEvent.type(longitude, "89");

    clickButton();

    const paragraph = await screen.findByTestId("part-a-paragraph");
    expect(paragraph.textContent).toContain('-');
  });
});
