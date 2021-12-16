import * as React from "react";
import * as Gatsby from "gatsby";
import renderer from "react-test-renderer";
import { renderWithProviders } from "../../../testWithProviders";
import { Header } from "../header";
import { HeaderQuery } from "../data/header.data";

describe("header", () => {
  const useStaticQuery = jest.spyOn(Gatsby, "useStaticQuery");
  useStaticQuery.mockImplementation(() => HeaderQuery);

  it("renders correctly", () => {
    const tree = renderWithProviders(<Header />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
