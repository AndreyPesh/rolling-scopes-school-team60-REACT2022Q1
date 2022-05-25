import GitHubIcon from '@mui/icons-material/GitHub';
import { grey } from '@mui/material/colors';
import { t } from 'i18next';
import { useTranslation } from 'react-i18next';

import { Developer } from '../../utils/interfaces/interfaces';

import './DeveloperCard.scss';

interface IDeveloperCardProps {
  developerProps: Developer;
}

export const DeveloperCard: React.FC<IDeveloperCardProps> = ({ developerProps }) => {
  const { avatarUrl, nickname, github, jobStatus, description } = developerProps;
  const { t } = useTranslation();

  return (
    <div className="developers__card">
      <img src={avatarUrl} alt="" className="developer__card_image" />
      <div className="developer__card_description">
        <div className="developer__card_name">
          <h3>{nickname}</h3>
          <a href={github} target="_blank" rel="noreferrer noopener">
            <GitHubIcon sx={{ color: grey[900] }} />
          </a>
        </div>
        <p className="developer__card_job">{jobStatus}</p>
        <p className="developer__card_work-title">{t('welcomePage.cardTitle')}</p>
        <div className="developer__card_characteristic">{description}</div>
      </div>
    </div>
  );
};
