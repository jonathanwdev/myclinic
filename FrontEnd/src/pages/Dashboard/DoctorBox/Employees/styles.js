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
      font-size: 1.1rem;
      transition: background 0.2s ease;
    }

    button:nth-child(1) {
      background: #cb3669;

      &:hover {
        background: ${darken(0.06, '#cb3669')};
      }
    }
  }
`;
