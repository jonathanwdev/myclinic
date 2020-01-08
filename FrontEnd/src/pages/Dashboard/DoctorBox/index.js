import React, { useState } from 'react';

import Management from './Management';
import Dashboard from './Dashboard';
import Employees from './Employees';

import { Container, VerticalNavigation, Option, ChangeButton } from './styles';

export default function DoctorBox() {
  const options = [
    {
      component: <Dashboard />,
      label: 'DASHBOARD',
    },
    {
      component: <Employees />,
      label: 'Cadastrar funcionários',
    },
    {
      component: <Management />,
      label: 'Gerenciar funcionários',
    },
  ];
  const [activeOption, setActiveOption] = useState(options[0]);

  function handleSelectOptions(option) {
    setActiveOption(option);
  }

  return (
    <Container>
      <VerticalNavigation>
        <ul>
          {options.map((option, index) => (
            <Option key={index}>
              <ChangeButton
                type="button"
                onClick={() => handleSelectOptions(option)}
                active={option.label === activeOption.label}
              >
                {option.label}
              </ChangeButton>
            </Option>
          ))}
        </ul>
      </VerticalNavigation>
      <section>{activeOption.component}</section>
    </Container>
  );
}
