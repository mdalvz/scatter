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

export default function App() {
  const [isOpen, setOpen] = useState<boolean>(false);

  useEventListener('keydown', (event: KeyboardEvent) => {
    if (event.key === 'Insert') {
      setOpen((previous) => !previous);
    }
  });

  return (
    <AppContainer $isOpen={isOpen}>
      <KeyContextProvider>
        <Dashboard/>
      </KeyContextProvider>
    </AppContainer>
  );
}
