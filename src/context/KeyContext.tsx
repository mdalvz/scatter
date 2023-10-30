import React, { PropsWithChildren, createContext, useEffect, useState } from 'react';

export interface KeyContextData {
  key: string;
}

export interface KeyContextValue extends KeyContextData {
  setKey: (key: string) => void;
}

export const KeyContext = createContext<KeyContextValue | null>(null);

export function KeyContextProvider(props: PropsWithChildren<{}>) {
  const [ data, setData ] = useState<KeyContextData>({
    key: null,
  });

  const localStorageKey = 'scatter.key';

  function setKey(key: string) {
    setData((previous) => ({
      ...previous,
      key,
    }));
    localStorage.setItem(localStorageKey, key);
  }

  useEffect(() => {
    setKey(localStorage.getItem(localStorageKey) || '');
  }, []);

  const value: KeyContextValue = {
    ...data,
    setKey,
  };

  return (
    <KeyContext.Provider value={value}>
      {props.children}
    </KeyContext.Provider>
  );
}
