import { useHistory } from "react-router";

import { Text, Button } from "components";
import { Page } from "components/layouts";
import { useTheme } from "context";

export function Home() {
  const theme = useTheme();
  const history = useHistory();

  return (
    <Page>
      <Text size={theme.sizes.text.extraLarge} style={{ marginBottom: 60 }}>
        Connect
      </Text>
      <Button onClick={() => history.push("/create/name")}>Create Game</Button>
      <Button onClick={() => history.push("/join/name")}>Join Game</Button>
    </Page>
  );
}
