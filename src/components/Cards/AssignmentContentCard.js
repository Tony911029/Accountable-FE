import { makeStyles } from 'tss-react/mui';
import { Link, useHistory } from 'react-router-dom';
import MainButton from 'src/components/MainButton';
import './Card.css';
import { cardStyle } from 'src/styles/CardStyle';

/**
 * Card used in the learning center main page
 *
 * * */
function AssignmentContentCard(
  {
    children, className, label, title, to, isActive, button = false, buttonText, onClick, wordCount = false, count,
  },
) {
  const useStyles = makeStyles()(() => ({
    card: cardStyle,
    title: {
      fontSize: '2rem',
      display: 'flex',
      flexDirection: 'row',
      width: '100%',
      justifyContent: 'space-between',
      marginBottom: '40px',
    },
    footer: {
      fontSize: '1rem',
      display: 'flex',
      flexDirection: 'row',
      width: '100%',
      justifyContent: 'flex-end',
      marginTop: '30px',
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
    <div className={classes.card}>
      <div className={classes.title}>
        <div className="kk">{title}</div>
        {button && <MainButton btnLabel={buttonText} onClick={onClick} />}
      </div>
      <div className={className}>{children}</div>
      {wordCount && <div className={classes.footer}>{`Word Count: ${count}`}</div>}
    </div>
  );
}

export default AssignmentContentCard;
