import {
  Button,
  CircularProgress,
  Rating,
  Stack,
  Typography,
} from "@mui/material";
import { FC, memo, SyntheticEvent, useState } from "react";
import { FaBomb } from "react-icons/fa";

interface LevelSelectorProps {
  onStart: (difficulty: number | null) => void;
  isReady: boolean;
}

export const LevelSelector: FC<LevelSelectorProps> = memo(
  ({ onStart, isReady }) => {
    const [difficulty, setDifficulty] = useState<number | null>(1);

    /**
     * Updates selected difficulty based on user selection.
     */
    const handleDifficultyChange = (
      event: SyntheticEvent<Element, Event>,
      selectedDifficulty: number | null
    ) => {
      setDifficulty(selectedDifficulty);
    };

    return (
      <Stack
        spacing={4}
        width="100%"
        justifyContent="center"
        alignItems="center"
        my="2rem"
      >
        <Stack justifyContent="center" alignItems="center">
          <Typography component="legend" mb="1rem">
            Difficulty
          </Typography>
          <Rating
            disabled={!isReady}
            name="difficulty"
            value={difficulty}
            max={4}
            icon={<FaBomb color="crimson" />}
            emptyIcon={<FaBomb color="white" />}
            onChange={handleDifficultyChange}
            size="large"
          />
        </Stack>
        {isReady ? (
          <Button
            variant="outlined"
            size="large"
            color="secondary"
            onClick={() => onStart(difficulty)}
            sx={{
              color: "whitesmoke",
              fontWeight: "bold",
              width: "max-content",
            }}
          >
            Start
          </Button>
        ) : (
          <CircularProgress
            color="secondary"
            data-testid="LevelSelector-spinner"
          />
        )}
      </Stack>
    );
  }
);
