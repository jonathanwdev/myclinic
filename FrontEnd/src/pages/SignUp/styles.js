import styled from 'styled-components';
import { darken } from 'polished';

export const Container = styled.div`
  width: 100%;
  padding: 0 50px;
`;
export const ContentForm = styled.div`
  background: #fff;
  width: 400px;
  height: 500px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
  margin: 30px auto;

  form {
    display: flex;
    flex-direction: column;
    width: 85%;
    align-items: center;
    input {
      border: 0;
      padding: 0 15px;
      width: 100%;
      background: #08264a;
      height: 45px;
      color: #fff;
      border-radius: 4px;
      font-size: 1.2rem;
    }
    &::placeholder {
      color: rgba(255, 255, 255, 0.8);
    }
    input + input {
      margin-top: 15px;
    }

    button {
      width: 100%;
      border-radius: 4px;
      height: 45px;
      color: #fff;
      border: 0;
      background: #36cb4f;
      margin-top: 20px;
      transition: background 0.2s ease;

      &:hover {
        background: ${darken(0.04, '#36cb4f')};
      }
    }
    a {
      margin-top: 15px;
      color: rgba(0, 0, 0, 0.6);
      transition: color 0.2s ease;

      &:hover {
        color: rgba(0, 0, 0, 0.8);
      }
    }
    span {
      color: #f64c75;
      align-self: flex-start;
      margin: 5px 0;
    }
  }
`;
