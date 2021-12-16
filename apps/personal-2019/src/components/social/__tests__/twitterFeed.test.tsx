import * as React from "react";
import renderer from "react-test-renderer";
import { TwitterFeed } from "../twitterFeed";

describe("twitterFeed", () => {
  it("renders correctly", () => {
    const tree = renderer.create(<TwitterFeed />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
