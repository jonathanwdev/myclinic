import styled from 'styled-components/native';

export const Container = styled.View`
  flex: 1;
  margin-top: 50px;
  align-items: center;
`;
export const TextContainer = styled.View`
  flex: 1;
  margin-top: 40px;
  align-items: center;
`;
export const LoadText = styled.Text`
  font-weight: bold;

  color: ${props => (props.color ? props.color : '#fff')};
`;
