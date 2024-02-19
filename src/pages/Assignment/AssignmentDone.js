import MainButton from 'src/components/MainButton';
import { Grid } from '@mui/material';
import { useHistory } from 'react-router-dom';
import { LEARNING_CENTER } from 'src/navigation/CONSTANTS';
import { makeStyles } from 'tss-react/mui';

function AssignmentDone({ wordCount = 0 }) {
  const history = useHistory();

  const useStyles = makeStyles()(() => ({
    emoji: {
      fontSize: '7rem',
    },
  }));

  const { classes } = useStyles();

  return (
    <Grid container className="home-section1 home-container">
      <div className="assignment-section">
        <div className={classes.emoji}>🥳</div>
        <h1>Congrats On Finishing All the Question!</h1>
        <div className="p1 mb-30">
          {`You did a great job! You spoke ${wordCount} word(s) in this round of practice!`}
        </div>
        <MainButton btnLabel="Go to Assignment Page" onClick={() => { history.push(LEARNING_CENTER); }} />
      </div>
    </Grid>
  );
}

export default AssignmentDone;
