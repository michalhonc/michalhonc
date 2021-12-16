import * as React from "react";
import renderer from "react-test-renderer";
import { renderWithProviders } from "../../../testWithProviders";
import { Logo } from "../logo";

describe("logo", () => {
  it("renders correctly", () => {
    const tree = renderWithProviders(<Logo />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
