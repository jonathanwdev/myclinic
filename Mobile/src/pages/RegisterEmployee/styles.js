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
  margin-top: 40px;
  align-self: stretch;
`;
export const TextInput = styled(Input)`
  margin-bottom: 20px;
`;
export const SubmitButton = styled(Button)`
  margin-bottom: 15px;
  align-self: stretch;
`;
