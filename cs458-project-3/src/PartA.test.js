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

  test('Testing for Longitude text field', () => {
    render(<App/>);

    const longitude = screen.getByTestId("part-a-field-2");
    userEvent.type(longitude, "0.1276");

    expect(longitude).toHaveValue("0.1276");
  });
});


describe("Checking to see if the calculation of the country is correct", () => {
  test('Testing for the latitude and longitude of Russia', async () =>  {
    render(<App/>);

    const latitude = screen.getByTestId("part-a-field-1");
    userEvent.type(latitude, "51.5072");

    const longitude = screen.getByTestId("part-a-field-2");
    userEvent.type(longitude, "51.5072");

    const calculateButton = screen.getByTestId("part-a-button");
    userEvent.click(calculateButton);


    const paragraph = await screen.findByTestId("part-a-paragraph");

    expect(paragraph.textContent).toEqual('Your Country: Russia')
  });
});
