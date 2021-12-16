import * as React from "react";
import * as Gatsby from "gatsby";
import renderer from "react-test-renderer";
import { renderWithProviders } from "../../../testWithProviders";
import { Presentation } from "../presentation";
import { PresentationQuery } from "../data/presentation.data";

describe("presentation", () => {
  const useStaticQuery = jest.spyOn(Gatsby, "useStaticQuery");
  useStaticQuery.mockImplementation(() => PresentationQuery);

  it("renders correctly", () => {
    const tree = renderWithProviders(<Presentation />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
