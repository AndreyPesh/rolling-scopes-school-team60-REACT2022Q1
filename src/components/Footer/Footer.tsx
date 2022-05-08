import { team } from '../../utils/constants/constants';

import './Footer.scss';
import FooterLogo from './footerComponents/FooterLogo';
import FooterNavItem from './footerComponents/FooterNavItem';

export const Footer = () => {
  return (
    <footer className="footer">
      <div className="container footer__container">
        <FooterLogo />
        <nav className="team">
          <ul className="team__list">
            {team.map((person) => {
              return <FooterNavItem key={person.name} link={person.github} title={person.name} />;
            })}
          </ul>
        </nav>
      </div>
    </footer>
  );
};

export default Footer;
