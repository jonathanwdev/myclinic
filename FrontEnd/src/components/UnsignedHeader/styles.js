import styled from 'styled-components';

export const Container = styled.div`
  width: 100%;
  height: 55px;
  background: transparent;
  padding: 0 50px;
`;

export const Content = styled.div`
  display: flex;
  justify-content: space-between;
  border-bottom: 1px solid #ccc;
  height: 55px;
  align-items: center;

  img {
    height: 40px;
  }

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
