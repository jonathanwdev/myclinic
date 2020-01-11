import styled from 'styled-components';
import { darken } from 'polished';

export const Container = styled.div`
  aside {
    display: flex;
    height: 100%;
    align-items: center;
  }
`;

export const Menu = styled.div`
  display: flex;
  height: 100%;
  align-items: center;

  div {
    margin: 0 0 0 15px;
    border-left: 1px solid #ccc;
    padding-left: 15px;
    display: flex;
    flex-direction: column;

    strong {
      color: #f8f8f8;
    }
    a {
      color: #ccc;
      font-size: 1rem;
      transition: color 0.2s ease;
      margin-top: 2px;

      &:hover {
        color: #36cb4f;
      }
    }
  }

  img {
    width: 50px;
    height: 50px;
    border-radius: 50%;
    margin: 0 17px 0 13px;
  }

  button {
    background: #cb3669;
    color: #fff;
    border: 0;
    width: 60px;
    height: 30px;
    border-radius: 4px;
    transition: background 0.2s ease;

    &:hover {
      background: ${darken(0.04, '#cb3669')};
    }
  }
`;
