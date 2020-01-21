import React from 'react';
import PropTypes from 'prop-types';
import { ActivityIndicator } from 'react-native';

import { Container, TextContainer, LoadText } from './styles';

export function Loading({ size, color }) {
  return (
    <Container>
      <ActivityIndicator size={size} color={color} />
    </Container>
  );
}

export function TextLoading({ children, color }) {
  return (
    <TextContainer>
      <LoadText color={color}>{children}</LoadText>
    </TextContainer>
  );
}

Loading.propTypes = {
  size: PropTypes.string,
  color: PropTypes.string,
};

Loading.defaultProps = {
  size: 'small',
  color: '#fff',
};

TextLoading.propTypes = {
  children: PropTypes.string.isRequired,
  color: PropTypes.string,
};

TextLoading.defaultProps = {
  color: '#fff',
};
