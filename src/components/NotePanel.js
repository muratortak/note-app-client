import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Grid } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import Fab from '@material-ui/core/Fab';
import EmptyNote from '../helpers/EmptyNote';
import * as noteAction from '../actions/notes.actions';

function NotePanel(props) {

  const addNote = () => {
    props.dispatch(noteAction.addNewNoteFunc(props.notes));
  };

  return (
    <Grid style={{ width: '100%', height: '5%', backgroundColor: '#f6734b', marginBottom: '25px' }}>
      <Fab size="small" color="secondary" aria-label="add">
        <AddIcon onClick={addNote} />
      </Fab>
    </Grid>
  );
}


const mapStateToProps = (state) => {
  return {
    notes: state.note.notes,
  };
};

export default connect(mapStateToProps)(NotePanel);
