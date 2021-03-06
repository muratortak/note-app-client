import React from 'react';
import PropTypes from 'prop-types';
import SwipeableViews from 'react-swipeable-views';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import UserProfile from './UserProfile';
import UpdateProfile from './UpdateProfile';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import AppBar from '@material-ui/core/AppBar';
import ProfileEdit from './ProfileEdit';
import { connect } from 'react-redux';

function TabPanel(props) {
    const { children, value, index, ...other } = props;
  
    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`full-width-tabpanel-${index}`}
        aria-labelledby={`full-width-tab-${index}`}
        {...other}
      >
        {value === index && (
          <Box p={3}>
            <Typography>{children}</Typography>
          </Box>
        )}
      </div>
    );
  }

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `full-width-tab-${index}`,
    'aria-controls': `full-width-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.paper,
    color: '#b23c17',
    width: '100%',
  },
}));
  

function ProfilePanel(props) {
    const classes = useStyles();
    const theme = useTheme();
    const [value, setValue] = React.useState(0);
  
    const handleChange = (event, newValue) => {
      setValue(newValue);
    };
  
    const handleChangeIndex = (index) => {
      setValue(index);
    };
  
    return (
        <div>
            <AppBar position="static" color="default">
        <Tabs
          value={value}
          onChange={handleChange}
        //   indicatorColor="primary"
          inkBarStyle={{background: '#b23c17' }}
          style={{color: '#b23c17'}}
        //   textColor="primary"
          variant="fullWidth"
          aria-label="full width tabs example"
        >
          <Tab label="Profile" {...a11yProps(0)} />
          <Tab label="Update Profile" {...a11yProps(1)} />
        </Tabs>
      </AppBar>
      <SwipeableViews
        axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
        index={value}
        onChangeIndex={handleChangeIndex}
      >
        <TabPanel value={value} index={0} dir={theme.direction}>
          <UserProfile user={props.user} />
          <div style={{
            backgroundColor: 'lightgrey',
            marginLeft: '-20px',
            marginRight: '-20px',
            marginBottom: '0px',
            marginTop: '15px',
            borderBottomLeftRadius: '7px',
            borderBottomRightRadius: '7px',
            padding: '20px',
            textAlign: 'center',
          }}
          >
            <a href="localhost:3000/main">Forgot password?</a>
          </div>
        </TabPanel>
        <TabPanel value={value} index={1} dir={theme.direction}>
          <ProfileEdit />
        </TabPanel>
      </SwipeableViews>
        </div>
    );
}

const mapStateToProps = (state) => {
    return {
      user: state.user.user,
    };
  };
  
  export default connect(mapStateToProps)(ProfilePanel);