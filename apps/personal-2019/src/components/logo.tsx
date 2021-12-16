import * as React from "react";
import { Link } from "gatsby-plugin-intl";

import LogoImage from "../images/logo.svg";
import LogoBackground from "../images/logo-background.svg";

export const Logo: React.FC = () => {
  return (
    <div className="Header-logo">
      <div>
        <LogoBackground className="Header-logo-background" />
        <Link to="/" aria-label="Michal Honc Logo">
          <LogoImage className="Header-logo-foreground" />
        </Link>
      </div>
    </div>
  );
};
