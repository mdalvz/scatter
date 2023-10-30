import React from 'react';
import styled from 'styled-components';
import KeyForm from './KeyForm';
import PromptForm from './PromptForm';

const DashboardBorder = styled.div`
  border-top: 1px dashed gray;
`;

const DashboardEntry = styled.div`
  display: flex;
  flex-direction: column;
`;

const DashboardContainer = styled.div`
  background-color: white;
  color: black;
  width: calc(100% - 80px);
  max-width: 400px;
  height: auto;
  padding: 20px;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

export default function Dashboard() {
  return (
    <DashboardContainer>
      <DashboardEntry>
        <KeyForm/>
      </DashboardEntry>
      <DashboardBorder/>
      <DashboardEntry>
        <PromptForm/>
      </DashboardEntry>
    </DashboardContainer>
  );
}
