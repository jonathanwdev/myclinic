import React from 'react';
import { Image } from 'react-native';
import Logo from '~/assets/Logo.png';

export default function HeaderLogo() {
  return <Image source={Logo} style={{ resizeMode: 'contain' }} />;
}
