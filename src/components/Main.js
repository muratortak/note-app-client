import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import Grid from '@material-ui/core/Grid';
import UserProfile from './UserProfile';
import Notes from './Notes';
import NotePanel from './NotePanel';
import { getMe } from '../actions/user.actions';


// TODO: Add a new section called 'EXPLORE' to see notes shared by others. Filtering by category.

function Main(props) {
  // useEffect(() => {
  //   props.dispatch(getMe());
  // }, []);

  return (
    <Grid>
      <Grid container sm={12} spacing={1} justify="center">
        <Grid item sm={3}>
          <UserProfile user={props.user} />
        </Grid>
        <Grid item md={8}>
          <NotePanel />
          <Notes />
        </Grid>
      </Grid>
    </Grid>
  );
};

const mapStateToProps = (state) => {
  return {
    user: state.user.user,
    loading: state.user.loading,
    hasErrors: state.user.hasErrors,
  };
};

export default connect(mapStateToProps)(Main);
