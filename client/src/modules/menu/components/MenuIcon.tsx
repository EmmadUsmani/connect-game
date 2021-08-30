import { faBars } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import ReactTooltip from "react-tooltip"
import styled from "styled-components"

import { Clickable } from "components/wrapper"
import { useTheme } from "context"

interface MenuIconProps {
  onClick(): void
}

const StyledDiv = styled.div`
  position: absolute;
  top: 20px;
  right: 20px;
`

export function MenuIcon({ onClick }: MenuIconProps) {
  const theme = useTheme()

  return (
    <>
      <StyledDiv data-tip data-for="menu">
        <Clickable onClick={onClick}>
          <FontAwesomeIcon icon={faBars} size="2x" />
        </Clickable>
      </StyledDiv>
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
