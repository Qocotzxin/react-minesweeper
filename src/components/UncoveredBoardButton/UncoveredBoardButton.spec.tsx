import { render, screen } from "@testing-library/react";
import { UncoveredBoardButton } from "./UncoveredBoardButton";

describe("UncoveredBoardButton", () => {
  describe("Snapshot", () => {
    it("Should render correctly and match snapshot.", () => {
      const { container } = render(<UncoveredBoardButton />);

      expect(container).toMatchSnapshot();
    });
  });

  describe("Behavior", () => {
    it("Should render render children as it is when its not equal to *.", () => {
      render(<UncoveredBoardButton>1</UncoveredBoardButton>);

      expect(
        screen.queryByTestId("UncoveredBoardButton-bomb-icon")
      ).not.toBeInTheDocument();
    });

    it("Should render a bomb icon when children passed is *.", () => {
      render(<UncoveredBoardButton>*</UncoveredBoardButton>);

      expect(
        screen.getByTestId("UncoveredBoardButton-bomb-icon")
      ).toBeInTheDocument();
    });
  });
});
