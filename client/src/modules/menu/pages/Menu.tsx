import { useState } from "react"
import { useHistory, useLocation } from "react-router-dom"

import { Button, Toggle } from "components"
import { Modal, List } from "components/layout"
import { useOptions } from "context"
import { useOnKeyDown } from "hooks"

import { MenuIcon } from "../components"

function getLeaveMessage(pathName: string): string | null {
  switch (pathName) {
    case "/create/name":
    case "/create/settings":
    case "/join/name":
    case "/join/code":
      return "Return Home"
    case "/room":
      return "Leave Room"
    case "/play":
      return "Leave Game"
    default:
      return null
  }
}

export function Menu() {
  const { soundsOn, animationsOn, toggleSounds, toggleAnimations } =
    useOptions()
  const history = useHistory()
  const location = useLocation()

  const [showModal, setShowModal] = useState(false)
  const toggleModal = () => setShowModal((showModal) => !showModal)
  useOnKeyDown("Escape", toggleModal)

  const handleLeave = () => {
    history.push("/")
    toggleModal()
  }

  const leaveMessage = getLeaveMessage(location.pathname)

  return (
    <>
      <MenuIcon onClick={toggleModal} />
      {showModal && (
        <Modal onClickOutside={toggleModal}>
          <List spacing={20}>
            <Toggle label="Sounds" value={soundsOn} onClick={toggleSounds} />
            <Toggle
              label="Animations"
              value={animationsOn}
              onClick={toggleAnimations}
            />
            {leaveMessage && (
              <Button type="negative" onClick={handleLeave}>
                {leaveMessage}
              </Button>
            )}
            <Button onClick={toggleModal}>Close</Button>
          </List>
        </Modal>
      )}
    </>
  )
}
