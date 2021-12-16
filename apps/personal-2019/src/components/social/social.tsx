import * as React from "react";

import { InstagramFeed } from "./instagramFeed";
import { TwitterFeed } from "./twitterFeed";

export const Social = () => {
  return (
    <section id="portoflio" className="Container Social">
      <InstagramFeed />
      <TwitterFeed />
    </section>
  );
};
