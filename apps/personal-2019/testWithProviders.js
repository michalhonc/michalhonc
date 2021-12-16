import React from "react";
import renderer from "react-test-renderer";
import { IntlContextProvider } from "gatsby-plugin-intl";

export const renderWithProviders = (component) =>
  renderer.create(
    <IntlContextProvider value={{ language: "en-US", routed: true }}>
      {component}
    </IntlContextProvider>
  );
