import { team } from '../../utils/constants/constants';

import './WelcomeDevelopers.scss';
import { DeveloperCard } from './DeveloperCard';

export const WelcomeDevelopers = () => {
  return (
    <div className="developers">
      <h2 className="developers__title">About us</h2>
      <div className="developers__content">
        {team.slice(1).map((person) => {
          return <DeveloperCard key={person.name} developerProps={person} />;
        })}
      </div>
    </div>
  );
};
