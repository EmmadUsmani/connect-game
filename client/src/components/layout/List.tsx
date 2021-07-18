import React from "react"

import { Spacer } from "."

interface ListProps {
  children: React.ReactNode
  spacing: number
}

export function List({ children, spacing }: ListProps) {
  return (
    <>
      {React.Children.map(children, (child, index) =>
        index !== React.Children.count(children) - 1 && child !== null ? (
          <>
            {child}
            <Spacer size={spacing} />
          </>
        ) : (
          child
        )
      )}
    </>
  )
}
