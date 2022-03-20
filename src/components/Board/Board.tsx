import { Stack, useMediaQuery } from "@mui/material";
import { FC, memo } from "react";
import { DefaultBoardButton, UncoveredBoardButton } from "../";
import { Piece } from "../../enum";
import { Coordinates } from "../../types";
import { FixedSizeGrid } from "react-window";

interface BoardProps {
  boardMap: string[];
  difficulty: number;
  onClick: (coordinates: Coordinates) => void;
}

export const Board: FC<BoardProps> = ({ boardMap, difficulty, onClick }) => {
  const isDesktop = useMediaQuery("(min-width:680px)");
  const columns = (boardMap.length && boardMap[0].length) || 0;

  const ItemRenderer = memo(({ style, rowIndex, columnIndex }: any) => {
    const content = boardMap[rowIndex][columnIndex];
    return (
      <Stack key={rowIndex} direction="row" style={style}>
        {content === Piece.uncovered ? (
          <DefaultBoardButton
            key={columnIndex}
            colIndex={columnIndex}
            rowIndex={rowIndex}
            onClick={onClick}
          />
        ) : (
          <UncoveredBoardButton key={columnIndex}>
            {content}
          </UncoveredBoardButton>
        )}
      </Stack>
    );
  });

  return (
    <Stack
      data-testid="Board"
      alignItems="center"
      my="1rem"
      width="max-content"
      maxWidth="100%"
      // Max height: desktop - 30 rows, mobile - 15 rows
      maxHeight={isDesktop ? "480px" : "240px"}
      border={boardMap.length ? "4px solid whitesmoke" : "none"}
      borderRadius="4px"
      sx={{
        overflow: "auto",
      }}
    >
      <FixedSizeGrid
        columnCount={columns}
        rowCount={boardMap.length}
        columnWidth={24}
        rowHeight={24}
        height={difficulty === 1 ? 240 : 480}
        width={difficulty === 1 ? 240 : 480}
      >
        {ItemRenderer}
      </FixedSizeGrid>
    </Stack>
  );
};
