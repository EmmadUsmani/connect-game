import { useEffect } from "react";
import { useHistory } from "react-router-dom";

const usePreventBackNav = (callback?: () => void): void => {
  const history = useHistory();

  useEffect(() => {
    return history.listen(() => {
      if (history.action === "POP") {
        if (callback) callback();
        history.replace("/");
      }
    });
  }, [callback, history]);
};

export default usePreventBackNav;
