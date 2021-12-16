import * as React from "react";
import { useStaticQuery, graphql } from "gatsby";
import Img from "gatsby-image";
import { useIntl } from "gatsby-plugin-intl";

import Lines from "../images/lines.svg";
import Dots from "../images/dots.svg";

import { ReservationConsultation } from "./reservationConsultation";
const Query = graphql`
  {
    mockup: file(relativePath: { eq: "mockup.png" }) {
      childImageSharp {
        fluid(maxWidth: 400, quality: 100) {
          ...GatsbyImageSharpFluid_withWebp
        }
      }
    }
  }
`;

export const Presentation = () => {
  const intl = useIntl();
  const { mockup } = useStaticQuery(Query);

  return (
    <section className="Container Presentation">
      <h2
        id="presentation"
        dangerouslySetInnerHTML={{
          __html: intl.formatMessage({ id: "presentation_title" }),
        }}
      />
      <div className="Presentation-container">
        <div className="Presentation-photo">
          <Img fluid={mockup.childImageSharp.fluid} />
          <Lines className="Presentation-lines" />
        </div>
        <div className="Presentation-content">
          <ul>
            <li
              dangerouslySetInnerHTML={{
                __html: intl.formatMessage({ id: "presentation_text_1" }),
              }}
            />
            <li
              dangerouslySetInnerHTML={{
                __html: intl.formatMessage({ id: "presentation_text_2" }),
              }}
            />
            <li
              dangerouslySetInnerHTML={{
                __html: intl.formatMessage({ id: "presentation_text_3" }),
              }}
            />
          </ul>
          <ReservationConsultation />
        </div>
      </div>
    </section>
  );
};
