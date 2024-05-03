import "@testing-library/jest-dom";
import { render, screen, fireEvent } from "@testing-library/react";
import { SearchBox } from "../components";

describe("SearchBox Component", () => {
  test("renders with default placeholder", () => {
    render(<SearchBox onSearch={jest.fn()} />);
    expect(screen.getByPlaceholderText("Search")).toBeInTheDocument();
  });

  test("calls onSearch when Enter key is pressed", () => {
    const handleSearch = jest.fn();
    render(<SearchBox onSearch={handleSearch} placeholder="Search" />);
    const input = screen.getByPlaceholderText("Search");
    fireEvent.change(input, { target: { value: "test" } });
    fireEvent.keyDown(input, { key: "Enter", code: "Enter" });
    expect(handleSearch).toHaveBeenCalledWith("test");
  });

  test("calls onChange when text is typed into the input", () => {
    const handleChange = jest.fn();
    render(
      <SearchBox
        onChange={handleChange}
        onSearch={jest.fn()}
        placeholder="Search"
      />
    );
    const input = screen.getByPlaceholderText("Search");
    fireEvent.change(input, { target: { value: "test" } });
    expect(handleChange).toHaveBeenCalledWith("test");
  });

  test("calls onSearch when search button is clicked", () => {
    const handleSearch = jest.fn();
    render(<SearchBox onSearch={handleSearch} />);
    const searchButton = screen.getByTestId("search-button");
    fireEvent.click(searchButton);
    expect(handleSearch).toHaveBeenCalled();
  });

  test("clears the input when clear button is clicked", () => {
    render(<SearchBox onSearch={jest.fn()} placeholder="Search" />);
    const input = screen.getByPlaceholderText("Search");
    fireEvent.change(input, { target: { value: "test" } });

    const clearButton = screen.getByTestId("clear-button");
    fireEvent.click(clearButton);

    expect(input).toHaveValue("");
  });
});
