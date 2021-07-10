import React, { useState } from "react";

import { Modal } from "../components/layouts";
import { useOnKeyDown } from "../hooks";

const Menu: React.FC = () => {
  const [showModal, setShowModal] = useState<boolean>(false);
  useOnKeyDown("Escape", () => setShowModal((showModal) => !showModal));

  return showModal ? (
    <Modal>
      <div style={{ backgroundColor: "pink" }}>Hello</div>
    </Modal>
  ) : (
    <></>
  );
};

export default Menu;
