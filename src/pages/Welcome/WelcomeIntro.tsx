import { useNavigate } from 'react-router-dom';

import { Button } from '@mui/material';

import { Path } from '../../router/routes';
import dashboard from '../../assets/image/dashboard.png';

import './WelcomeIntro.scss';

export const WelcomeIntro = () => {
  const navigate = useNavigate();

  return (
    <div className="welcome__intro">
      <div className="welcome__intro_content">
        <h1 className="welcome__intro_title">Welcome to our project!</h1>
        <span className="welcome__intro_span">Plan your affairs and reach your goals!</span>
        <p className="welcome__intro_description">
          Our project really useful? It is a terrific tool for managing and collaborating with team
          members on work projects and tasks. Visually, our&apos;s Kanban boards are organizational
          bliss. You can pack a ton of detail into each card, and they let you know who&apos;s
          working on what, at any given time.
        </p>
        <Button variant="contained" onClick={() => navigate(`/${Path.main}`, { replace: true })}>
          Get started!
        </Button>
      </div>
      <img src={dashboard} alt="" className="welcome__intro_img" />
    </div>
  );
};
