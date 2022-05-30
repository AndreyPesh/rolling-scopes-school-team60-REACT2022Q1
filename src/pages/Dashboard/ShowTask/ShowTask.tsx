import './show-task.scss';
import { useTranslation } from 'react-i18next';
import { useAppSelector } from '../../../hooks';
import { RootState } from '../../../store';
import { TaskData } from '../../../utils/types/types';

const ShowTask: React.FC<{ columnId: string; dataTask: TaskData }> = ({ columnId, dataTask }) => {
  const {
    currentBoard: {
      boardData: { columns },
    },
  } = useAppSelector((state: RootState) => state);
  const { t } = useTranslation();
  const currentColumn = columns.find((column) => column.id === columnId);
  return (
    <div className="show-task">
      <h3>
        {t('dashboardPage.column')}: {currentColumn?.title}
      </h3>
      <h3>
        {t('dashboardPage.task')}: {dataTask.title}
      </h3>
      <p>
        <b>{t('dashboardPage.description')}:</b> {dataTask.description}
      </p>
    </div>
  );
};

export default ShowTask;
