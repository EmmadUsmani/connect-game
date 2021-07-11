import React, { useState } from "react";
import { useHistory, useLocation } from "react-router-dom";

import { Modal } from "../components/layouts";
import { Button, Toggle } from "../components";
import { useOptions } from "../context";
import { useOnKeyDown } from "../hooks";

function getLeaveMessage(pathName: string): string | null {
  switch (pathName) {
    case "/create/name":
    case "/create/settings":
    case "/join/name":
    case "/join/code":
      return "Return Home";
    case "/room":
      return "Leave Room";
    case "/play":
      return "Leave Game";
    default:
      return null;
  }
}

const Menu: React.FC = () => {
  const { soundsOn, animationsOn, toggleSounds, toggleAnimations } =
    useOptions();
  const history = useHistory();
  const location = useLocation();

  const [showModal, setShowModal] = useState<boolean>(false);
  const toggleModal = () => setShowModal((showModal) => !showModal);
  useOnKeyDown("Escape", toggleModal);

  const handleLeave = (): void => {
    history.push("/");
    toggleModal();
  };

  const leaveMessage = getLeaveMessage(location.pathname);

  return showModal ? (
    <Modal>
      <Toggle value={soundsOn} label="Sounds" onClick={toggleSounds} />
      <Toggle
        value={animationsOn}
        label="Animations"
        onClick={toggleAnimations}
      />
      {leaveMessage && (
        <Button type="negative" onClick={handleLeave}>
          {leaveMessage}
        </Button>
      )}
      <Button onClick={toggleModal}>Close</Button>
    </Modal>
  ) : (
    <></>
  );
};

export default Menu;
