import styled from 'styled-components';
import { darken } from 'polished';
import Bg from '~/assets/background.jpg';

export const Background = styled.div`
  background: url(${Bg}) no-repeat center center fixed;
  background-size: cover;
  -webkit-background-size: cover;
  -moz-background-size: cover;
  -o-background-size: cover;
  top: 0;
  left: 0;
  position: fixed;
  z-index: -1;
  width: 100vw;
  height: 100vh;
`;
export const Container = styled.main`
  padding: 0 50px;
  display: flex;
  justify-content: space-between;

  section {
    align-self: center;

    article {
      font-size: 4rem;
      color: #eae8e8;
    }
    a {
      display: block;
      width: 27rem;
      height: 5.4;
      background: #36cb4f;
      border-radius: 5px;
      color: #fff;
      font-size: 1.4rem;
      line-height: 5.4rem;
      text-align: center;
      margin-top: 20px;
      transition: background 0.2s ease;

      &:hover {
        background: ${darken(0.04, '#36cb4f')};
      }
    }
  }

  aside {
    img {
      height: 60rem;
    }
  }
`;
