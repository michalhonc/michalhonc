import React, { useState, useCallback, FormEvent } from "react";
// @ts-ignore 7016
import addToMailchimp from "gatsby-plugin-mailchimp";
import { useIntl } from "gatsby-plugin-intl";

import EnvelopeSvg from "../../images/envelope.svg";
import LoaderSvg from "../../images/loader.svg";
import "../../styles/form.scss";

const IS_ALREADY_REGISTERED = "is already subscribed to list";
const IS_NOT_VALID = "The email you entered is not valid";
const IS_NOT_REAL = "This email address looks fake or invalid";

interface IProps {
  category: string;
  language: string;
  source: string;
}

export const Form: React.FC<IProps> = ({ category, language, source }) => {
  const intl = useIntl();
  const [email, setEmail] = useState("");
  const [firstname, setFirstname] = useState("");
  const [state, setState] = useState("idle");
  const [msg, setMsg] = useState("");

  const handleSubmit = useCallback(
    async (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      setState("loading");
      setMsg("");
      const listFields = {
        FNAME: firstname,
        CATEGORY: category,
        LANG: language,
        SOURCE: source,
      };
      const result = await addToMailchimp(email, listFields);

      setState(result.result);
      setMsg(translateErrorMessage(result.msg, intl));
    },
    [firstname, category, language, source]
  );

  return (
    <section className="Form">
      <div className="Form-left">
        <EnvelopeSvg />
      </div>
      <div className="Form-right">
        <h2>{intl.formatMessage({ id: "form_title" })}</h2>
        <p>{intl.formatMessage({ id: "form_desc" })}</p>
        <form data-state={state} onSubmit={handleSubmit}>
          <input
            type="text"
            onChange={(e) => setFirstname(e.target.value)}
            placeholder={intl.formatMessage({ id: "form_firstname" })}
            required
          />
          <input
            type="email"
            onChange={(e) => {
              setState("idle");
              setMsg("");
              setEmail(e.target.value);
            }}
            placeholder={intl.formatMessage({ id: "form_email" })}
            required
          />
          <div className="Form-message">
            {state === "error" && msg}
            {state === "loading" && <LoaderSvg />}
          </div>
          <input
            type="submit"
            value={intl.formatMessage({ id: "form_submit" })}
          />
        </form>
      </div>
    </section>
  );
};

function translateErrorMessage(msg: string, intl: any) {
  if (msg.includes(IS_NOT_VALID) || msg.includes(IS_NOT_REAL)) {
    return intl.formatMessage({ id: "form_error_isNotValid" });
  }
  if (msg.includes(IS_ALREADY_REGISTERED)) {
    return intl.formatMessage({ id: "form_error_isAlreadyRegistered" });
  }
  return intl.formatMessage({ id: "form_error_general" });
}
