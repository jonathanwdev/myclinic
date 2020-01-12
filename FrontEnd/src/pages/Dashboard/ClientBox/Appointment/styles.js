import styled from 'styled-components';
import { darken } from 'polished';

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
  section {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    justify-items: center;
    grid-column-gap: 50px;
    margin-top: 20px;
  }
`;
export const EmployeeCard = styled.div`
  width: 100%;
  height: 140px;
  background: #fff;
  display: flex;
  justify-content: space-around;
  flex-direction: column;
  padding: 0 15px;
  border-radius: 5px;
  transition: transform 0.2s ease;

  &:hover {
    transform: translateY(-3px);
  }

  header {
    display: flex;
    justify-content: space-between;
    background: #d4dfdf;
    height: 50%;
    border-radius: 5px;
    align-items: center;
    padding: 0 5px;

    div {
      display: flex;
      flex-direction: column;
      justify-content: space-around;
      height: 100%;

      strong {
        color: #08264a;
        font-size: 1.3rem;
      }
      p {
        text-transform: uppercase;
        font-size: 1.1rem;
      }
    }
    img {
      width: 50px;
      height: 50px;
      border-radius: 50%;
    }
  }

  footer {
    display: flex;

    button {
      width: 100%;
      height: 30px;
      border: 0;
      background: none;
      color: #fff;
      border-radius: 4px;
      font-size: 1.2rem;
      transition: background 0.2s ease;
    }

    button:nth-child(1) {
      background: #36cb4f;

      &:hover {
        background: ${darken(0.06, '#36cb4f')};
      }
    }
  }
`;

export const ModalContent = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;

  header {
    display: flex;
    margin-top: 20px;
    align-items: center;

    strong {
      color: #fff;
    }
  }
`;

export const Btn = styled.button`
  opacity: ${props => (props.disabled ? 0.4 : 1)};
`;

export const ModalBody = styled.div`
  width: 100%;
  height: 100%;
  margin-top: 20px;

  ul {
    width: 100%;
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    justify-items: center;
    grid-column-gap: 30px;
    grid-row-gap: 30px;
  }
`;

export const AvailableTime = styled.li`
  display: flex;
  width: 80%;
  height: 70px;
  padding: 5px 10px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-radius: 10px;
  transition: 0.2s ease;
  background: ${props => (props.enabled ? '#1abbb6' : '#CB3669')};
  opacity: ${props => (props.enabled ? 1 : 0.4)};

  &:hover {
    transform: ${props => (props.enabled ? 'translateY(-3px)' : '0')};
  }

  div {
    strong {
      color: #f8f8f8;
    }
    p {
      color: rgba(255, 255, 255, 0.7);
    }
  }
  button {
    background: #36cb4f;
    color: #f8f8f8;
    border: 0;
    font-size: 1.1rem;
    border-radius: 10px;
    width: 70px;
    height: 34px;
    transition: 0.2s ease;
    display:${props => (props.enabled ? 'block' : 'none')}

    &:hover {
      background: ${darken(0.04, '#36cb4f')};
    }
  }
`;
