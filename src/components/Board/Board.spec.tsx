import { useMediaQuery } from "@mui/material";
import { fireEvent, render, screen } from "@testing-library/react";
import { Piece } from "../../enum";
import { Board } from "./Board";

const mockOnClick = jest.fn();

const boardMockProps = {
  boardMap: [
    `${Piece.uncovered}${Piece.uncovered}${Piece.uncovered}${Piece.uncovered}`,
  ],
  difficulty: 1,
  onClick: mockOnClick,
};

jest.mock("@mui/material", () => ({
  ...jest.requireActual("@mui/material"),
  useMediaQuery: jest.fn(() => false),
}));

afterAll(() => {
  jest.resetAllMocks();
  jest.resetModules();
});

afterEach(() => {
  mockOnClick.mockClear();
});

describe("Board", () => {
  describe("Snapshot", () => {
    it("Should render correctly and match snapshot.", () => {
      const { container } = render(<Board {...boardMockProps} />);

      expect(container).toMatchSnapshot();
    });
  });

  describe("Behavior", () => {
    it("Should execute onClick event passed through props when clicking a board button.", () => {
      render(<Board {...boardMockProps} />);

      fireEvent.click(screen.getAllByTestId("DefaultBoardButton")[0]);

      expect(mockOnClick).toHaveBeenCalledTimes(1);
    });

    it("Should render a DefaultBoardButton component for each string equal to □.", () => {
      render(<Board {...boardMockProps} />);

      const defaultButtons = screen.getAllByTestId("DefaultBoardButton");
      const uncoveredButtons = screen.queryAllByTestId("UncoveredBoardButton");

      expect(defaultButtons.length).toEqual(4);
      expect(uncoveredButtons.length).toEqual(0);
    });

    it("Should render a UncoveredBoardButton component for each string NOT equal to □.", () => {
      render(<Board onClick={jest.fn()} boardMap={["1"]} difficulty={1} />);

      const defaultButtons = screen.queryAllByTestId("DefaultBoardButton");
      const uncoveredButtons = screen.getAllByTestId("UncoveredBoardButton");

      expect(defaultButtons.length).toEqual(0);
      expect(uncoveredButtons.length).toEqual(1);
    });

    it("Should set the max height of the board to 15 rows in mobile resolutions.", () => {
      render(<Board {...boardMockProps} />);

      expect(screen.getByTestId("Board")).toHaveStyle({
        "max-height": "240px",
      });
    });

    it("Should set the max height of the board to 30 rows in desktop resolutions.", () => {
      (useMediaQuery as jest.Mock).mockImplementation(() => true);
      render(<Board {...boardMockProps} />);

      expect(screen.getByTestId("Board")).toHaveStyle({
        "max-height": "480px",
      });
    });

    it("Should have a border if the board map have elements.", () => {
      render(<Board {...boardMockProps} />);

      expect(screen.getByTestId("Board")).toHaveStyle({
        border: "4px solid whitesmoke",
      });
    });

    it("Should NOT have a border if the board map is empty.", () => {
      render(<Board onClick={jest.fn()} boardMap={[]} difficulty={1} />);

      expect(screen.getByTestId("Board")).toHaveStyle({
        border: "none",
      });
    });
  });
});
