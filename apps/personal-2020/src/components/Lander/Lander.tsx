import React from "react";

import css from "./Lander.module.scss";

import Waves from "../../assets/images/waves.svg";
import Birds from "../../assets/images/birds.svg";
import PhoneLight from "../../assets/images/phone-light.svg";
import Ovals from "../../assets/images/ovals.svg";

export function Lander() {
  return (
    <section className={css.container}>
      <div className={css.lander}>
        <div className={css.visualContent}>
          <span className={css.ovals}>
            <Ovals />
          </span>
          <span className={css.phoneLight}>
            <PhoneLight />
          </span>
        </div>
        <div className={css.content}>
          <span className={css.waves}>
            <Waves />
          </span>
          <span className={css.birds}>
            <Birds />
          </span>

          <span className={css.contentName}>Michal Honc</span>
          <h1
            dangerouslySetInnerHTML={{
              __html: "Developer of mobile<br>and web applications",
            }}
          />
          <a
            href="mailto:info@michalhonc.cz"
            className={`${css.contentEmail} underline-alpha--light`}
          >
            info@michalhonc.cz
          </a>
        </div>
      </div>
    </section>
  );
}
