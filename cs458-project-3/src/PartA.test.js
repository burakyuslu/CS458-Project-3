import {fireEvent, getByTestId, render, screen} from '@testing-library/react';
import App from './App';
import userEvent from "@testing-library/user-event";


describe("Checking for the input, to see if it is really entered.", () => {
  test('Testing for latitude text field', () => {
    render(<App/>);

    const latitude = screen.getByTestId("part-a-field-1");
    userEvent.type(latitude, "51.5072");

    expect(latitude).toHaveValue("51.5072");
  });
});

describe("Checking for the input, to see if it is really entered.", () => {
  test('Testing for Longitude text field', () => {
    render(<App/>);

    const longitude = screen.getByTestId("part-a-field-2");
    userEvent.type(longitude, "0.1276");

    expect(longitude).toHaveValue("0.1276");
  });
});


describe("Checking to see if the calculation of the country is correct", () => {
  test('Testing for the latitude and longitude of London', () => {
    render(<App/>);

    const latitude = screen.getByTestId("part-a-field-1");
    userEvent.type(latitude, "51.5072");

    const longitude = screen.getByTestId("part-a-field-2");
    userEvent.type(longitude, "51.5072");

    const calculateButton = screen.getByTestId("part-a-button");
    userEvent.click(calculateButton);


    const paragraph = screen.getByTestId("part-a-paragraph");

    //todo add England as country later
    expect(paragraph.textContent).toEqual('Your Country: calculatedYourCountry')
  });
});


//todo add coordinates for a different country when the api is ready
describe("Checking to see if the calculation of the country is correct (for Country2)", () => {
  test('Testing for the latitude and longitude of City2', () => {
    render(<App/>);

    const latitude = screen.getByTestId("part-a-field-1");
    userEvent.type(latitude, "");

    const longitude = screen.getByTestId("part-a-field-2");
    userEvent.type(longitude, "");

    const calculateButton = screen.getByTestId("part-a-button");
    userEvent.click(calculateButton);


    const paragraph = screen.getByTestId("part-a-paragraph");

    //todo add Entered Country as country later
    expect(paragraph.textContent).toEqual('Your Country: calculatedYourCountry')
  });
});


//todo add coordinates for a different country when the api is ready
describe("Checking to see if the calculation of the country is correct (for Country3)", () => {
  test('Testing for the latitude and longitude of City3', () => {
    render(<App/>);

    const latitude = screen.getByTestId("part-a-field-1");
    userEvent.type(latitude, "");

    const longitude = screen.getByTestId("part-a-field-2");
    userEvent.type(longitude, "");

    const calculateButton = screen.getByTestId("part-a-button");
    userEvent.click(calculateButton);


    const paragraph = screen.getByTestId("part-a-paragraph");

    //todo add Entered Country as country later
    expect(paragraph.textContent).toEqual('Your Country: calculatedYourCountry')
  });
});