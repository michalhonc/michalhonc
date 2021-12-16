import React from "react";
import { useIntl } from "gatsby-plugin-intl";

const CALENDLY_URL =
  "https://calendly.com/michalhonc/free?primary_color=04776a";

export const ReservationConsultation = () => {
  const intl = useIntl();

  return (
    <button
      type="button"
      className="ReservationConsultation"
      onClick={() => {
        if ((window as any).Calendly) {
          (window as any).Calendly.initPopupWidget({ url: CALENDLY_URL });
        } else {
          window.location.href = CALENDLY_URL;
        }
      }}
    >
      {intl.formatMessage({ id: "reservationConsultation" })}
    </button>
  );
};
