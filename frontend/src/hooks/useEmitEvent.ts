import { useCallback } from 'react';

interface CustomEventDetail {
  message: string;
}

export function useEmitEvent() {
  const emitEvent = useCallback((eventType: string, detail: CustomEventDetail) => {
    // Send a message globally (to all iframes and the main window)
    window.postMessage({ type: eventType, ...detail }, "*");
  }, []);

  return emitEvent;
}
