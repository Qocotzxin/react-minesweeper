import { Box, Typography } from "@mui/material";
import { FC } from "react";
import { FaBomb } from "react-icons/fa";
import { Piece } from "../../../enum";

export const UncoveredTile: FC = ({ children }) => {
  return (
    <Box
      data-testid="UncoveredTile"
      bgcolor="#c0c0c0"
      border="solid #808080"
      width="1.5rem"
      height="1.5rem"
      display="flex"
      justifyContent="center"
      alignItems="center"
      color="black"
      sx={{
        borderWidth: "0 1px 1px 0",
      }}
    >
      <Typography component="p" fontWeight="bold" fontSize="0.8rem">
        {children === Piece.bomb ? (
          <FaBomb color="crimson" data-testid="UncoveredTile-bomb-icon" />
        ) : (
          children
        )}
      </Typography>
    </Box>
  );
};
