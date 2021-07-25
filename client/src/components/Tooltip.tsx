import ReactTooltip from "react-tooltip"

import { useTheme } from "context"

interface TooltipProps {
  children: React.ReactNode
  id: string
  label: string
  delay?: number
  float?: boolean
  offset?: { top?: number; right?: number; left?: number; bottom?: number }
  active?: boolean
}

export function Tooltip({
  children,
  id,
  label,
  delay,
  float,
  offset,
  active = true,
}: TooltipProps) {
  const theme = useTheme()

  return (
    <>
      <div data-tip data-for={id}>
        {children}
      </div>
      {active && (
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
