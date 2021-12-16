import * as React from "react";

import Logo from "../images/logo.svg";
import Phone from "../images/phone.svg";
import Whatsapp from "../images/whatsapp.svg";
import Twitter from "../images/twitter.svg";
import Linkedin from "../images/linkedin.svg";
import Instagram from "../images/instagram.svg";
import Email from "../images/email.svg";

export const Footer = () => (
  <footer id="kontakty">
    <Logo />
    <ul>
      <li>
        <a aria-label="mobile" href="tel:+420733209581">
          <Phone />
        </a>
      </li>
      <li>
        <a aria-label="WhatsApp" href="https://wa.me/420733209581">
          <Whatsapp />
        </a>
      </li>
      <li>
        <a aria-label="Twitter" href="https://twitter.com/michalhonc">
          <Twitter />
        </a>
      </li>
      <li>
        <a aria-label="LinkedIn" href="https://linkedin.com/in/michalhonc/">
          <Linkedin />
        </a>
      </li>
      <li>
        <a aria-label="Instagram" href="https://instagram.com/michalhonc.cz/">
          <Instagram />
        </a>
      </li>
      <li>
        <a aria-label="E-mail" href="mailto:info@michalhonc.cz">
          <Email />
        </a>
      </li>
    </ul>
    <small className="underline">
      {new Date().getFullYear()} Michal Honc |{" "}
      <a title="E-mail" href="mailto:info@michalhonc.cz">
        info@michalhonc.cz
      </a>
    </small>
  </footer>
);
