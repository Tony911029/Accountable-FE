import React, { useState } from 'react';
import { makeStyles } from 'tss-react/mui';
import { Link, useHistory } from 'react-router-dom';
import { LOGIN, ROOT } from 'src/navigation/CONSTANTS';

/**
 * Card used in the learning center main page
 *
 * * */
function LearningCard(
  { label, to, isActive },
) {
  const useStyles = makeStyles()(() => ({
    card: {
      justifyContent: 'center',
      alignItems: 'center',
      fontWeight: '700 !important',
      height: '300px',
      display: 'flex',
      color: '#FF9900 !important',
      fontSize: '2rem',
      textDecoration: 'none !important',
      textAlign: 'center',
    },
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
