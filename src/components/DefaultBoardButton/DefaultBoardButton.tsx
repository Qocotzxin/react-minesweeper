import { Box } from "@mui/material";
import { FC } from "react";
import { Coordinates } from "../../types";

interface DefaultBoardButtonProps {
  colIndex: number;
  rowIndex: number;
  onClick: (coordinates: Coordinates) => void;
}

export const DefaultBoardButton: FC<DefaultBoardButtonProps> = ({
  colIndex,
  rowIndex,
  onClick,
}) => {
  return (
    <Box
      data-testid="DefaultBoardButton"
      bgcolor="#c0c0c0"
      border="solid #808080"
      width="1.5rem"
      height="1.5rem"
      onClick={() => onClick({ x: colIndex, y: rowIndex })}
      sx={{
        position: "relative",
        borderWidth: " 0 1px 1px 0",
        boxShadow: 5,
        cursor: "pointer",
        "&:hover": {
          background: "#d0d0d0",
        },
        "&:after": {
          content: '""',
          position: "absolute",
          left: "0",
          top: "0",
          width: "100%",
          height: "100%",
          boxSizing: "border-box",
          background: "#c0c0c0",
          border: "2px outset #ececec",
          fontSize: "0.75rem",
          textAlign: "center",
          pointerEvents: "auto",
        },
      }}
    />
  );
};
