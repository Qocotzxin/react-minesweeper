import { Alert, Box, LinearProgress, Stack, Typography } from "@mui/material";
import React, { useCallback, useState } from "react";
import { useSelector } from "react-redux";
import { useAppDispatch } from "../../app/hooks";
import { RootState } from "../../app/store";
import { Board, LevelSelector, ResultMessage } from "../../components";
import { Message } from "../../enum";
import { selectCoordinates, startGame } from "./gameSlice";

export function Game() {
  const [showInfo, setShowInfo] = useState(false);
  const dispatch = useAppDispatch();
  const boardMap = useSelector((state: RootState) => state.game.map);
  const isReady = useSelector((state: RootState) => state.game.isReady);
  const message = useSelector((state: RootState) => state.game.message);
  const difficulty = useSelector((state: RootState) => state.game.difficulty);
  const isLoadingBoard = useSelector(
    (state: RootState) => state.game.isLoadingBoard
  );

  /**
   * Triggers startGame action in order to start a new game with specified dofficulty.
   */
  const onStart = useCallback(
    (levelDifficulty) => {
      dispatch(startGame(levelDifficulty));
      setShowInfo(true);
    },
    [dispatch]
  );

  /**
   * Triggers selectCoordinates action with specified coordinates.
   */
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
        <Typography component="h1" fontSize="2rem" textAlign="center">
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
            message={message}
          />
        )}
        {showInfo && !isLoadingBoard && message === Message.ok && (
          <Alert severity="info" onClose={() => setShowInfo(false)}>
            You can right click a tile to add a flag (on mobile press it).
          </Alert>
        )}
        {message !== Message.ok && <ResultMessage message={message} />}
      </Stack>
    </Stack>
  );
}
