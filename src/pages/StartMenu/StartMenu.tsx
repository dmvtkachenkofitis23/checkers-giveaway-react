import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useForm } from 'react-hook-form';
import { setTheme, resetGame, setPlayers } from '../../store/gameSlice';
import { RootState } from '../../store';
import './StartMenu.css';

interface FormInputs {
  whitePlayer: string;
  blackPlayer: string;
  gameTheme: string;
}

const StartMenu: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const board = useSelector((state: RootState) => state.game.board);

  const { register, handleSubmit, formState: { errors } } = useForm<FormInputs>({
    defaultValues: {
      whitePlayer: '',
      blackPlayer: '',
      gameTheme: 'classic'
    }
  });

  const isGameStarted = board.flat().some(p => p !== null);

  const onSubmit = (data: FormInputs) => {
    dispatch(setPlayers({ white: data.whitePlayer, black: data.blackPlayer }));
    dispatch(setTheme(data.gameTheme));
    dispatch(resetGame());
    navigate('/game');
  };

  return (
    <div className="start-menu">
      <h1>Шашки-піддавки</h1>
      
      <form onSubmit={handleSubmit(onSubmit)} className="setup-form">
        <div className="form-group">
          <label>Гравець за Білих:</label>
          <input 
            {...register('whitePlayer', { required: true, minLength: 2 })} 
            placeholder="Ім'я гравця"
          />
          {errors.whitePlayer && <span className="error">Мінімум 2 символи</span>}
        </div>

        <div className="form-group">
          <label>Гравець за Чорних:</label>
          <input 
            {...register('blackPlayer', { required: true, minLength: 2 })} 
            placeholder="Ім'я гравця"
          />
          {errors.blackPlayer && <span className="error">Мінімум 2 symbols</span>}
        </div>

        <div className="form-group">
          <label>Тема дошки:</label>
          <select {...register('gameTheme')}>
            <option value="classic">Зелена</option>
            <option value="modern">Синя</option>
          </select>
        </div>

        <button type="submit" className="start-btn">Почати нову гру</button>
      </form>

      {isGameStarted && (
        <button onClick={() => navigate('/game')} className="continue-btn">
          Продовжити гру
        </button>
      )}
    </div>
  );
};

export default StartMenu;