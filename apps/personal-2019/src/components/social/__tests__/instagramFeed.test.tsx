import * as React from "react";
import renderer from "react-test-renderer";
import { InstagramFeed } from "../instagramFeed";

describe("instagramFeed", () => {
  it("renders correctly", () => {
    const tree = renderer.create(<InstagramFeed />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
