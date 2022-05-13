import GitHubIcon from '@mui/icons-material/GitHub';
import { grey } from '@mui/material/colors';

import { Developer } from '../../utils/interfaces/interfaces';

import './DeveloperCard.scss';

interface IDeveloperCardProps {
  developerProps: Developer;
}

export const DeveloperCard: React.FC<IDeveloperCardProps> = ({ developerProps }) => {
  const { avatarUrl, nickname, github, jobStatus, description } = developerProps;
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
        <p className="developer__card_work-title">Development Contribution</p>
        <div className="developer__card_characteristic">{description}</div>
      </div>
    </div>
  );
};
