import React, { useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Alert, StatusBar } from 'react-native';

import { updateProfileRequest } from '~/store/modules/user/actions';
import { signOut } from '~/store/modules/auth/actions';

import Background from '~/components/Background';
import HeaderLogo from '~/components/HeaderLogo';

import {
  Container,
  Form,
  TextInput,
  SubmitButton,
  Separator,
  Title,
  LogOutButton,
} from './styles';

export default function Profile() {
  const dispatch = useDispatch();
  const loading = useSelector(state => state.user.loading);
  const profile = useSelector(state => state.user.profile);

  const [name, setName] = useState(profile.name);
  const [email, setEmail] = useState(profile.email);
  const [profession, setProfession] = useState(
    profile.doctor ? profile.profession : null
  );
  const [address, setAddress] = useState(
    profile.address ? profile.address : null
  );
  const [oldPassword, setOldPassword] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const emailRef = useRef();
  const professionRef = useRef();
  const addressRef = useRef();
  const oldPasswordRef = useRef();
  const passwordRef = useRef();
  const confirmPasswordRef = useRef();

  function handleSubmit() {
    try {
      dispatch(
        updateProfileRequest({
          name,
          email,
          profession,
          address,
          oldPassword,
          password,
          confirmPassword,
        })
      );
      Alert.alert('Sucesso', ' Funcionario cadastrado com sucesso !');
    } catch (err) {
      Alert.alert('Erro', err.response.data.error);
    }
  }

  function handleLogOut() {
    dispatch(signOut());
  }
  return (
    <Background>
      <StatusBar barStyle="light-content" backgroundColor="#08264A" />

      <Container>
        <Title>Meu Perfil</Title>
        <Form>
          <TextInput
            value={name}
            icon="person"
            autoCorrect={false}
            autoCapitalize="none"
            placeholder="Meu nome"
            onChangeText={setName}
            onSubmitEditing={() => emailRef.current.focus()}
            returnKeyType="next"
          />

          <TextInput
            value={email}
            ref={emailRef}
            keyboardType="email-address"
            placeholder="Meu E-mail"
            icon="email"
            autoCorrect={false}
            autoCapitalize="none"
            onChangeText={setEmail}
            onSubmitEditing={() => professionRef.current.focus()}
            returnKeyType="next"
          />

          {profile.doctor ? (
            <TextInput
              value={profession}
              ref={professionRef}
              placeholder="Minha função"
              icon="work"
              autoCorrect={false}
              autoCapitalize="none"
              onChangeText={setProfession}
              onSubmitEditing={() => addressRef.current.focus()}
              returnKeyType="next"
            />
          ) : null}

          <TextInput
            value={address}
            ref={addressRef}
            placeholder="Meu endereço"
            icon="location-city"
            autoCorrect={false}
            autoCapitalize="none"
            onChangeText={setAddress}
            onSubmitEditing={() => oldPasswordRef.current.focus()}
            returnKeyType="next"
          />

          <Separator />

          <TextInput
            value={oldPassword}
            ref={passwordRef}
            placeholder="Minha senha antiga"
            icon="lock"
            secureTextEntry
            onChangeText={setOldPassword}
            returnKeyType="next"
          />

          <TextInput
            value={password}
            ref={passwordRef}
            placeholder="Minha nova senha"
            icon="lock"
            secureTextEntry
            onChangeText={setPassword}
            returnKeyType="next"
          />

          <TextInput
            value={confirmPassword}
            ref={confirmPasswordRef}
            placeholder="Confirmação da senha"
            icon="lock"
            secureTextEntry
            onChangeText={setConfirmPassword}
            onSubmitEditing={handleSubmit}
            returnKeyType="send"
          />
          <SubmitButton loading={loading} onPress={handleSubmit}>
            Atualizar Perfil
          </SubmitButton>
          <LogOutButton onPress={handleLogOut}>Sair da aplicação</LogOutButton>
        </Form>
      </Container>
    </Background>
  );
}

Profile.navigationOptions = {
  headerTitle: () => <HeaderLogo />,
  headerStyle: {
    backgroundColor: '#08264A',
    height: 60,
  },
  headerTitleAlign: 'center',
};
