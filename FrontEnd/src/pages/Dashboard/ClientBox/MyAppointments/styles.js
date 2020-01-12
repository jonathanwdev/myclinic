import styled from 'styled-components';
import { darken } from 'polished';

export const Container = styled.div`
  padding: 15px 20px;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: space-between;

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

  ul {
    margin-top: 20px;
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-row-gap: 20px;
    grid-column-gap: 30px;
    justify-self: center;
    width: 100%;
    height: 100%;
  }
  footer {
    width: 60%;
    display: flex;
    justify-content: space-around;
    height: 80px;
    margin-top: 15px;
    align-items: center;
  }
`;
export const Btn = styled.button`
  background: none;
  border: 0;
  margin: 0 15px;
`;

export const Item = styled.li`
  background: #fff;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 10px;
  height: 150px;
  border-radius: 10px;
  opacity: ${props => (props.disabled ? 0.4 : 1)};
`;
export const CancelationButton = styled.button`
  opacity: ${props => (props.disabled ? 0.4 : 1)};
  background: #cb3669;
  border-radius: 5px;
  border: 0;
  height: 35px;
  color: #fff;
  transition: 0.2s ease;

  &:hover {
    background: ${props =>
      props.disabled ? 'cb3669' : darken(0.04, '#cb3669')};
  }
`;

export const Data = styled.div`
  display: flex;
  justify-content: space-between;
  background: #d4dfdf;
  align-items: center;
  height: 60%;
  border-radius: 10px;
  padding: 5px 10px;

  div {
    strong {
      color: #08264a;
      font-size: 1.2rem;
      margin-top: 5px;
    }
    p {
      color: rgba(0, 0, 0, 0.9);
      font-size: 1.1rem;
      margin-top: 4px;
      text-transform: uppercase;
    }
    small {
      color: rgba(0, 0, 0, 0.6);
      font-size: 1rem;
      margin-top: 6px;
    }
  }
  img {
    border-radius: 50%;
    width: 50px;
    min-width: 50px;
    min-height: 50px;
    height: 50px;
  }
`;

export const ChangePage = styled.button`
  color: #fff;
  background: none;
  border: 0;
  opacity: ${props => (props.disabled ? 0.3 : 1)};
  transition: 0.2s ease;

  &:hover {
    color: ${props => (props.disabled ? '#fff' : '#36cb4f')};
  }
`;
