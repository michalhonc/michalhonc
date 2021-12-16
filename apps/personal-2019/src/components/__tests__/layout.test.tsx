import * as React from "react";
import renderer from "react-test-renderer";
import { renderWithProviders } from "../../../testWithProviders";
import { Layout } from "../layout";

describe("layout", () => {
  it("renders correctly", () => {
    const tree = renderWithProviders(<Layout />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
