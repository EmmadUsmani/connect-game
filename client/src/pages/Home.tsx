import React, { useEffect } from "react";

import { Text, Button, Page, Link } from "../components";
import { fonts } from "../config";
import { usePreventBackNav } from "../hooks";

interface HomeProps {
  onLoad(): void;
}

const Home: React.FC<HomeProps> = ({ onLoad }) => {
  useEffect(onLoad, [onLoad]);

  usePreventBackNav();

  return (
    <Page>
      <Text size={fonts.sizes.extraLarge} style={{ marginBottom: 60 }}>
        Connect
      </Text>
      <Link to="/create/name">
        <Button>Create Game</Button>
      </Link>
      <Link to="/join/name">
        <Button>Join Game</Button>
      </Link>
    </Page>
  );
};

export default Home;
