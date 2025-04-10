import React from 'react';
import { Container } from './styles';
import { HeaderGeneric } from '@components/GenericHeader';
import SimpleCard from '@components/SimpleCard';
import Input from '@components/Input';


const Pacientes: React.FC = () => {


  return (
    <Container>
        <HeaderGeneric/>
        <Input
          size='P'
          placeholder='Olá'
          type='date'
        />
        <SimpleCard
          title='Gabriel Roberto'
          subtitle='CPF 123.123.123-12'
        />
    
    </Container>
  );
};

export default Pacientes;