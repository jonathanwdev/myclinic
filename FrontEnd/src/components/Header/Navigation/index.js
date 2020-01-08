import React from 'react';
import { FaInstagram } from 'react-icons/fa';
import { NavLink } from 'react-router-dom';
import { AiOutlineFacebook, AiOutlineLinkedin } from 'react-icons/ai';

import { Container } from './styles';

export default function Navigation() {
  return (
    <Container>
      <nav className="nav">
        <ul>
          <li>
            <NavLink
              to="/login"
              activeStyle={{
                fontWeight: 'bold',
                color: '#36cb4f',
              }}
            >
              LOGIN
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/register"
              activeStyle={{
                fontWeight: 'bold',
                color: '#36cb4f',
              }}
            >
              CADASTRO
            </NavLink>
          </li>
        </ul>
        <FaInstagram color="#fff" size={20} />
        <AiOutlineFacebook color="#fff" size={20} />
        <AiOutlineLinkedin color="#fff" size={20} />
      </nav>
    </Container>
  );
}
