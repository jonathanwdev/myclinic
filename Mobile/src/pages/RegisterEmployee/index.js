import React, { useState, useRef } from 'react';
import PropTypes from 'prop-types';
import { TouchableOpacity, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import api from '~/services/api';

import Background from '~/components/Background';

import { Container, Form, TextInput, SubmitButton } from './styles';

export default function RegisterEmployee({ navigation }) {
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [profession, setProfession] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const emailRef = useRef();
  const professionRef = useRef();
  const passwordRef = useRef();
  const confirmPasswordRef = useRef();

  async function handleSubmit() {
    try {
      setLoading(true);
      await api.post('doctors', {
        name,
        email,
        profession,
        password,
        confirmPassword,
      });
      Alert.alert('Sucesso', ' Funcionario cadastrado com sucesso !');
      setLoading(false);
      navigation.navigate('Employees');
    } catch (err) {
      Alert.alert('Erro', err.response.data.error);
    }
  }

  return (
    <Background>
      <Container>
        <Form>
          <TextInput
            value={name}
            icon="person"
            autoCorrect={false}
            autoCapitalize="none"
            placeholder="Nome do funcionario"
            onChangeText={setName}
            onSubmitEditing={() => emailRef.current.focus()}
            returnKeyType="next"
          />

          <TextInput
            value={email}
            ref={emailRef}
            keyboardType="email-address"
            placeholder="E-mail do funcionario"
            icon="email"
            autoCorrect={false}
            autoCapitalize="none"
            onChangeText={setEmail}
            onSubmitEditing={() => professionRef.current.focus()}
            returnKeyType="next"
          />
          <TextInput
            value={profession}
            ref={professionRef}
            placeholder="Função do funcionario"
            icon="work"
            autoCorrect={false}
            autoCapitalize="none"
            onChangeText={setProfession}
            onSubmitEditing={() => passwordRef.current.focus()}
            returnKeyType="next"
          />
          <TextInput
            value={password}
            ref={passwordRef}
            placeholder="Senha do funcionario"
            icon="lock"
            secureTextEntry
            onChangeText={setPassword}
            returnKeyType="next"
          />
          <TextInput
            value={confirmPassword}
            ref={confirmPasswordRef}
            placeholder="Confirme a senha"
            icon="lock"
            secureTextEntry
            onChangeText={setConfirmPassword}
            onSubmitEditing={handleSubmit}
            returnKeyType="send"
          />
        </Form>
        <SubmitButton loading={loading} onPress={handleSubmit}>
          CONFIRMAR CADASTRO
        </SubmitButton>
      </Container>
    </Background>
  );
}

RegisterEmployee.navigationOptions = ({ navigation }) => ({
  title: 'Cadastrar Funcionario',
  headerLeft: () => (
    <TouchableOpacity
      onPress={() => {
        navigation.goBack();
      }}
    >
      <Icon name="chevron-left" size={30} color="#00FF2B" />
    </TouchableOpacity>
  ),

  headerStyle: {
    backgroundColor: '#08264A',
    height: 60,
  },
  headerTintColor: '#00FF2B',
  headerTitleStyle: 'bold',
  headerTitleAlign: 'center',
  headerLeftContainerStyle: {
    marginLeft: 20,
  },
});

RegisterEmployee.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }).isRequired,
};
