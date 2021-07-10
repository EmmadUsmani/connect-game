import React from "react";

import { Text, Input, Button } from "../components";
import { Page } from "../components/layouts";
import { useTheme } from "../context";
import { useOnKeyDown } from "../hooks";

interface NameProps {
  value: string;
  onChange(event: React.ChangeEvent<HTMLInputElement>): void;
  onSubmit(): void;
}

const Name: React.FC<NameProps> = ({ value, onChange, onSubmit }) => {
  const theme = useTheme();
  useOnKeyDown("Enter", onSubmit);

  return (
    <Page>
      <Text size={theme.sizes.text.large} style={{ marginBottom: 60 }}>
        Enter your name
      </Text>
      <Input type="text" value={value} onChange={onChange} autoFocus={true} />
      <Button onClick={onSubmit} disabled={!value}>
        Continue
      </Button>
    </Page>
  );
};

export default Name;
