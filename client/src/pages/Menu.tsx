import React, { useState } from "react";

import { Modal } from "../components/layouts";
import { Button, Toggle } from "../components";
import { useOptions } from "../context";
import { useOnKeyDown } from "../hooks";

const Menu: React.FC = () => {
  const { soundsOn, animationsOn, toggleSounds, toggleAnimations } =
    useOptions();

  const [showModal, setShowModal] = useState<boolean>(false);
  useOnKeyDown("Escape", () => setShowModal((showModal) => !showModal));

  return showModal ? (
    <Modal>
      <Toggle value={soundsOn} label="Sounds" onClick={toggleSounds} />
      <Toggle
        value={animationsOn}
        label="Animations"
        onClick={toggleAnimations}
      />
      <Button type="negative">Leave Game</Button>
      <Button>Close</Button>
    </Modal>
  ) : (
    <></>
  );
};

export default Menu;
