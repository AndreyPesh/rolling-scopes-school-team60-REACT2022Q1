import { useNavigate } from 'react-router-dom';

import { Button } from '@mui/material';

import { Path } from '../../router/routes';
import dashboard from '../../assets/image/dashboard.png';

import './WelcomeIntro.scss';
import { useTranslation } from 'react-i18next';

export const WelcomeIntro = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  return (
    <div className="welcome__intro">
      <div className="welcome__intro_content">
        <h1 className="welcome__intro_title">{t('welcomePage.h1')}</h1>
        <span className="welcome__intro_span">{t('welcomePage.span')}</span>
        <p className="welcome__intro_description">{t('welcomePage.p')}</p>
        <Button variant="contained" onClick={() => navigate(`/${Path.main}`, { replace: true })}>
          {t('welcomePage.btn')}
        </Button>
      </div>
      <img src={dashboard} alt="" className="welcome__intro_img" />
    </div>
  );
};
