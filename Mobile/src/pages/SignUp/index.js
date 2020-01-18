import React, { useRef, useState } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { Image, StatusBar } from 'react-native';

import Background from '~/components/Background';
import Logo from '~/assets/Logo.png';

import { signUpRequest } from '~/store/modules/auth/actions';

import {
  Container,
  Form,
  FormInput,
  SubmitButton,
  SignLink,
  SignLinkText,
} from './styles';

export default function SignUp({ navigation }) {
  const dispatch = useDispatch();
  const loading = useSelector(state => state.auth.loading);

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const emailRef = useRef();
  const passwordRef = useRef();
  const confirmPasswordRef = useRef();

  function handleSubmit() {
    dispatch(signUpRequest({ name, email, password, confirmPassword }));
  }

  return (
    <Background>
      <StatusBar
        barStyle="light-content"
        backgroundColor="rgba(35, 51, 197, 0.95)"
      />
      <Container>
        <Image source={Logo} />
        <Form>
          <FormInput
            icon="person"
            autoCorrect={false}
            autoCapitalize="none"
            placeholder="Seu nome completo"
            onSubmitEditing={() => emailRef.current.focus()}
            returnKeyType="next"
            value={name}
            onChangeText={setName}
          />
          <FormInput
            icon="email"
            keyboardType="email-address"
            autoCorrect={false}
            ref={emailRef}
            autoCapitalize="none"
            placeholder="Seu e-mail"
            onSubmitEditing={() => passwordRef.current.focus()}
            returnKeyType="next"
            value={email}
            onChangeText={setEmail}
          />
          <FormInput
            icon="lock"
            secureTextEntry
            placeholder="Sua senha secreta"
            onSubmitEditing={() => confirmPasswordRef.current.focus()}
            returnKeyType="next"
            ref={passwordRef}
            value={password}
            onChangeText={setPassword}
          />
          <FormInput
            icon="lock"
            secureTextEntry
            ref={confirmPasswordRef}
            returnKeyType="send"
            placeholder="Confirme sua senha secreta"
            onSubmitEditing={handleSubmit}
            value={confirmPassword}
            onChangeText={setConfirmPassword}
          />
          <SubmitButton loading={loading} onPress={handleSubmit}>
            Cadastrar
          </SubmitButton>
          <SignLink onPress={() => navigation.navigate('SignIn')}>
            <SignLinkText>Já tenho uma conta</SignLinkText>
          </SignLink>
        </Form>
      </Container>
    </Background>
  );
}

SignUp.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }).isRequired,
};
