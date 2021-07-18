import { faBars } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import styled from "styled-components"

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
  return (
    <StyledIconDiv onClick={onClick}>
      <FontAwesomeIcon icon={faBars} size="2x" />
    </StyledIconDiv>
  )
}
