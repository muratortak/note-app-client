import React, { useEffect } from 'react';
import { Grid } from '@material-ui/core';
import { connect } from 'react-redux';
import { getAllNotes, addNewNoteFunc } from '../actions/notes.actions';
import AddIcon from '@material-ui/icons/Add';
import Fab from '@material-ui/core/Fab';
import Note from './Note';

const Notes = (props) => {

  const { notes } = props;
  
  useEffect(() => {
    props.dispatch(getAllNotes());
  }, []);

  const addNote = () => {
    props.dispatch(addNewNoteFunc());
  };

  return (
    <Grid>
      <Fab size="small" color="secondary" aria-label="add">
        <AddIcon onClick={addNote} />
      </Fab>
      <Grid container>
        <Grid item md={2}>
          { notes ?
            notes.map((note) => {
              return <Note id={note._id} key={note._id} note={note} />;
            }) : null
          }
        </Grid>
      </Grid>
    </Grid>
  );
};

const mapStateToProps = (state) => {
  return {
    user: state.user.user,
    notes: state.note.notes,
    maxZIndex: state.note.maxZIndex,
  };
};

export default connect(mapStateToProps)(Notes);
