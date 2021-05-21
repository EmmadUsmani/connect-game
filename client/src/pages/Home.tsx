import React, { useEffect } from "react";

import { Text, Button, Page, Link } from "../components";
import { usePreventBackNav } from "../hooks";
import { useTheme } from "../context";

interface HomeProps {
  onLoad(): void;
}

const Home: React.FC<HomeProps> = ({ onLoad }) => {
  useEffect(onLoad, [onLoad]);

  usePreventBackNav();

  const theme = useTheme();

  return (
    <Page>
      <Text size={theme.sizes.text.extraLarge} style={{ marginBottom: 60 }}>
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
