import { makeStyles } from 'tss-react/mui';
import { useHistory } from 'react-router-dom';
import { cardStyle } from 'src/styles/CardStyle';

/**
 * Card used in the learning center main page
 *
 * * */
function LearningCard(
  { label, to, isActive },
) {
  const useStyles = makeStyles()(() => ({
    card: cardStyle,
    active: {
      boxShadow: '0px 10px 30px 0px #FF99004A !important',
      borderRadius: '8px',
      '&:hover': {
        background: '#FFDEAB',
        color: 'white !important',
        boxShadow: '0px 5px 21px 0px #FF990033 !important',
        cursor: 'pointer',
      },
    },
    inActive: {
      background: '#E1E1E1',
      color: 'white !important',
    },
  }));

  const { classes } = useStyles();

  const history = useHistory();
  const handleClick = () => {
    if (isActive) {
      history.push(to);
    }
  };

  return (
    <div className={isActive ? `${classes.card} ${classes.active}` : `${classes.card} ${classes.inActive}`} onClick={handleClick}>
      <div>{label}</div>
    </div>
  );
}

export default LearningCard;
