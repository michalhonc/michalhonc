import { CONF as dev } from "./conf.dev";
import { CONF as prod } from "./conf.prod";

export const conf = process.env.NODE_ENV === "production" ? prod : dev;
