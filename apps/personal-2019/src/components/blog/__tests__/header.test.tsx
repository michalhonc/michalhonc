import * as React from "react";
import renderer from "react-test-renderer";
import { renderWithProviders } from "../../../../testWithProviders";
import { Header } from "../header";

describe("[Blog] header", () => {
  it("renders correctly", () => {
    const tree = renderWithProviders(<Header />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
