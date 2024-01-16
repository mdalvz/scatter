import React, { useState } from 'react';
import useEventListener from '@use-it/event-listener';
import styled, { css } from 'styled-components';
import Dashboard from './Dashboard';
import { KeyContextProvider } from '../context/KeyContext';

const AppContainer = styled.div<{ $isOpen?: boolean; }>`
  flex: 1;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.6);
  pointer-events: initial;
  ${props => props.$isOpen ?
    css`display: flex;` :
    css`display: none;`
  };
`;

const OpenContainer = styled.div`
  position: fixed;
  right: 100px;
  top: 5px;
  z-index: 999999;
  flex-direction: column;
  pointer-events: initial;
  display: flex;
`;

export default function App() {
  const [isOpen, setOpen] = useState<boolean>(false);

  const toggle = () => {
    setOpen((previous) => !previous);
  }

  useEventListener('keydown', (event: KeyboardEvent) => {
    if (event.key === 'Insert') {
      toggle();
    }
  });

  return (
    <>
      <OpenContainer>
        <button onClick={toggle}>
          {isOpen ? 'Close' : 'Open'}
        </button>
      </OpenContainer>
      <AppContainer $isOpen={isOpen}>
        <KeyContextProvider>
          <Dashboard/>
        </KeyContextProvider>
      </AppContainer>
    </>
  );
}
