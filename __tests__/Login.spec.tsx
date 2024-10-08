/** @vitest-environment jsdom */

import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import Login from "../src/components/Login";

describe("Login healthcheck", () => {
  it("Login renders successfully", () => {
    render(<Login />);
    expect(screen.getByText(/ONLIFE RADIO/)).toBeInTheDocument();
  });
});
