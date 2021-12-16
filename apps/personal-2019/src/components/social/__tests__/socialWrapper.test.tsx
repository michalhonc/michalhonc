import * as React from "react";
import renderer from "react-test-renderer";
import { SocialWrapper } from "../socialWrapper";

describe("socialWrapper", () => {
  it("renders correctly", () => {
    const tree = renderer
      .create(
        <SocialWrapper
          Icon="0123"
          profile="@profile"
          profileUrl="https://example.com"
          className="className"
        >
          <div>Test div</div>
        </SocialWrapper>
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
