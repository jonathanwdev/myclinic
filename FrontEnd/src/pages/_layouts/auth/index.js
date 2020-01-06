import React from 'react';
import PropTypes from 'prop-types';
import UnsignedHeader from '~/components/UnsignedHeader';

import { Wrapper, SubBg } from './styles';

export default function AuthLayout({ children }) {
  return (
    <Wrapper>
      <UnsignedHeader />
      <SubBg />
      {children}
    </Wrapper>
  );
}

AuthLayout.propTypes = {
  children: PropTypes.element.isRequired,
};
