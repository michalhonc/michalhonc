import * as React from "react";
import renderer from "react-test-renderer";
import { renderWithProviders } from "../../../testWithProviders";
import { ReservationConsultation } from "../reservationConsultation";

describe("reservationConsultation", () => {
  it("renders correctly", () => {
    const tree = renderWithProviders(<ReservationConsultation />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
