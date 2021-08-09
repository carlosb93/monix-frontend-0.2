import React from 'react';

import {Title} from './components/Title';
import {Details} from './components/Details';

export default About  = ({negocio_id, suma, ingreso, gasto}) => {


  return (
    <>
      <Title title="Flujo de efectivo" />
      <Details suma={suma} ingreso={ingreso} gasto={gasto} />
    </>
  );
};
