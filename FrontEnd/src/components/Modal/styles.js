import styled from 'styled-components';
import { lighten } from 'polished';

export const Container = styled.div`
  position: absolute;
  z-index: 1;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  background: rgba(0, 0, 0, 0.5);
  display: ${props => (props.display ? 'block' : 'none')};
`;
export const Content = styled.div`
  position: fixed;
  z-index: 2;
  width: 800px;
  height: 450px;
  top: calc(50% - 225px);
  left: calc(50% - 400px);
  background: ${props => (props.bg ? props.bg : 'none')};
  border-radius: ${props => (props.borderRadius ? props.borderRadius : 0)};

  header {
    display: flex;

    h1 {
      flex: 1;
      text-align: center;
      margin-right: -70px;
    }

    button {
      color: #cb3669;
      background: none;
      width: 70px;
      border: 0;
      font-size: 1.2rem;

      &:hover {
        color: ${lighten(0.07, '#cb3669')};
      }
    }
  }
`;
