import React from "react";

import { Text, Button, Page, Link } from "../components";
import { fonts } from "../config";

const Home: React.FC = () => {
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
