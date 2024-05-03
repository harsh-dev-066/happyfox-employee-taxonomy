import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import Navbar from "../components/navbar/Navbar";

describe("Navbar Component", () => {
  test("renders correctly with given title", () => {
    const testTitle = "Test Navbar Title";
    render(<Navbar title={testTitle} />);
    const titleElement = screen.getByText(testTitle);
    expect(titleElement).toBeInTheDocument();
    expect(titleElement).toHaveClass("title");
  });
});
