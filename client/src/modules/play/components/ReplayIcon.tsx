import { faUndoAlt } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

import { Clickable, Tooltip } from "components/wrapper"

interface ReplayIconProps {
  onClick(): void
}

export function ReplayIcon({ onClick }: ReplayIconProps) {
  return (
    <Tooltip id="replay" label="Play Again">
      <Clickable onClick={onClick}>
        <FontAwesomeIcon icon={faUndoAlt} size="2x" style={{ width: 32 }} />
      </Clickable>
    </Tooltip>
  )
}
