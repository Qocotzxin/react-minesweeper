import { render, screen } from "@testing-library/react";
import { Message } from "../../enum";
import { ResultMessage } from "./ResultMessage";

describe("ResultMessage", () => {
  describe("Snapshot", () => {
    it("Should render correctly and match snapshot.", () => {
      const { container } = render(<ResultMessage message={Message.win} />);
      expect(container).toMatchSnapshot();
    });
  });

  describe("Behavior", () => {
    it("Should render message and the lose icon when message passed is Message.lose.", () => {
      render(<ResultMessage message={Message.lose} />);
      expect(screen.getByText(Message.lose)).toBeInTheDocument();
      expect(screen.getByTestId(/ResultMessage-lose-icon/)).toBeInTheDocument();
    });

    it("Should render message and the win icon when message passed is Message.win.", () => {
      render(<ResultMessage message={Message.win} />);
      expect(screen.getByText(Message.win)).toBeInTheDocument();
      expect(screen.getByTestId(/ResultMessage-win-icon/)).toBeInTheDocument();
    });
  });
});
