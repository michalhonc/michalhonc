import * as React from "react";

import { Footer } from "./footer";
import "../styles/main.scss";

export const Layout: React.FC = ({ children }) => (
  <div className="Layout">
    <div>
      <main>{children}</main>
      <Footer />
    </div>
  </div>
);
