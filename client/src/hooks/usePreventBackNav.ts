import { useEffect } from "react";
import { useHistory } from "react-router-dom";

export default function usePreventBackNav(callback?: () => void): void {
  const history = useHistory();

  useEffect(() => {
    return history.listen(() => {
      if (history.action === "POP") {
        if (callback) callback();
        history.replace("/");
      }
    });
  }, [callback, history]);
}
