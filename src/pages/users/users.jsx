import React from 'react';
import { useTranslation } from 'react-i18next';
import { Routes, Route } from 'react-router-dom';
import UsersSettings from './Settings/UsersSettings';

const Users = () => {
  const { t } = useTranslation();

  return (
    <Routes>
      <Route index element={<UsersSettings />} />
    </Routes>
  );
};

export default Users;
