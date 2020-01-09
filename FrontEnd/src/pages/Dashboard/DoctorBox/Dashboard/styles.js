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
  padding: 15px 20px;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  flex-direction: column;

  h1 {
    color: #fff;
    font-size: 2.8rem;
  }

  header {
    display: flex;
    align-items: center;
    margin-top: 15px;

    strong {
      font-size: 1.5rem;
      color: #f8f8f8;
    }
  }
  div {
    width: 100%;
    height: 65%;
    display: flex;
    justify-content: center;
    align-items: center;

    svg {
      animation: ${rotate} 2s linear infinite;
    }
  }

  ul {
    width: 100%;
    display: grid;
    margin-top: 20px;
    grid-template-columns: repeat(3, 1fr);
    grid-row-gap: 20%;
    justify-items: center;
  }
`;

export const Btn = styled.button`
  background: none;
  border: 0;
  margin: 0 15px;
  opacity: ${props => (props.disable ? 0.4 : 1)};
`;

export const Item = styled.li`
  display: flex;
  justify-content: space-between;
  background: rgba(26, 187, 182, 0.8);
  align-items: center;
  padding: 0 15px;
  border-radius: 5px;
  height: 54px;
  width: 60%;
  position: relative;
  opacity: ${props => (props.past ? 0.4 : 1)};

  p {
    color: #f8f8f8;
  }

  footer {
    display: flex;
    justify-content: space-between;
    width: 100%;
    margin-top: 4px;

    small {
      color: #e3dcdc;
    }
    button {
      background: none;
      border: none;
      display: ${props => (!props.cancelable ? 'none' : 'block')};
    }
  }

  img {
    width: 40px;
    height: 40px;
    border-radius: 50%;
  }
`;
