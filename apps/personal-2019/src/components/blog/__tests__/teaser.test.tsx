import * as React from "react";
import * as Gatsby from "gatsby";
import renderer from "react-test-renderer";
import { renderWithProviders } from "../../../../testWithProviders";
import { Teaser } from "../teaser";
import { Query } from "../data/teaser.data";

describe("teaser", () => {
  const useStaticQuery = jest.spyOn(Gatsby, "useStaticQuery");
  useStaticQuery.mockImplementation(() => Query);

  it("renders correctly", () => {
    const tree = renderWithProviders(<Teaser />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
