import React, { useState } from 'react';

import Appointment from './Appointment';
import MyAppointments from './MyAppointments';

import { Container, VerticalNavigation, Option, ChangeButton } from './styles';

export default function ClientBox() {
  const options = [
    {
      component: <Appointment />,
      label: 'Agendar Serviço',
    },
    {
      component: <MyAppointments />,
      label: 'Meus Agendamentos',
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
