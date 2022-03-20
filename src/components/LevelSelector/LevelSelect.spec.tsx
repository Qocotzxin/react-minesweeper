import { fireEvent, render, screen } from "@testing-library/react";
import { LevelSelector } from "./LevelSelector";

const mockOnStart = jest.fn();

const levelSelectorMockProps = {
  onStart: mockOnStart,
  isReady: true,
};

afterEach(() => {
  mockOnStart.mockClear();
});

describe("LevelSelector", () => {
  describe("Snapshot", () => {
    it("Should render correctly and match snapshot.", () => {
      const { container } = render(
        <LevelSelector {...levelSelectorMockProps} />
      );

      expect(container).toMatchSnapshot();
    });
  });

  describe("Behavior", () => {
    it("Should call onStart when clicking the button passing the selected difficulty.", () => {
      const { container } = render(
        <LevelSelector {...levelSelectorMockProps} />
      );

      const labels = container.querySelectorAll("label");
      fireEvent.click(labels[2]);
      fireEvent.click(screen.getByRole("button"));

      expect(mockOnStart).toHaveBeenCalledTimes(1);
      expect(mockOnStart).toHaveBeenCalledWith(3);
    });

    it("Should render a spinner and set rating component to disabled if isReady is false.", () => {
      render(<LevelSelector {...levelSelectorMockProps} isReady={false} />);

      expect(screen.getByTestId("LevelSelector-spinner")).toBeInTheDocument();
    });
  });
});
