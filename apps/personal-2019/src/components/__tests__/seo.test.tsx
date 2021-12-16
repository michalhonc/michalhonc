import * as React from "react";
import * as Gatsby from "gatsby";
import renderer from "react-test-renderer";
import { renderWithProviders } from "../../../testWithProviders";
import { SEO } from "../seo";
import { SeoQuery } from "../data/seo.data";

describe("seo", () => {
  const useStaticQuery = jest.spyOn(Gatsby, "useStaticQuery");
  useStaticQuery.mockImplementation(() => SeoQuery);

  it("renders correctly", () => {
    const tree = renderWithProviders(
      <SEO description="description" lang="cs" title="title" />
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
