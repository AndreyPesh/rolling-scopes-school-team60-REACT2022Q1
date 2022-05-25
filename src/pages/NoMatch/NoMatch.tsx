import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

export default function NoMatch() {
  const { t } = useTranslation();
  return (
    <div>
      <h2>{t('noMatchPage.title')}</h2>
      <p>
        <Link to="/">{t('noMatchPage.link')}</Link>
      </p>
    </div>
  );
}
