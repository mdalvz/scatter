import React, { useState, useContext } from 'react';
import { KeyContext } from '../context/KeyContext';
import styled, { css } from 'styled-components';
import useEventListener from '@use-it/event-listener';
import useInterval from '@use-it/interval';
import { getRequirements } from '../helper/getRequirements';
import { promptAndAnswer } from '../helper/promptAndAnswer';

const StatusHeaderContainer = styled.button`
  width: 100%;
`;

const StatusHeader = styled.div<{$color?: string;}>`
  text-align: center;
  font-size: 3rem;
  ${props => css`
    color: ${props.$color || 'green'};
  `};
`;

export default function PromptForm() {
  const keyContext = useContext(KeyContext);
  const [ status, setStatus ] = useState<string>('Ready');
  const [ statusColor, setStatusColor ] = useState<string>('green');
  const [ loading, setLoading ] = useState<boolean>(false);
  const [ letter, setLetter ] = useState<string | null>(null);
  const [ questions, setQuestions ] = useState<string[]>([]);

  const onStart = async () => {
    if (!loading) {
      setLoading(true);
      setStatus('Loading');
      setStatusColor('orange');
      try {
        await promptAndAnswer(keyContext.key);
        setStatus('Succeeded');
        setStatusColor('green');
      } catch (error) {
        setStatus('Failed');
        setStatusColor('red');
      }finally {
        setLoading(false);
      }
    }
  };

  useEventListener('keydown', async (event: KeyboardEvent) => {
    if (event.key === 'Delete') {
      await onStart();
    }
  });

  useInterval(() => {
    const requirements = getRequirements();
    setLetter(requirements?.letter);
    setQuestions(requirements?.questions.map((entry) => entry.question) || []);
  }, 100);

  return (
    <div>
      <StatusHeaderContainer onClick={onStart}>
        <StatusHeader $color={statusColor}>
          {status}
        </StatusHeader>
      </StatusHeaderContainer>
      <div>
        Letter: {letter || 'None'}
      </div>
      <div>
        Questions:
        <ol>
          {questions.map((question, index) => (
            <li key={index}>
              {question}
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
}
