import React from 'react';
import { AiOutlineLoading } from 'react-icons/ai';

import { Container } from './styles';

export default function Loading({ size }) {
  return (
    <Container>
      <AiOutlineLoading size={size} color="#fff" />
    </Container>
  );
}
