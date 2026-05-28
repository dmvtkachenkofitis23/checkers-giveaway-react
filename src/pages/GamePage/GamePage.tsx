import { useNavigate } from 'react-router-dom';
import Board from '../../components/Board/Board';

const GamePage = () => {
  const navigate = useNavigate();

  return (
    <div>
      <button onClick={() => navigate('/')} style={{ marginBottom: '20px' }}>
        Повернутися в меню
      </button>
      <Board />
    </div>
  );
};

export default GamePage;