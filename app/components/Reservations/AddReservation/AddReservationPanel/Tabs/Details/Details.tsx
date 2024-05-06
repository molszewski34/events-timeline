import React from 'react';
import SectionHeader from '../../Headers/SectionHeader';
import Label from '../../Headers/Label';
import Notes from './Notes/Notes';
import Field from '../Client/Field/Field';
import Registration from './Registration/Registration';
import Boarding from './Boarding/Boarding';
import Footer from '../../Footer/Footer';

const Details = () => {
  return (
    <main className="flex flex-col gap-2">
      <section className="flex flex-col gap-2">
        <SectionHeader title="Pozostałe" />
        <Label title="Notatki" />
        <Notes />
      </section>

      <Registration />
      <Boarding />
      <Field
        formDataKey="passCode"
        label="Kod do drzwi"
        type="text"
        placeholder=""
      />
      <Footer />
    </main>
  );
};

export default Details;
