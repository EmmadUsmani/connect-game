import React, { useState } from "react";
import { useHistory } from "react-router-dom";

import { Modal } from "../components/layouts";
import { Button, Toggle } from "../components";
import { useOptions } from "../context";
import { useOnKeyDown } from "../hooks";

// TODO: change "leave game" text based on route

const Menu: React.FC = () => {
  const { soundsOn, animationsOn, toggleSounds, toggleAnimations } =
    useOptions();
  const history = useHistory();

  const [showModal, setShowModal] = useState<boolean>(false);
  const toggleModal = () => setShowModal((showModal) => !showModal);
  useOnKeyDown("Escape", toggleModal);

  const handleLeave = (): void => {
    history.push("/");
    toggleModal();
  };

  return showModal ? (
    <Modal>
      <Toggle value={soundsOn} label="Sounds" onClick={toggleSounds} />
      <Toggle
        value={animationsOn}
        label="Animations"
        onClick={toggleAnimations}
      />
      <Button type="negative" onClick={handleLeave}>
        Leave Game
      </Button>
      <Button onClick={toggleModal}>Close</Button>
    </Modal>
  ) : (
    <></>
  );
};

export default Menu;
