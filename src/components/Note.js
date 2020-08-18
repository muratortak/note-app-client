import React, { useReducer, useState, useRef, useEffect } from 'react';
import { connect } from 'react-redux';
import { Card, CardContent, Typography, Grid, Menu, MenuItem, IconButton } from '@material-ui/core';
import Input from '@material-ui/core/Input';
import TextField from '@material-ui/core/TextField';
import Draggable from 'react-draggable';
import { Resizable } from 'react-resizable';
import ControlCameraIcon from '@material-ui/icons/ControlCamera';
import { updateNoteZIndexFunc, saveNoteLocationFunc } from '../actions/notes.actions';

import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
// import '../../../nodecss/styles.css';
import '../helpers/style.css';
// import './test.css';
// #region useReducer


// TODO: Create a function to store the location of each note to put them back on the right place when user comes back.
// FIXME: Put the focus on the selected note. Some notes stay behind of others. Find a way to fix this on mouseclick.

function reducer(state, {field, value}) {
  console.log("REDUCER: ", field, value);
  return {
    ...state,
    [field]: value,
  };
}

let stateResize = { width: 200, height: 200 };

function Note(props) {
  const initialState = {
    _id: props.note._id,
    type: props.note.type,
    title: props.note.title,
    note: props.note.note,
    x: props.note.x,
    y: props.note.y,
    zIndex: props.note.zIndex,
  };

  // var initialX = {inX: props.note.x}
  // var initialY = {inY: props.note.y};
  // var inXnew = 0;
  // var inYnew = 0;
  // console.log('Note Refresh: ', initialX, initialY);
  const [field, setField] = useReducer(reducer, initialState);
  const [sizeEl, setSize] = useState(stateResize);
  const [anchorEl, setAnchorEl] = useState(null);
  const [open, setOpen] = React.useState(false);
  const isMenuOpen = Boolean(anchorEl);
  const handleChange = (event) => {
    setField({ field: event.target.name, value: event.target.value });
  };

  useEffect(() => {
    locationRef.current.style.transform = `translate(${field.x}px, ${field.y}px)`;
  }, []);

  const { _id, type, title, note, x, y, zIndex } = field;

  const locationRef = useRef(null);
  const locationZIndex = useRef(null);

  const onResize = (event, { element, size, handle }) => {
    setSize({ width: size.width, height: size.height });
  };

  const pinNote = (event, size) => {
  };

  const getLocation = () => {
  };
  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleProfileOpen = () => {
    setOpen(true);
  };

  const handleProfileClose = () => {
    setOpen(false);
  };

  
  const saveLocation = (event) => {
    console.log('location Ref: ', locationRef);
    let style = locationRef.current.style.transform;
    console.log('transform: ', style);
    let x = style.substring(style.indexOf('(') + 1, style.indexOf('px,'));
    let y = style.substring(style.indexOf('px,') + 3, style.indexOf('px)'));
    console.log('save location: ', x, y);
    const noteLocation = {
      noteID: field._id,
      x,
      y
    }
    props.dispatch(saveNoteLocationFunc(noteLocation));
  };

  const menuId = 'secondary-search-account-menu';

  const { width, height } = sizeEl;
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      id={menuId}
      keepMounted
      tranformOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={isMenuOpen}
      onClose={handleMenuClose}
      style={{ marginLeft: '-15px' }}
    >
      <MenuItem onClick={saveLocation}>Save Location</MenuItem>
      <MenuItem onClick={handleMenuClose}>Save Content</MenuItem>
    </Menu>
  );

  return (
  // <Grid>
  // <div ref={locationZIndex}>
    <Draggable handle="strong" >
      <div className="box no-cursor" ref={locationRef} style={{ zIndex: zIndex }}>
        <strong className="cursor">
          <div style={{backgroundColor: '#b23c17', color: '#ffffff', textAlign: 'center', minWidth: '230px', width: width + 'px', display: 'inline-block'}}>
            <span style={{float: 'left'}}>
              <ControlCameraIcon style={{ }} />
            </span>
            <span>
              {title}
            </span>
            <span style={{ float: 'right' }}>
              <IconButton
                edge="end"
                aria-label="account of current user"
                aria-controls={menuId}
                aria-haspopup="true"
                onClick={handleProfileMenuOpen}
                color="inherit"
                style={{ paddingTop: '0px' }}
              >
                <MoreHorizIcon />
              </IconButton>
            </span>
          </div>
        </strong>
        <Resizable className="box" height={height} width={width} onResize={onResize} resizeHandles={['se']}>
          <div className="box" style={{ minWidth: '230px', width: width + 'px', height: height + 'px' }}>
            <Card
              style={{ minWidth: '230px', width: (width) + 'px', height: height + 'px' }}
            >
              <CardContent>
                <Typography gutterBottom variant="h5" component="h2">
                  <Input style={{ minWidth: '195px', width: (width - 35) + 'px' }} type="text" name="title" value={title} onChange={handleChange} />
                </Typography>
                <Typography gutterBottom variant="body2" component="h3">
                  <Input style={{ minWidth: '195px', width: (width - 35) + 'px' }} type="text" name="type" value={type} onChange={handleChange} />
                </Typography>
                <Typography gutterBottom variant="body2" component="p">
                  <TextField style={{ minWidth: '195px', width: (width - 35) + 'px' }} multiline type="text" name="note" value={note} onChange={handleChange} />
                </Typography>
              </CardContent>
            </Card>
          </div>
        </Resizable>
        {renderMenu}
      </div>
    </Draggable>
    // </div>
  );
}

const mapStateToProps = (state) => {
  return {
    maxZIndex: state.note.maxZIndex,
  };
};

export default connect(mapStateToProps)(Note);
// export default Note;
