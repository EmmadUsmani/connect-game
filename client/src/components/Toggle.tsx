import React from "react";
import styled from "styled-components";

import { Button } from ".";

interface ToggleProps {
  label: string;
  value: boolean;
  onClick: () => void;
  trueText?: string;
  falseText?: string;
}

interface StyledDivProps {
  width: number;
}

const StyledSpan = styled.span`
  margin-right: 0.5ch;
`;

const StyledDiv = styled.div<StyledDivProps>`
  display: flex;
  justify-items: flex-start;
  width: ${(props) => props.width}ch;
`;

const Toggle: React.FC<ToggleProps> = ({
  label,
  value,
  onClick,
  trueText = "On",
  falseText = "Off",
}) => {
  return (
    <Button type="secondary" onClick={onClick}>
      <StyledSpan>{`${label}:`}</StyledSpan>
      <StyledDiv width={Math.min(trueText.length, falseText.length)}>
        {value ? trueText : falseText}
      </StyledDiv>
    </Button>
  );
};

export default Toggle;
