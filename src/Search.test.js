import React from "react";
import { render, screen, fireEvent, act } from "@testing-library/react";
import Search from "./Search";

// Mock data for testing
const mockData = {
  summaries: [
    { id: 1, summary: "Summary 1" },
    { id: 2, summary: "Summary 2" },
  ],
  titles: {
    1: "Title 1",
    2: "Title 2",
  },
  authors: {
    1: { author: "Author 1" },
    2: { author: "Author 2" },
  },
};

describe("Search component", () => {
  it("renders search component correctly", () => {
    render(<Search data={mockData} />);

    expect(
      screen.getByPlaceholderText("Enter search term")
    ).toBeInTheDocument();
    expect(screen.getByText("Submit")).toBeInTheDocument();
  });

  it("handles search and click events correctly", async () => {
    render(<Search data={mockData} />);

    fireEvent.change(screen.getByPlaceholderText("Enter search term"), {
      target: { value: "Summary" },
    });

    await act(async () => {
      await new Promise((resolve) => setTimeout(resolve, 300));
    });

    expect(screen.getByText("1 - Title 1")).toBeInTheDocument();
    expect(screen.getByText("2 - Title 2")).toBeInTheDocument();

    fireEvent.click(screen.getByText("1 - Title 1"));

    expect(screen.getByDisplayValue("Title 1")).toBeInTheDocument();
    expect(screen.getByText("Submit")).toBeEnabled();
  });
  it("renders search component with input and submit button", () => {
    render(<Search data={mockData} />);

    expect(
      screen.getByPlaceholderText("Enter search term")
    ).toBeInTheDocument();
    expect(screen.getByText("Submit")).toBeInTheDocument();
  });

  it("displays search results after typing in the input", async () => {
    render(<Search data={mockData} />);

    fireEvent.change(screen.getByPlaceholderText("Enter search term"), {
      target: { value: "Summary" },
    });

    await act(async () => {
      await new Promise((resolve) => setTimeout(resolve, 300));
    });

    expect(screen.getByText("1 - Title 1")).toBeInTheDocument();
    expect(screen.getByText("2 - Title 2")).toBeInTheDocument();
  });
});
