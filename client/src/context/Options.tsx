import React, { createContext, useContext, useState } from "react"

interface OptionsProviderProps {
  children: React.ReactNode
}

interface OptionsCtxInterface {
  soundsOn: boolean
  animationsOn: boolean
  toggleSounds(): void
  toggleAnimations(): void
}

const OptionsContext = createContext<OptionsCtxInterface>({
  soundsOn: true,
  animationsOn: true,
  toggleSounds: () => null,
  toggleAnimations: () => null,
})

export const useOptions = () => useContext(OptionsContext)

export function OptionsProvider({ children }: OptionsProviderProps) {
  const [soundsOn, setSoundsOn] = useState(true)
  const [animationsOn, setAnimationsOn] = useState(true)

  const toggleSounds = () => setSoundsOn((soundsOn) => !soundsOn)
  const toggleAnimations = () =>
    setAnimationsOn((animationsOn) => !animationsOn)

  return (
    <OptionsContext.Provider
      value={{ soundsOn, animationsOn, toggleSounds, toggleAnimations }}
    >
      {children}
    </OptionsContext.Provider>
  )
}
