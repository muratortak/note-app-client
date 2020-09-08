import React from 'react'
import { Grid, Card, CardActionArea, CardMedia, CardContent, Typography } from '@material-ui/core';
import styled from 'styled-components';

const StyledCardMedia = styled(CardMedia)`
  object-fit: cover
`;

function UserProfile(props) {
  
  return (
    <Grid container spacing={2}>
      <Grid item xl={10} lg={10} md={10} sm={10} xs={10}>
        <Card>
          <CardActionArea>
            <StyledCardMedia
              component="img"
              alt="User PP"
              height="200"
              image={props.user.user.image}
              title={props.user.user.userName}
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="h2">
                {props.user.user.userName}
              </Typography>
              <Typography gutterBottom variant="body2" color="textSecondary" component="p">
                {props.user.user.description}
                <br />
                {props.user.user.email}
              </Typography>
            </CardContent>
          </CardActionArea>
        </Card>
      </Grid>
    </Grid>
  );
}

// export default connect(mapStateToProps)(UserProfile)
export default UserProfile;
