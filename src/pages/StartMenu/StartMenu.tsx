import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { setTheme, resetGame, setPlayers } from '../../store/gameSlice';
import { RootState } from '../../store';
import './StartMenu.css';

const validationSchema = yup.object({
  whitePlayer: yup.string()
    .required("Ім'я гравця за Білих є обов'язковим")
    .min(2, "Ім'я повинно містити мінімум 2 символи"),
  blackPlayer: yup.string()
    .required("Ім'я гравця за Чорних є обов'язковим")
    .min(2, "Ім'я повинно містити мінімум 2 символи"),
  gameTheme: yup.string().required()
}).required();

type FormInputs = yup.InferType<typeof validationSchema>;

const StartMenu = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const board = useSelector((state: RootState) => state.game.board);

  const { register, handleSubmit, formState: { errors } } = useForm<FormInputs>({
    resolver: yupResolver(validationSchema),
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
            {...register('whitePlayer')} 
            placeholder="Ім'я гравця"
          />
          {errors.whitePlayer && <span className="error">{errors.whitePlayer.message}</span>}
        </div>

        <div className="form-group">
          <label>Гравець за Чорних:</label>
          <input 
            {...register('blackPlayer')} 
            placeholder="Ім'я гравця"
          />
          {errors.blackPlayer && <span className="error">{errors.blackPlayer.message}</span>}
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
          Продовжити поточну гру
        </button>
      )}
    </div>
  );
};

export default StartMenu;