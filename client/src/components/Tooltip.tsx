import ReactTooltip from "react-tooltip"

import { useTheme } from "context"

interface TooltipProps {
  children: React.ReactNode
  id: string
  label: string
  delay?: number
  float?: boolean
  offset?: string
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
      <div
        data-tip
        data-arrow-color="rgba(0, 0, 0, 0)"
        data-background-color={theme.colors.primary}
        data-delay-show={delay}
        data-effect={float ? "float" : "solid"}
        data-for={id}
        data-offset={offset ?? ""}
      >
        {children}
      </div>
      {active && <ReactTooltip getContent={() => label} id={id} />}
    </>
  )
}
