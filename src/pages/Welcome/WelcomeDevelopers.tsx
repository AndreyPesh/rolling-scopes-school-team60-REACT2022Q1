import { TEAM } from '../../utils/constants';

import './WelcomeDevelopers.scss';
import { DeveloperCard } from './DeveloperCard';
import { useTranslation } from 'react-i18next';

export const WelcomeDevelopers = () => {
  const { t } = useTranslation();
  return (
    <div className="developers">
      <h2 className="developers__title">{t('welcomePage.aboutUs')}</h2>
      <div className="developers__content">
        {TEAM.slice(1).map((person) => {
          return <DeveloperCard key={person.name} developerProps={person} />;
        })}
      </div>
    </div>
  );
};
