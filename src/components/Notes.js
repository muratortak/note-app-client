import React, { useEffect, useReducer, useState } from 'react';
import { Grid, Card, Paper, makeStyles } from '@material-ui/core';
import Draggable from 'react-draggable';
import { connect } from 'react-redux';
import { getAllNotes } from '../actions/notes.actions';
import Note from './Note';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    '& > *': {
      margin: theme.spacing(1),
      // width: theme.spacing(16),
      // height: theme.spacing(16),
      width: '100%',
      height: '100%',
    },
  },
  paper: {
    backgroundColor: 'yellow',
  },
}));


const Notes = (props) => {

  // const initialState = {
  //   maxZIndex: 0,
  // };

  // const [state, setState ] = useState(initialState);
  const classes = useStyles();
  const { notes } = props;
  console.log('Notes i Notes : ', notes);
  useEffect(() => {
    console.log('notes useEffect');
    props.dispatch(getAllNotes());
    // setState({ maxZIndex });
  }, []);

  const handleChange = (newIndex) => {
    // setState({ index: newIndex });
  };

  // const { index } = state;
  return (
    <Grid>
      <Grid md={12}>
        <Grid container md={12}>
          {
            notes.map((note) => {
              // return <Note key={note.zIndex} note={note} setIndex={handleChange} />;
              return <Note id={note._id} note={note} setIndex={handleChange} />;
            })
          }
        </Grid>
      </Grid>
    </Grid>
  );
};

const mapStateToProps = (state) => {
  console.log('user state in notes: ', state);
  console.log(state.note.notes);
  return {
    user: state.user.user,
    notes: state.note.notes,
    maxZIndex: state.note.maxZIndex,
  };
};

export default connect(mapStateToProps)(Notes);
