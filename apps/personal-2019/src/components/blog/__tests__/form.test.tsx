import * as React from "react";
import renderer from "react-test-renderer";
import { Form } from "../form";

describe("form", () => {
  it("renders correctly", () => {
    const tree = renderer
      .create(<Form category="category" language="cs" source="source" />)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
