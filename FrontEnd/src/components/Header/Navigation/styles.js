import styled from 'styled-components';

export const Container = styled.div`
  nav {
    display: flex;

    ul {
      display: flex;

      li {
        margin: 0 30px;
        align-self: center;

        a {
          color: #fff;
          transition: all 0.2s ease;
          font-size: 1.2rem;

          &:hover {
            color: #36cb4f;
          }
        }
      }
    }
    svg {
      cursor: pointer;
      margin-left: 10px;
    }
  }
`;
