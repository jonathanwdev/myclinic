import React from 'react';
import PropTypes from 'prop-types';
import Header from '~/components/Header';

import { Wrapper, SubBg } from './styles';

export default function DefaultLayout({ children }) {
  return (
    <Wrapper>
      <Header />
      <SubBg />
      {children}
    </Wrapper>
  );
}

DefaultLayout.propTypes = {
  children: PropTypes.element.isRequired,
};
