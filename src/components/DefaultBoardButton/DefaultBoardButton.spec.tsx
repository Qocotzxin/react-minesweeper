import { fireEvent, render, screen } from "@testing-library/react";
import { DefaultBoardButton } from "./DefaultBoardButton";

const mockOnClick = jest.fn();

const defaultBoardButtonMockProps = {
  colIndex: 1,
  rowIndex: 2,
  onClick: mockOnClick,
};

afterEach(() => {
  mockOnClick.mockClear();
});

afterAll(() => {
  jest.resetAllMocks();
});

describe("DefaultBoardButton", () => {
  describe("Snapshot", () => {
    it("Should render correctly and match snapshot.", () => {
      const { container } = render(
        <DefaultBoardButton {...defaultBoardButtonMockProps} />
      );

      expect(container).toMatchSnapshot();
    });
  });

  describe("Behavior", () => {
    it("Should call onClick with the right coordinates", () => {
      render(<DefaultBoardButton {...defaultBoardButtonMockProps} />);

      fireEvent.click(screen.getByTestId("DefaultBoardButton"));

      expect(mockOnClick).toHaveBeenCalledTimes(1);
      expect(mockOnClick).toHaveBeenCalledWith({ x: 1, y: 2 });
    });
  });
});
