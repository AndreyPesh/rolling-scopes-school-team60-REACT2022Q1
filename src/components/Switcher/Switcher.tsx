import React from 'react';
import { useTranslation } from 'react-i18next';

const Switcher = () => {
  const { i18n } = useTranslation();

  const handleLangChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    i18n.changeLanguage(e.target.value);
  };

  return (
    <li
      className="header__nav_item"
      style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}
    >
      <select
        className="header__lang"
        value={localStorage.getItem('i18nextLng') || 'en'}
        onChange={handleLangChange}
      >
        <option value="en">EN</option>
        <option value="ru">RU</option>
      </select>
    </li>
  );
};

export default Switcher;
