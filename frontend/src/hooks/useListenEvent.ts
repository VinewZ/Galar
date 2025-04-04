import { useEffect } from "react";

interface CustomEventDetail {
  message: string;
}

export function useListenToEvent(eventType: string, callback: (detail: CustomEventDetail) => void) {
  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      // Ensure that the event has the expected type
      if (event.data.type === eventType) {
        callback(event.data);  // Call the provided callback with the event data
      }
    };

    // Listen for global postMessages
    window.addEventListener("message", handleMessage);

    return () => {
      // Cleanup the listener when the component is unmounted
      window.removeEventListener("message", handleMessage);
    };
  }, [eventType, callback]);
}
