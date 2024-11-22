import React from 'react';
import { useTranslation } from 'react-i18next';
import { Routes, Route } from 'react-router-dom';
import CountriesSettings from './Settings/CountriesSettings';

const Countries = () => {
  const { t } = useTranslation();

  return (
    <Routes>
      <Route index element={<CountriesSettings />} />
    </Routes>
  );
};

export default Countries;
