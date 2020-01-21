import { Platform } from 'react-native';
import styled from 'styled-components/native';
import Button from '~/components/Button';
import Input from '~/components/Input';

export const Container = styled.KeyboardAvoidingView.attrs({
  enabled: Platform.OS === 'ios',
  behavior: 'padding',
})`
  flex: 1;
  padding: 0 20px;
  justify-content: space-around;
  align-items: center;
`;

export const Form = styled.ScrollView.attrs({
  showsVerticalScrollIndicator: false,
})`
  align-self: stretch;
`;

export const TextInput = styled(Input)`
  margin-bottom: 20px;
`;

export const SubmitButton = styled(Button)`
  margin-bottom: 15px;
  align-self: stretch;
`;

export const Separator = styled.View`
  flex: 1;
  height: 2px;
  background: #fff;
  margin-bottom: 15px;
`;
export const Title = styled.Text`
  margin: 15px 0;
  font-size: 18px;
  color: #fff;
`;

export const LogOutButton = styled(Button)`
  margin-bottom: 15px;
  background: #cb3669;
  align-self: stretch;
`;
