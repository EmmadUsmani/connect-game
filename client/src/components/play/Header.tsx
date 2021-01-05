import React from "react";
import styled from "styled-components";

import { Text } from "../";
import { GamePlayer } from "../../models";
import { fonts } from "../../config";

interface HeaderProps {
  currPlayer: GamePlayer;
  winner?: GamePlayer;
}

const StyledText = styled(Text)`
  margin: 90px 0px;
`;

const StyledSpan = styled.span`
  color: ${(props) => props.color};
`;

const Header: React.FC<HeaderProps> = ({ currPlayer, winner }) => {
  return (
    <StyledText size={fonts.sizes.large}>
      {winner ? (
        <>
          <StyledSpan color={winner.color}>{winner.name}</StyledSpan> won!
        </>
      ) : (
        <>
          <StyledSpan color={currPlayer.color}>{currPlayer.name}</StyledSpan>'s
          turn
        </>
      )}
    </StyledText>
  );
};

export default Header;
