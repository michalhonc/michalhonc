import * as React from "react";
import { Link, useIntl, changeLocale } from "gatsby-plugin-intl";

import Translate from "../images/translate.svg";

interface IProps {
  canChangeLocal?: boolean;
}

export const Nav: React.FC<IProps> = ({ children, canChangeLocal = false }) => {
  const intl = useIntl();

  return (
    <nav>
      <ul className="Header-navigation">{children}</ul>

      {canChangeLocal && (
        <button
          className="Header-changeLocale"
          type="button"
          onClick={() => changeLocale(intl.locale === "cs" ? "en" : "cs")}
          aria-label={intl.formatMessage({ id: "change_lang" })}
        >
          <Translate />
        </button>
      )}
    </nav>
  );
};
