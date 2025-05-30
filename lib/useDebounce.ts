/**
 * Debounce function for searching new locations
 */

import { useEffect, useState } from "react";

export function useDebounce<T>(text: T, delay = 500): T {
  const [debouncedText, setDebouncedText] = useState(text);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedText(text);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [text, delay]);
  return debouncedText;
}
