import styled, { keyframes } from 'styled-components';

const rotate = keyframes`
  from{
    transform:rotate(0deg);
  }
  to {
    transform:rotate(360deg);

  }
`;
export const Container = styled.div`
  width: 100%;
  height: 65%;
  display: flex;
  justify-content: center;
  align-items: center;

  svg {
    animation: ${rotate} 2s linear infinite;
  }
`;
