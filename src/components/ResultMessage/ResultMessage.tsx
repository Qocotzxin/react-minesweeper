import { Stack, Typography } from "@mui/material";
import { FC } from "react";
import { Message } from "../../enum";
import { FaSadCry } from "react-icons/fa";
import { GiPartyPopper } from "react-icons/gi";

interface ResultMessageProps {
  message: Message;
}

export const ResultMessage: FC<ResultMessageProps> = ({ message }) => {
  return (
    <Stack
      direction="row"
      justifyContent="center"
      alignItems="center"
      spacing={4}
      data-testid="ResultMessage"
    >
      <Typography component="p" fontSize="2rem">
        {message}
      </Typography>
      {message === Message.lose ? (
        <FaSadCry size="24" data-testid="ResultMessage-lose-icon" />
      ) : (
        <GiPartyPopper size="24" data-testid="ResultMessage-win-icon" />
      )}
    </Stack>
  );
};
