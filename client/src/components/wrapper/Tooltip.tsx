import ReactTooltip from "react-tooltip"

import { useTheme } from "context"

interface TooltipProps {
  children: React.ReactNode
  id: string
  label: string
  delay?: number
  float?: boolean
  offset?: { top?: number; right?: number; left?: number; bottom?: number }
  disabled?: boolean
}

export function Tooltip({
  children,
  id,
  label,
  delay,
  float,
  offset,
  disabled = false,
}: TooltipProps) {
  const theme = useTheme()

  return (
    <>
      <div data-tip data-for={id}>
        {children}
      </div>
      {!disabled && (
        <ReactTooltip
          arrowColor="rgba(0, 0, 0, 0)"
          backgroundColor={theme.colors.primary}
          delayShow={delay}
          effect={float ? "float" : "solid"}
          getContent={() => label}
          id={id}
          offset={offset ?? {}}
        />
      )}
    </>
  )
}
