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
    margin-top: 50px;
    height: 100%;

    form {
      display: grid;
      grid-template-columns: repeat(2, 300px);
      grid-column-gap: 30px;
      grid-row-gap: 20px;
      justify-content: center;

      div {
        input {
          width: 300px;
          min-height: 45px;
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

      button {
        width: 100%;
        height: 45px;
        background: #36cb4f;
        color: #fff;
        border: 0;
        border-radius: 4px;
        transition: background 0.2s ease;

        &:hover {
          background: ${darken(0.06, '#36cb4f')};
        }
      }
    }
  }
`;
