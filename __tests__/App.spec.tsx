/** @vitest-environment jsdom */

import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import App from "../src/components/App";

describe("App healthcheck", () => {
  it("App renders successfully when there isn't a token", () => {
    render(<App />);
    expect(screen.getByText(/ONLIFE RADIO/)).toBeInTheDocument();
  });

  it("App renders successfully when there is a token", async () => {
    const mockParentComponent = { token: "token" };

    const MockParentComponentContext = {
      Provider: ({ children }: { children: any }) => children,
      Consumer: ({ children }: { children: any }) =>
        children(mockParentComponent),
    };

    await render(
      <MockParentComponentContext.Provider>
        {() => <App />}
      </MockParentComponentContext.Provider>
    );

    expect(screen.queryByText(/ONLIFE RADIO/)).not.toBeInTheDocument();
  });
});
