import { faBars } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import ReactTooltip from "react-tooltip"
import styled from "styled-components"

import { useTheme } from "context"

interface MenuIconProps {
  onClick(): void
}

const StyledIconDiv = styled.div`
  cursor: pointer;
  position: absolute;
  top: 20px;
  right: 20px;
`

export function MenuIcon({ onClick }: MenuIconProps) {
  const theme = useTheme()

  return (
    <>
      <StyledIconDiv data-tip data-for="menu" onClick={onClick}>
        <FontAwesomeIcon icon={faBars} size="2x" />
      </StyledIconDiv>
      <ReactTooltip
        arrowColor="rgba(0, 0, 0, 0)"
        backgroundColor={theme.colors.primary}
        effect="solid"
        getContent={() => "Escape"}
        id="menu"
        place="left"
      />
    </>
  )
}
