import React from "react";

import { Page, Text, Input, Button } from "../components";
import { fonts } from "../config";

interface CodeProps {
  value: string;
  onChange(event: React.ChangeEvent<HTMLInputElement>): void;
  onSubmit(): void;
}

const Code: React.FC<CodeProps> = ({ value, onChange, onSubmit }) => {
  return (
    <Page>
      <Text size={fonts.sizes.large} style={{ marginBottom: 60 }}>
        Enter room code
      </Text>
      <Input type="text" value={value} onChange={onChange} />
      <Button onClick={onSubmit} disabled={!value}>
        Continue
      </Button>
    </Page>
  );
};

export default Code;

// TODO: submit on enter key press (using form?)
// TODO: refactor Name & Code into single reusable component?
