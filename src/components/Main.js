import React from 'react';
import { connect } from 'react-redux';
import Grid from '@material-ui/core/Grid';
import UserProfile from './UserProfile';
import Notes from './Notes';
import NotePanel from './NotePanel';
import styled from 'styled-components';

// TODO: Add a new section called 'EXPLORE' to see notes shared by others. Filtering by category.

const StyledDiv = styled.div`
  padding: 20px;
`;

function Main(props) {
  return (
    <StyledDiv>
      <Grid container spacing={6}>
        <Grid item sm={2}>
          <UserProfile user={props.user} />
        </Grid>
        <Grid item md={10}>
          {/* <NotePanel /> */}
          <Notes />
        </Grid>
      </Grid>
    </StyledDiv>
  );
};

const mapStateToProps = (state) => {
  return {
    user: state.user.user,
    notes: state.note.notes,
    loading: state.user.loading,
    hasErrors: state.user.hasErrors,
  };
};

export default connect(mapStateToProps)(Main);
