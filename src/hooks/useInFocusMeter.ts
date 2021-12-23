import { PersistedStoreType } from "@/redux/persistor";
import { setInFocusSeconds } from "@/redux/stores/runtime";
import { useEffect, useState } from "react";

/**
 * This will mesaure how long the webpage has been in focus and report it to
 * the redux store.
 */
const useInFocusMeter = (store: PersistedStoreType) => {
  const [isInFocus, setIsInFocus] = useState(false);
  const [elapsed, setElapsed] = useState(0);

  const handleFocus = () => setIsInFocus(true);
  const handleBlur = () => setIsInFocus(false);

  useEffect(() => {
    document.addEventListener('focus', handleFocus);
    document.addEventListener('blur', handleBlur);
    return () => {
      document.removeEventListener('focus', handleFocus);
      document.addEventListener('blur', handleBlur);
    }
  }, []);

  useEffect(() => {
    if (!isInFocus) { return; }

    const interval = setInterval(() => {
      store.dispatch(setInFocusSeconds(elapsed + 1))
      setElapsed(elapsed + 1);
    }, 1000);
    return () => clearInterval(interval);
  }, [isInFocus, elapsed]);
}

export default useInFocusMeter;
