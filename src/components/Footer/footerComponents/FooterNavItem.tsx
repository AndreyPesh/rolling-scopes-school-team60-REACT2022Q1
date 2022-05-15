import GitHubIcon from '@mui/icons-material/GitHub';

interface FooterNavItemProps {
  link: string;
  title: string;
}

const FooterNavItem: React.FC<FooterNavItemProps> = ({ link, title }) => {
  return (
    <li className="team__item">
      <a href={link} className="team__link" target="_blank" rel="noreferrer noopener">
        <GitHubIcon />
        {title}
      </a>
    </li>
  );
};

export default FooterNavItem;
