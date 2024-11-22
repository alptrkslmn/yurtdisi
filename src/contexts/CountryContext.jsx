import React, { createContext, useContext, useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

const CountryContext = createContext();

export function useCountry() {
  return useContext(CountryContext);
}

export function CountryProvider({ children }) {
  const { t } = useTranslation();
  const [countries, setCountries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Ülkeleri yükle
  useEffect(() => {
    loadCountries();
  }, []);

  const loadCountries = async () => {
    try {
      setLoading(true);
      const store = window.electron.store;
      const savedCountries = await store.get('countries') || [];
      setCountries(savedCountries);
      setError(null);
    } catch (err) {
      setError('Ülkeler yüklenirken hata oluştu');
      console.error('Ülkeler yüklenirken hata:', err);
    } finally {
      setLoading(false);
    }
  };

  const addCountry = async (countryData) => {
    try {
      const store = window.electron.store;
      const newId = Math.max(...countries.map(c => c.id), 0) + 1;
      const newCountry = { ...countryData, id: newId };
      const updatedCountries = [...countries, newCountry];
      await store.set('countries', updatedCountries);
      setCountries(updatedCountries);
      return { success: true, message: t('settings.countries.addSuccess') };
    } catch (err) {
      console.error('Ülke eklenirken hata:', err);
      return { success: false, message: err.message };
    }
  };

  const updateCountry = async (id, countryData) => {
    try {
      const store = window.electron.store;
      const updatedCountries = countries.map(country =>
        country.id === id ? { ...countryData, id } : country
      );
      await store.set('countries', updatedCountries);
      setCountries(updatedCountries);
      return { success: true, message: t('settings.countries.editSuccess') };
    } catch (err) {
      console.error('Ülke güncellenirken hata:', err);
      return { success: false, message: err.message };
    }
  };

  const deleteCountry = async (id) => {
    try {
      const store = window.electron.store;
      const updatedCountries = countries.filter(country => country.id !== id);
      await store.set('countries', updatedCountries);
      setCountries(updatedCountries);
      return { success: true, message: t('settings.countries.deleteSuccess') };
    } catch (err) {
      console.error('Ülke silinirken hata:', err);
      return { success: false, message: err.message };
    }
  };

  const toggleCountryStatus = async (id) => {
    try {
      const store = window.electron.store;
      const updatedCountries = countries.map(country =>
        country.id === id ? { ...country, active: !country.active } : country
      );
      await store.set('countries', updatedCountries);
      setCountries(updatedCountries);
      return { success: true };
    } catch (err) {
      console.error('Ülke durumu güncellenirken hata:', err);
      return { success: false, message: err.message };
    }
  };

  const getCountryById = (id) => {
    return countries.find(country => country.id === id);
  };

  const getActiveCountries = () => {
    return countries.filter(country => country.active);
  };

  const value = {
    countries,
    loading,
    error,
    addCountry,
    updateCountry,
    deleteCountry,
    toggleCountryStatus,
    getCountryById,
    getActiveCountries,
    refreshCountries: loadCountries
  };

  return (
    <CountryContext.Provider value={value}>
      {children}
    </CountryContext.Provider>
  );
}