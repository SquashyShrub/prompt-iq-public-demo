import { describe, expect, it } from "vitest";
import { toFriendlyUserMessage } from "@/utils/friendlyErrors";

describe("toFriendlyUserMessage", () => {
  it("maps network fetch failures to a friendly connection message", () => {
    const message = toFriendlyUserMessage(new Error("Failed to fetch"));

    expect(message).toBe(
      "Network connection issue detected. Please check your connection and try again.",
    );
  });

  it("maps 500 API responses to a friendly optimization error", () => {
    const message = toFriendlyUserMessage(null, { status: 500 });

    expect(message).toBe(
      "Something went wrong while optimizing your prompt. Please try again.",
    );
  });

  it("maps known API error messages to friendly copy", () => {
    expect(
      toFriendlyUserMessage(null, { apiMessage: "Failed to improve prompt" }),
    ).toBe(
      "Something went wrong while optimizing your prompt. Please try again.",
    );

    expect(
      toFriendlyUserMessage(null, { apiMessage: "Invalid JSON body" }),
    ).toBe("There was a problem sending your prompt. Please try again.");
  });

  it("passes through validation-style API messages", () => {
    const apiMessage =
      "prompt is required and must be a non-empty string";

    expect(toFriendlyUserMessage(null, { apiMessage })).toBe(apiMessage);
  });

  it("falls back to a generic optimization error", () => {
    expect(toFriendlyUserMessage(null)).toBe(
      "Something went wrong while optimizing your prompt. Please try again.",
    );
  });
});
