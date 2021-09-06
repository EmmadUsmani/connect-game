import { useHistory } from "react-router"

import { Text, Button } from "components"
import { Page, Spacer } from "components/layout"
import { useTheme } from "context"

export function Home() {
  const theme = useTheme()
  const history = useHistory()

  return (
    <Page>
      <Text size={theme.sizes.text.extraLarge}>Connect</Text>
      <Spacer size={60} />
      <Button onClick={() => history.push("/create/name")}>Create Game</Button>
      <Spacer size={20} />
      <Button onClick={() => history.push("/join/code")}>Join Game</Button>
    </Page>
  )
}
