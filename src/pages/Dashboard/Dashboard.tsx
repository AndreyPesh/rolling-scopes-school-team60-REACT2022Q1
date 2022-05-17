import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Path } from '../../router/routes';

export default function Dashboard() {
  const { id } = useParams();
  const navigate = useNavigate();
  useEffect(() => {
    if (!id) {
      navigate(`${Path.home}`);
      console.log(id);
    }
  });

  return <h2>dashboard</h2>;
}
