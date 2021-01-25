import React from "react";
import styled from "styled-components";

import { GamePlayer, GameWinner } from "@connect-game/shared";
import { Text } from "..";
import { fonts } from "../../config";

interface HeaderProps {
  currPlayer: GamePlayer;
  you: GamePlayer;
  winner?: GameWinner;
}

const StyledText = styled(Text)`
  margin-bottom: 90px;
`;

const StyledSpan = styled.span`
  color: ${(props) => props.color};
`;

const Header: React.FC<HeaderProps> = ({ currPlayer, you, winner }) => {
  const yourTurn = currPlayer.name === you.name;
  const youWon = winner && winner.name === you.name;
  let message: React.ReactNode;

  switch (winner) {
    // no player has won yet
    case undefined:
      message = (
        <>
          <StyledSpan color={currPlayer.color}>
            {yourTurn ? "Your" : currPlayer.name}
          </StyledSpan>
          {yourTurn ? " turn" : "'s turn"}
        </>
      );
      break;
    // game is a tie
    case null:
      message = <>Draw</>;
      break;
    // there is a winner
    default:
      message = (
        <>
          <StyledSpan color={winner.color}>
            {youWon ? "You" : winner.name}
          </StyledSpan>{" "}
          won!
        </>
      );
      break;
  }

  return <StyledText size={fonts.sizes.large}>{message}</StyledText>;
};

export default Header;
