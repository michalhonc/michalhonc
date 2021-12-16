jest.mock("react-intl", () => {
  const reactIntl = require.requireActual("react-intl");
  const messages = require("./src/i18n/cs.json");
  const intlProvider = new reactIntl.IntlProvider(
    {
      locale: "cs",
      messages,
    },
    {}
  );

  return {
    ...reactIntl,
    useIntl: () => {
      return intlProvider.state.intl;
    },
  };
});
