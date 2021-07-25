import ReactTooltip from "react-tooltip"

import { useTheme } from "context"

interface TooltipProps {
  children: React.ReactNode
  id: string
  label: string
  active?: boolean
}

export function Tooltip({ children, id, label, active = true }: TooltipProps) {
  const theme = useTheme()

  return (
    <>
      <div
        data-tip
        data-arrow-color="rgba(0, 0, 0, 0)"
        data-background-color={theme.colors.primary}
        data-for={id}
        data-offset="{'top': -12}"
      >
        {children}
      </div>
      {active && <ReactTooltip getContent={() => label} id={id} />}
    </>
  )
}
