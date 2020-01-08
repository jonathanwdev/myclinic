import React from 'react';
import PropTypes from 'prop-types';
import Header from '~/components/Header';

import { Wrapper, SubBg } from './styles';

export default function AuthLayout({ children }) {
  return (
    <Wrapper>
      <Header />
      <SubBg />
      {children}
    </Wrapper>
  );
}

AuthLayout.propTypes = {
  children: PropTypes.element.isRequired,
};
