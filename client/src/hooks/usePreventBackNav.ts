import { useEffect } from "react";
import { useHistory } from "react-router-dom";

const usePreventBackNav = (): void => {
  const history = useHistory();

  useEffect(() => {
    return history.listen(() => {
      if (history.action === "POP") history.replace("/");
    });
  }, [history]);
};

export default usePreventBackNav;
