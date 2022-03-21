import { render, screen } from "@testing-library/react";
import { UncoveredTile } from "./UncoveredTile";

describe("UncoveredTile", () => {
  describe("Snapshot", () => {
    it("Should render correctly and match snapshot.", () => {
      const { container } = render(<UncoveredTile />);

      expect(container).toMatchSnapshot();
    });
  });

  describe("Behavior", () => {
    it("Should render render children as it is when its not equal to *.", () => {
      render(<UncoveredTile>1</UncoveredTile>);

      expect(
        screen.queryByTestId("UncoveredTile-bomb-icon")
      ).not.toBeInTheDocument();
    });

    it("Should render a bomb icon when children passed is *.", () => {
      render(<UncoveredTile>*</UncoveredTile>);

      expect(screen.getByTestId("UncoveredTile-bomb-icon")).toBeInTheDocument();
    });
  });
});
