import { faArrowLeft } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

import { Clickable, Tooltip } from "components/wrapper"

interface BackIconProps {
  onClick(): void
}

export function BackIcon({ onClick }: BackIconProps) {
  return (
    <Tooltip id="back" label="Back to Lobby">
      <Clickable onClick={onClick}>
        <FontAwesomeIcon icon={faArrowLeft} size="2x" style={{ width: 32 }} />
      </Clickable>
    </Tooltip>
  )
}
