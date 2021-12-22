import { PersistedStoreType } from "@/redux/persistor";
import { setHasInteracted } from "@/redux/stores/runtime";
import { useEffect, useState } from "react";

/**
 * Some browsers will limit features until the first user interaction has
 * occured.
 */
const useFirstInteraction = (store: PersistedStoreType) => {
  const [completed, setCompleted] = useState(false);

  const handleInteraction = () => {
    if (completed) return;
    setCompleted(true);
    store.dispatch(setHasInteracted())
  };

  useEffect(() => {
    document.addEventListener('click', handleInteraction);
    document.addEventListener('touchend', handleInteraction);
    return () => {
      document.removeEventListener('click', handleInteraction);
      document.addEventListener('touchend', handleInteraction);
    }
  }, []);
}

export default useFirstInteraction;
