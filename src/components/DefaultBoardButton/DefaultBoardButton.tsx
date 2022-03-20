import { Box, CircularProgress } from "@mui/material";
import { FC, KeyboardEvent, SyntheticEvent, useState } from "react";
import { HiFlag } from "react-icons/hi";
import { Coordinates } from "../../types";

interface DefaultBoardButtonProps {
  colIndex: number;
  rowIndex: number;
  disabled?: boolean;
  onClick: (coordinates: Coordinates) => void;
}

export const DefaultBoardButton: FC<DefaultBoardButtonProps> = ({
  colIndex,
  rowIndex,
  disabled,
  onClick,
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [hasFlag, setHasFlag] = useState(false);

  /**
   * Executes the click prop callback passing the coordinates.
   */
  const onTileClick = () => {
    setHasFlag(false);
    setIsLoading(true);
    onClick({ x: colIndex, y: rowIndex });
  };

  /**
   * Adds a flag to the block when right clicking.
   */
  const onContextMenu = (event: SyntheticEvent) => {
    event.preventDefault();
    setHasFlag((flagged) => !flagged);
  };

  const onChange = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key === "Enter") {
      onTileClick();
    }
  };

  return (
    <Box
      aria-label={`Tile ${colIndex} ${rowIndex}`}
      onKeyUp={onChange}
      tabIndex={0}
      data-testid="DefaultBoardButton"
      bgcolor="rgb(148, 151, 156)"
      border="solid #808080"
      width="1.5rem"
      height="1.5rem"
      display="flex"
      justifyContent="center"
      alignItems="center"
      onClick={onTileClick}
      onContextMenu={onContextMenu}
      sx={{
        position: "relative",
        borderWidth: " 0 1px 1px 0",
        boxShadow: 5,
        cursor: "pointer",
        pointerEvents: disabled ? "none" : "initial",
        "&:hover": {
          background: "#d0d0d0",
        },
      }}
    >
      {hasFlag && (
        <HiFlag
          size={18}
          color="rgb(201, 91, 118)"
          data-testid="DefaultBoardButton-flag"
        />
      )}
      {isLoading && <CircularProgress color="secondary" size={18} />}
    </Box>
  );
};
