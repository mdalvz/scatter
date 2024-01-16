import React, { useContext, useState } from 'react';
import { KeyContext } from '../context/KeyContext';
import styled, { css } from 'styled-components';
import Input from './Input';

const KeyFormHeader = styled.div<{ $isGood?: boolean; }>`
  margin-bottom: 5px;
  ${props => props.$isGood ?
    css`color: green;` :
    css`color: red;`
  };
`;

export default function KeyForm() {
  const keyContext = useContext(KeyContext);
  const [isShown, setShown] = useState<boolean>(false);
  
  return (
    <div>
      <KeyFormHeader $isGood={!!keyContext.key}>
        ChatGPT API Key
      </KeyFormHeader>
      <Input
        type={isShown ? 'text' : 'password'}
        onMouseEnter={() => setShown(true)}
        onMouseLeave={() => setShown(false)}
        value={keyContext.key}
        onChange={(event) => {
          keyContext.setKey(event.target.value);
        }}
      />
    </div>
  );
}
