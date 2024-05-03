import "@testing-library/jest-dom";
import { render, screen, fireEvent } from "@testing-library/react";
import { Filter } from "../components";

describe("Filter Component", () => {
  const filterOptions = ["Test A", "Test B", "Test C"];

  test("renders the filter button initially", () => {
    render(<Filter filterOptions={filterOptions} />);
    const filterButton = screen.getByTestId("filter");
    expect(filterButton).toBeInTheDocument();
  });

  test("toggles filter options on button click", () => {
    render(<Filter filterOptions={filterOptions} />);
    const filterButton = screen.getByTestId("filter");

    expect(screen.queryByText("All Teams")).not.toBeInTheDocument();

    fireEvent.click(filterButton);
    expect(screen.getByText("All Teams")).toBeInTheDocument();
    expect(screen.getByText("Test A")).toBeInTheDocument();

    fireEvent.click(filterButton);
    expect(screen.queryByText("All Teams")).not.toBeInTheDocument();
  });

  test("calls onSelectFilter when a filter is selected", () => {
    const onSelectFilter = jest.fn();
    render(
      <Filter filterOptions={filterOptions} onSelectFilter={onSelectFilter} />
    );

    fireEvent.click(screen.getByTestId("filter"));

    fireEvent.click(screen.getByText("Test A"));
    expect(onSelectFilter).toHaveBeenCalledWith("Test A");
    expect(screen.queryByText("All Teams")).not.toBeInTheDocument();
  });
});
