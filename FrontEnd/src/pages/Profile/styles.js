import styled from 'styled-components';
import { darken } from 'polished';

export const Container = styled.main`
  width: 100%;
  height: 100%;
  margin-top: 20px;

  h1 {
    text-align: center;
    color: #f8f8f8;
  }

  section {
    display: flex;
    width: 100%;
    height: 100%;
    align-items: center;
    flex-direction: column;
    margin-top: 20px;

    form {
      width: 580px;
      display: flex;
      flex-direction: column;
      align-items: center;

      hr {
        width: 100%;
      }

      footer {
        display: flex;
        width: 100%;
        justify-content: space-between;

        button {
          width: 100%;
          height: 30px;
          height: 40px;
          font-size: 1.2rem;
          font-weight: bold;
          border: 0;
          background: none;
          color: #fff;
          width: 280px;
          border-radius: 4px;
          transition: background 0.2s ease;
        }

        button:nth-child(1) {
          background: #36cb4f;

          &:hover {
            background: ${darken(0.06, '#36cb4f')};
          }
        }

        button:nth-child(2) {
          background: #cb3669;

          &:hover {
            background: ${darken(0.06, '#cb3669')};
          }
        }
      }
    }
  }
`;
export const FormGrid = styled.div`
  display: grid;
  justify-items: center;
  grid-template-columns: repeat(2, auto);
  grid-column-gap: 20px;
  grid-row-gap: 20px;
  margin: 20px 0;

  div {
    input {
      width: 280px;
      height: 40px;
      border-radius: 4px;
      background: #08264a;
      padding: 0 15px;
      color: #fff;
      border: 0;

      &::placeholder {
        color: rgba(255, 255, 255, 0.6);
      }
    }
    span {
      color: #f64c75;
      align-self: flex-start;
    }
  }
`;
