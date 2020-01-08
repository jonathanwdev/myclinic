import React, { useState } from 'react';

import Management from './Management';
import Dashboard from './Dashboard';
import Employees from './Employees';

import { Container, VerticalNavigation, Option, ChangeButton } from './styles';

export default function DoctorBox() {
  const [selected, setSelected] = useState(<Dashboard />, 'dash');
  const [active, setActive] = useState(false);

  function handleSelect(tag, value) {
    setSelected('');
    setActive(!active);
    setSelected(tag);
  }

  return (
    <Container>
      <VerticalNavigation>
        <ul>
          <Option>
            <ChangeButton
              type="button"
              active={active}
              onClick={() => handleSelect(<Dashboard />, 'dash')}
            >
              DASHBOARD
            </ChangeButton>
          </Option>
          <Option>
            <ChangeButton
              type="button"
              active={active}
              onClick={() => handleSelect(<Employees />, 'empl')}
            >
              Cadastrar functionarios
            </ChangeButton>
          </Option>
          <Option>
            <ChangeButton
              type="button"
              active={active}
              onClick={() => handleSelect(<Management />, 'mana')}
            >
              Gerenciar funcionarios
            </ChangeButton>
          </Option>
        </ul>
      </VerticalNavigation>
      <section>{selected}</section>
    </Container>
  );
}
