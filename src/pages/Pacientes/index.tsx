import React from 'react';
import { Container } from './styles';
import { HeaderGeneric } from '@components/GenericHeader';
import SimpleCard from '@components/SimpleCard';


const Pacientes: React.FC = () => {


  return (
    <Container>
        <HeaderGeneric/>
        <SimpleCard
          title='Gabriel Roberto'
          subtitle='CPF 123.123.123-12'
        />
    </Container>
  );
};

export default Pacientes;