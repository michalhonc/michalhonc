import * as React from "react";
import renderer from "react-test-renderer";
import { Social } from "../social";

describe("social root", () => {
  it("renders correctly", () => {
    const tree = renderer.create(<Social />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
