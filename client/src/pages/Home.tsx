import React, { useEffect } from "react";

import { Text, Button, Page, Link } from "../components";
import { fonts } from "../config";

interface HomeProps {
  onLoad(): void;
}

const Home: React.FC<HomeProps> = ({ onLoad }) => {
  useEffect(onLoad, [onLoad]);

  return (
    <Page>
      <Text size={fonts.sizes.extraLarge} style={{ marginBottom: 60 }}>
        Connect
      </Text>
      <Link to="/create/name">
        <Button>Create Game</Button>
      </Link>
      <Button>Join Game</Button>
    </Page>
  );
};

export default Home;
