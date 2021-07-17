import { useEffect } from "react";

/* Top-level keydown listener that works without focus, 
and is removed when React component is unmounted. */

export function useOnKeyDown(
  key: KeyboardEvent["key"],
  callback: () => void
): void {
  useEffect(() => {
    const listener = (event: KeyboardEvent) => {
      if (event.key === key) {
        callback();
      }
    };

    document.body.addEventListener("keydown", listener);
    return () => document.body.removeEventListener("keydown", listener);
  }, [key, callback]);
}
