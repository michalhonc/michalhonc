import React from "react";
import css from "./Footer.module.scss";

import Logo from "../../assets/images/logo.svg";
import Twitter from "../../assets/images/twitter.svg";
import Github from "../../assets/images/git.svg";
import Linkedin from "../../assets/images/linkedin.svg";
import Instagram from "../../assets/images/instagram.svg";

import Ex from "../../assets/images/ex.svg";
import Curve from "../../assets/images/curve.svg";

export function Footer() {
  return (
    <section className={css.footer}>
      <div className={css.container}>
        <div className={css.ex}>
          <Ex />
        </div>
        <div className={css.curve}>
          <Curve />
        </div>

        <div className={css.logo}>
          <Logo />
        </div>

        <ul className={css.social}>
          <li>
            <a
              aria-label="Instagram"
              href="https://instagram.com/michalhonc.cz/"
            >
              <Instagram />
            </a>
          </li>
          <li>
            <a aria-label="LinkedIn" href="https://linkedin.com/in/michalhonc/">
              <Linkedin />
            </a>
          </li>
          <li>
            <a aria-label="Twitter" href="https://twitter.com/michalhonc">
              <Twitter />
            </a>
          </li>
          <li>
            <a aria-label="Github" href="https://github.com/michalhonc/">
              <Github />
            </a>
          </li>
        </ul>

        <a
          href="mailto:info@michalhonc.cz"
          className={`${css.email} underline-alpha`}
        >
          info@michalhonc.cz
        </a>
      </div>
    </section>
  );
}
