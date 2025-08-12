import { useEffect } from 'react';

export function useKey(key, callback) {
  useEffect(() => {
    // Function to handle the key press
    const handleKeyDown = (event) => {
      if (event.code.toLowerCase() === key.toLowerCase()) {
        callback();
      }
    };

    // Add the event listener
    document.addEventListener('keydown', handleKeyDown);

    // Cleanup: Remove the event listener when the component unmounts
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [callback, key]); // Dependency array includes onCloseMovie if it might change
}
