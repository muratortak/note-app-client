import React from 'react';
import PropTypes from 'prop-types';
import SwipeableViews from 'react-swipeable-views';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import styled from 'styled-components';
import FormSignup from './FormSignup';
import FormLogin from './FormLogin';

const StyledTabs = styled(Tabs)`
  color: #b23c17;
`;

const StyledDivForgotPwd = styled.div`
  background-color: lightgrey;
  margin-bottom: 0px;
  margin-top: 15px;
  border-bottom-left-radius: 7px;
  border-bottom-right-radius: 7px;
  padding: 20px;
  text-align: center;
`;

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

export default function FullWidthTabs() {
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
        <StyledTabs
          value={value}
          onChange={handleChange}
          variant="fullWidth"
        >
          <Tab label="Login" {...a11yProps(0)} />
          <Tab label="Signup" {...a11yProps(1)} />
        </StyledTabs>
      </AppBar>
      <SwipeableViews
        axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
        index={value}
        onChangeIndex={handleChangeIndex}
      >
        <TabPanel value={value} index={0} dir={theme.direction}>
          <FormLogin />
        </TabPanel>
        <TabPanel value={value} index={1} dir={theme.direction}>
          <FormSignup />
        </TabPanel>
      </SwipeableViews>
      <StyledDivForgotPwd>
            <a href="localhost:3000/main">Forgot password?</a>
      </StyledDivForgotPwd>
    </div>
  );
}