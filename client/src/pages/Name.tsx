import React from "react";

import { Page, Text, Input, Button, Link } from "../components";
import { fonts } from "../config";

const Name: React.FC = () => {
  return (
    <Page>
      <Text size={fonts.sizes.large} style={{ marginBottom: 60 }}>
        Enter your name
      </Text>
      <Input type="text" />
      <Link to="/create/settings">
        <Button>Continue</Button>
      </Link>
    </Page>
  );
};

export default Name;
