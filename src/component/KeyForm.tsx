import React, { useContext } from 'react';
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
  
  return (
    <div>
      <KeyFormHeader $isGood={!!keyContext.key}>
        ChatGPT API Key
      </KeyFormHeader>
      <Input
        type='text'
        value={keyContext.key}
        onChange={(event) => {
          keyContext.setKey(event.target.value);
        }}
      />
    </div>
  );
}
