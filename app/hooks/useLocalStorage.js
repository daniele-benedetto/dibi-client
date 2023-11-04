import { useState, useEffect } from "react";

export const useLocalStorage = (key, initialValue, expirationInHours = 24) => {
  const [storedValue, setStoredValue] = useState(() => {
    if (typeof window === "undefined") {
      return initialValue;
    }
    try {
      const item = window.localStorage.getItem(key);
      if (!item) {
        return initialValue;
      }
      const parsedItem = JSON.parse(item);
      if (Date.now() - parsedItem.timestamp > expirationInHours * 60 * 60 * 1000) {
        window.localStorage.removeItem(key);
        return initialValue;
      }
      return parsedItem.value;
    } catch (error) {
      console.error(error);
      return initialValue;
    }
  });

  const setValue = (value) => {
    try {
      const valueToStore = value instanceof Function ? value(storedValue) : value;
      const item = {
        value: valueToStore,
        timestamp: Date.now(),
      };
      setStoredValue(valueToStore);
      if (typeof window !== "undefined") {
        window.localStorage.setItem(key, JSON.stringify(item));
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    const checkExpirationInterval = setInterval(() => {
      if (typeof window !== "undefined") {
        const item = window.localStorage.getItem(key);
        if (item) {
          const parsedItem = JSON.parse(item);
          if (Date.now() - parsedItem.timestamp > expirationInHours * 60 * 60 * 1000) {
            window.localStorage.removeItem(key);
            setStoredValue(initialValue);
          }
        }
      }
    }, 1000 * 60); 
    return () => clearInterval(checkExpirationInterval);
  }, [key, initialValue, expirationInHours]);

  return [storedValue, setValue];
};
