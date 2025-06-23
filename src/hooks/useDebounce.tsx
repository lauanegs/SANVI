// hooks/useDebounce.js
import { useEffect } from 'react';

export function useDebounce(value: string, delay: number, onTimeOut: (text: string) => void) {

  useEffect(() => {
    const handler = setTimeout(() => {
      onTimeOut(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);
}