import React from "react";

import { Page, Text, Input, Button } from "../components";
import { useTheme } from "../context";

interface NameProps {
  value: string;
  onChange(event: React.ChangeEvent<HTMLInputElement>): void;
  onSubmit(): void;
}

const Name: React.FC<NameProps> = ({ value, onChange, onSubmit }) => {
  const theme = useTheme();

  return (
    <Page>
      <Text size={theme.sizes.text.large} style={{ marginBottom: 60 }}>
        Enter your name
      </Text>
      <Input type="text" value={value} onChange={onChange} />
      <Button onClick={onSubmit} disabled={!value}>
        Continue
      </Button>
    </Page>
  );
};

export default Name;
