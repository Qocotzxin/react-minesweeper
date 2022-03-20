import { Box, LinearProgress, Stack, Typography } from "@mui/material";
import React, { useCallback } from "react";
import { useSelector } from "react-redux";
import { useAppDispatch } from "../../app/hooks";
import { RootState } from "../../app/store";
import { Board, LevelSelector, ResultMessage } from "../../components";
import { Message } from "../../enum";
import { selectCoordinates, startGame } from "./gameSlice";

export function Game() {
  const dispatch = useAppDispatch();
  const boardMap = useSelector((state: RootState) => state.game.map);
  const isReady = useSelector((state: RootState) => state.game.isReady);
  const message = useSelector((state: RootState) => state.game.message);
  const difficulty = useSelector((state: RootState) => state.game.difficulty);
  const isLoadingBoard = useSelector(
    (state: RootState) => state.game.isLoadingBoard
  );

  const onStart = useCallback(
    (levelDifficulty) => dispatch(startGame(levelDifficulty)),
    [dispatch]
  );

  const onBoardClick = useCallback(
    (coords) => dispatch(selectCoordinates(coords)),
    [dispatch]
  );

  return (
    <Stack
      spacing={8}
      width="100vw"
      height="100vh"
      bgcolor="#171923"
      color="whitesmoke"
      p="4rem"
    >
      <Stack width="100%" alignItems="center" justifyContent="center">
        <Typography component="h1" fontSize="2rem">
          Welcome to Minesweeper!
        </Typography>
        <LevelSelector onStart={onStart} isReady={isReady} />
        {isLoadingBoard ? (
          <Box width="100%">
            <LinearProgress color="secondary" />
          </Box>
        ) : (
          <Board
            boardMap={boardMap}
            onClick={onBoardClick}
            difficulty={difficulty}
          />
        )}
        {message !== Message.ok && <ResultMessage message={message} />}
      </Stack>
    </Stack>
  );
}
