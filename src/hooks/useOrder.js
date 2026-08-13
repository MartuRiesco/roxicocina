import { useEffect, useMemo, useState } from 'react';

const STORAGE_KEY = 'roxi-cocina-order';

function getInitialOrder() {
  try {
    const saved = window.localStorage.getItem(STORAGE_KEY);
    return saved ? JSON.parse(saved) : {};
  } catch {
    return {};
  }
}

export function useOrder() {
  const [quantities, setQuantities] = useState(getInitialOrder);

  useEffect(() => {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(quantities));
  }, [quantities]);

  const totalUnits = useMemo(
    () => Object.values(quantities).reduce((total, quantity) => total + quantity, 0),
    [quantities],
  );

  const add = (productId) => {
    setQuantities((current) => ({
      ...current,
      [productId]: (current[productId] ?? 0) + 1,
    }));
  };

  const decrement = (productId) => {
    setQuantities((current) => {
      const nextQuantity = (current[productId] ?? 0) - 1;
      const next = { ...current };

      if (nextQuantity <= 0) {
        delete next[productId];
      } else {
        next[productId] = nextQuantity;
      }

      return next;
    });
  };

  const remove = (productId) => {
    setQuantities((current) => {
      const next = { ...current };
      delete next[productId];
      return next;
    });
  };

  const clear = () => setQuantities({});

  return {
    quantities,
    totalUnits,
    add,
    decrement,
    remove,
    clear,
  };
}
