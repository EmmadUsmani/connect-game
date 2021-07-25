import { useState } from "react"
import styled from "styled-components"

import { Input, Tooltip } from "components"

interface RoomCodeProps {
  code: string
}

interface StyledDivProps {
  clicked: boolean
}

const StyledDiv = styled.div<StyledDivProps>`
  input {
    cursor: ${(props) => (props.clicked ? "auto" : "pointer")};
  }
  input::selection {
    background-color: transparent;
  }
`

export function RoomCode({ code }: RoomCodeProps) {
  const [clicked, setClicked] = useState(false)
  const [active, setActive] = useState(true)
  const [timeoutID, setTimeoutID] = useState<NodeJS.Timeout>()

  const onClick = () => {
    void navigator.clipboard.writeText(code)
    setClicked(true)
    setTimeoutID(setTimeout(() => setActive(false), 1000))
  }

  const onMouseEnter = () => {
    if (timeoutID) {
      clearTimeout(timeoutID)
    }
    setClicked(false)
    setActive(true)
  }

  return (
    <Tooltip
      float
      active={active}
      id="code"
      label={clicked ? "Copied" : "Copy"}
      offset={{ top: -12 }}
    >
      <StyledDiv
        clicked={clicked}
        onClick={onClick}
        onMouseEnter={onMouseEnter}
      >
        <Input disabled value={code} />
      </StyledDiv>
    </Tooltip>
  )
}
