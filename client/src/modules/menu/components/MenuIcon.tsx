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
      <StyledIconDiv
        data-arrow-color="rgba(0, 0, 0, 0)"
        data-background-color={theme.colors.primary}
        data-effect="solid"
        data-for="menu"
        data-place="left"
        data-tip="Escape"
        onClick={onClick}
      >
        <FontAwesomeIcon icon={faBars} size="2x" />
      </StyledIconDiv>
      <ReactTooltip id="menu" />
    </>
  )
}
