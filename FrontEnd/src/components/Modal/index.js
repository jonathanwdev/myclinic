import React from 'react';
import PropTypes from 'prop-types';

import { Container, Content } from './styles';

export default function Modal({
  display,
  modalTitle,
  handleHideModal,
  children,
}) {
  return (
    <Container display={display}>
      <Content>
        <header>
          <h1>{modalTitle}</h1>
          <button type="button" onClick={handleHideModal}>
            FECHAR
          </button>
        </header>
        {children}
      </Content>
    </Container>
  );
}

Modal.propTypes = {
  display: PropTypes.bool.isRequired,
  modalTitle: PropTypes.string,
  handleHideModal: PropTypes.bool.isRequired,
  children: PropTypes.element.isRequired,
};

Modal.defaultProps = {
  modalTitle: '',
};
