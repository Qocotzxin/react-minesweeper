import { Box, CircularProgress } from "@mui/material";
import { FC, KeyboardEvent, SyntheticEvent, useState } from "react";
import { HiFlag } from "react-icons/hi";
import { useSelector } from "react-redux";
import { useAppDispatch } from "../../../app/hooks";
import { RootState } from "../../../app/store";
import { selectCoordinates, updateFlaggedTiles } from "../tileSlice";

interface DefaultTileProps {
  colIndex: number;
  rowIndex: number;
  disabled?: boolean;
}

export const DefaultTile: FC<DefaultTileProps> = ({
  colIndex,
  rowIndex,
  disabled,
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useAppDispatch();
  const flaggedTiles = useSelector(
    (state: RootState) => state.tile.flaggedTiles
  );

  const isFlagged = flaggedTiles.find(
    (tile) => tile.x === colIndex && tile.y === rowIndex
  );

  /**
   * Executes the click prop callback passing the coordinates.
   */
  const onTileClick = () => {
    setIsLoading(true);
    dispatch(selectCoordinates({ x: colIndex, y: rowIndex }));
    if (isFlagged) {
      dispatch(updateFlaggedTiles({ x: colIndex, y: rowIndex }));
    }
  };

  /**
   * Adds a flag to the block when right clicking.
   */
  const onContextMenu = (event: SyntheticEvent) => {
    event.preventDefault();
    dispatch(updateFlaggedTiles({ x: colIndex, y: rowIndex }));
  };

  const onKeyUp = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key === "Enter") {
      onTileClick();
    }
  };

  return (
    <Box
      aria-label={`Tile ${colIndex} ${rowIndex}`}
      onKeyUp={onKeyUp}
      tabIndex={0}
      data-testid="DefaultTile"
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
      {isFlagged && !isLoading && (
        <HiFlag
          size={18}
          color="rgb(201, 91, 118)"
          data-testid="DefaultTile-flag"
        />
      )}
      {isLoading && <CircularProgress color="secondary" size={18} />}
    </Box>
  );
};
