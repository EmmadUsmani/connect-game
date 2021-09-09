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

/* Style taken from MDN Web Docs
https://developer.mozilla.org/en-US/docs/Web/HTML/Element/kbd */

const StyledKbd = styled.kbd`
  background-color: #eee;
  border-radius: 3px;
  border: 1px solid #b4b4b4;
  box-shadow: 0 1px 1px rgba(0, 0, 0, 0.2),
    0 2px 0 0 rgba(255, 255, 255, 0.7) inset;
  color: #333;
  display: inline-block;
  font-size: 0.85em;
  font-weight: 700;
  line-height: 1;
  padding: 2px 4px;
  white-space: nowrap;
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
        getContent={() => <StyledKbd>Esc</StyledKbd>}
        id="menu"
        place="left"
      />
    </>
  )
}
