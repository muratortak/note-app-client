import React from 'react';
import { connect } from 'react-redux';
import { Grid } from '@material-ui/core';

function NotePanel() {

  return (
    <Grid style={{ width: '100%', height: '5%', backgroundColor: '#f6734b', marginBottom: '25px' }}>

    </Grid>
  );
}


const mapStateToProps = (state) => {
  return {
    notes: state.note.notes,
  };
};

export default connect(mapStateToProps)(NotePanel);
