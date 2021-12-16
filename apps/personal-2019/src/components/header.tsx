import * as React from "react";
import { useStaticQuery, graphql } from "gatsby";
import BackgroundImage from "gatsby-background-image";
import { Link, useIntl, changeLocale } from "gatsby-plugin-intl";

import { Logo } from "./logo";
import Translate from "../images/translate.svg";
import { ReservationConsultation } from "./reservationConsultation";
import { Nav } from "./nav";

const Query = graphql`
  {
    background: file(relativePath: { eq: "header-background.jpg" }) {
      childImageSharp {
        fluid(maxWidth: 1920, quality: 90) {
          ...GatsbyImageSharpFluid_withWebp
        }
      }
    }
    foreground: file(relativePath: { eq: "header-foreground.png" }) {
      childImageSharp {
        fluid(maxWidth: 1920, quality: 100) {
          ...GatsbyImageSharpFluid_withWebp
        }
      }
    }
  }
`;

export const Header: React.FC = () => {
  const intl = useIntl();
  const data = useStaticQuery(Query);

  const { fluid: background } = data.background.childImageSharp;
  const { fluid: foreground } = data.foreground.childImageSharp;

  return (
    <header className="Header">
      <BackgroundImage
        Tag="div"
        className="Header-background"
        fluid={background}
      />
      <BackgroundImage
        Tag="div"
        className="Header-foreground"
        fluid={foreground}
      />

      <div className="Header-hero">
        <h1>
          <div>{intl.formatMessage({ id: "hero_1" })}</div>
          <div
            dangerouslySetInnerHTML={{
              __html: intl.formatMessage({ id: "hero_2" }),
            }}
          />
          <div>{intl.formatMessage({ id: "hero_3" })}</div>
          <div
            dangerouslySetInnerHTML={{
              __html: intl.formatMessage({ id: "hero_4" }),
            }}
          />
        </h1>
        <ReservationConsultation />
      </div>

      <Logo />

      <Nav canChangeLocal>
        <li>
          <Link to="/blog">{intl.formatMessage({ id: "blog" })}</Link>
        </li>
        <li>
          <a href="#kontakty">{intl.formatMessage({ id: "contacts" })}</a>
        </li>
      </Nav>

      {/* <button className="Header-button">
        <span><FormattedMessage id="download_CV" /></span>
      </button> */}
    </header>
  );
};
