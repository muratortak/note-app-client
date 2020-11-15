import React from 'react'
import { Grid, Card, CardActionArea, CardMedia, CardContent, Typography } from '@material-ui/core';
import styled from 'styled-components';

const StyledCardMedia = styled(CardMedia)`
  object-fit: cover
`;

function UserProfile(props) {
  var title = props.user.user.userName.toString().substring(0, props.user.user.userName.toString().indexOf('@'));
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
              title={'asd'}
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="h5">
                {title}
              </Typography>
              <Typography gutterBottom variant="body2" color="textSecondary" component="p">
                {props.user.user.description}
                <br />
                {props.user.user.userName}
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
