import React from "react";

import { Text, Input, Button } from "../components";
import { Page } from "../components/layouts";
import { useTheme } from "../context";
import { useOnKeyDown } from "../hooks";

interface CodeProps {
  value: string;
  onChange(event: React.ChangeEvent<HTMLInputElement>): void;
  onSubmit(): void;
}

const Code: React.FC<CodeProps> = ({ value, onChange, onSubmit }) => {
  const theme = useTheme();
  useOnKeyDown("Enter", onSubmit);

  return (
    <Page>
      <Text size={theme.sizes.text.large} style={{ marginBottom: 60 }}>
        Enter room code
      </Text>
      <Input type="text" value={value} onChange={onChange} autoFocus={true} />
      <Button onClick={onSubmit} disabled={!value}>
        Continue
      </Button>
    </Page>
  );
};

export default Code;
