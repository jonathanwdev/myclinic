import styled from 'styled-components';

export const Container = styled.div`
  width: 100%;
  height: 80vh;
  background: rgba(8, 38, 74, 0.74);
  border-radius: 4px;
  display: flex;

  section {
    width: 100%;
    height: 100%;
  }
`;

export const VerticalNavigation = styled.div`
  width: 19%;
  height: 100%;
  background: rgba(8, 38, 74, 0.74);
  border-radius: 4px 0 0 4px;
`;

export const Option = styled.li`
  height: 80px;
  background: #fff;

  & + li {
    margin-top: 20px;
  }
`;

export const ChangeButton = styled.button`
  height: 100%;
  width: 100%;
  border: 0;
  background: rgba(8, 38, 74, 1);
  text-transform: uppercase;
  transition: all 0.2s ease;
  color: ${props => (props.active ? '#36cb4f' : '#a1a1a1')};
  box-shadow: ${props =>
    props.active ? '1px 12px 19px -6px rgba(54, 203, 79, 1)' : ''};

  &:hover {
    color: #36cb4f;
    box-shadow: 1px 12px 19px -6px rgba(54, 203, 79, 1);
  }
`;
