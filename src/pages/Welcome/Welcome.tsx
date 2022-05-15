import { WelcomeDevelopers } from './WelcomeDevelopers';
import { WelcomeIntro } from './WelcomeIntro';

import './Welcome.scss';

export const Welcome = () => {
  return (
    <section className="welcome">
      <WelcomeIntro />
      <WelcomeDevelopers />
    </section>
  );
};
