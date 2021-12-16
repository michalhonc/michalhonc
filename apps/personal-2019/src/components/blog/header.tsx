import * as React from "react";
import { useIntl, Link, changeLocale } from "gatsby-plugin-intl";

import { Logo } from "../logo";
import { Nav } from "../nav";

import "../../styles/blog.scss";

interface IProps {
  canChangeLocal?: boolean;
}

export const Header: React.FC<IProps> = ({ canChangeLocal = true }) => {
  const intl = useIntl();

  return (
    <div className="Blog-header">
      <Logo />

      <Nav canChangeLocal={canChangeLocal}>
        <li>
          <Link to="/">{intl.formatMessage({ id: "aboutMe" })}</Link>
        </li>
        <li>
          <Link to="/blog">{intl.formatMessage({ id: "blog" })}</Link>
        </li>
        <li>
          <Link to="/#kontakty">{intl.formatMessage({ id: "contacts" })}</Link>
        </li>
      </Nav>
    </div>
  );
};
