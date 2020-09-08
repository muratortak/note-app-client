import React, { useReducer, useState, useRef, useEffect } from 'react';
import { connect } from 'react-redux';
import { Card, CardContent, Typography, Menu, MenuItem, IconButton } from '@material-ui/core';
import Input from '@material-ui/core/Input';
import TextField from '@material-ui/core/TextField';
import Draggable from 'react-draggable';
import { Resizable } from 'react-resizable';
import ControlCameraIcon from '@material-ui/icons/ControlCamera';
import { saveNewNoteFunc, deleteNoteFunc, saveNoteLocationFunc } from '../actions/notes.actions';

import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
// import '../../../nodecss/styles.css';
import '../helpers/style.css';
// import './test.css';
// #region useReducer


// TODO: Create a function to store the location of each note to put them back on the right place when user comes back.
// FIXME: Put the focus on the selected note. Some notes stay behind of others. Find a way to fix this on mouseclick.

function reducer(state, {field, value}) {
  return {
    ...state,
    [field]: value,
  };
}

let stateResize = { width: 200, height: 200 };

function Note_draggable(props) {
  const initialState = {
    _id: props.note._id,
    type: props.note.type,
    title: props.note.title,
    note: props.note.note,
    initalx: props.note.x,
    initaly: props.note.y,
    zIndex: props.note.zIndex,
  };

  // const stateLocation = {
  //   activeDrags: 0,
  //   deltaPosition: {
  //     x: 0, y: 0
  //   },
  //   controlledPosition: {
  //     x: -400, y: 200
  //   }
  // };

  const [field, setField] = useReducer(reducer, initialState);
  // const [state, setState] = useState(stateLocation);
  const [sizeEl, setSize] = useState(stateResize);
  const [anchorEl, setAnchorEl] = useState(null);
  const [open, setOpen] = React.useState(false);
  const isMenuOpen = Boolean(anchorEl);
  const handleChange = (event) => {
    setField({ field: event.target.name, value: event.target.value });
  };
  // var testx;
  // var testy;
  // useEffect(() => {
  //   // locationRef.current.style.transform = `translate(${field.x}px, ${field.y}px)`;
  //   testx = x;
  //   testy = y;
  // }, []);

  const { _id, type, title, note, initalx, initaly, zIndex } = field;

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

  // const onStart = () => {
  //   setState({activeDrags: ++stateLocation.activeDrags});
  // };

  // const onStop = () => {
  //   setState({activeDrags: --stateLocation.activeDrags});
  // };
  
  const saveLocation = (event) => {
    var coord = getNoteLocation(event);
    console.log('save location: ', coord.x, coord.y);
    const noteLocation = {
      noteID: field._id,
      x: coord.x,
      y: coord.y
    }
    props.dispatch(saveNoteLocationFunc(noteLocation));
  };

  const saveNote = (event) => {
    var coord = getNoteLocation(event);
    field.x = coord.x;
    field.y = coord.y;
    var newNote = field;
    props.dispatch(saveNewNoteFunc(newNote));
  }

  const deleteNote = () => {
    console.log("Delete action triggered.");
    var noteID = field._id;
    props.dispatch(deleteNoteFunc(noteID));
  }

  const getNoteLocation = (event) => {
    console.log("field on save content: ", field);
    let style = locationRef.current.style.transform;
    let x = style.substring(style.indexOf('(') + 1, style.indexOf('px,'));
    let y = style.substring(style.indexOf('px,') + 3, style.indexOf('px)'));
    return {x, y}
  }

  const menuId = 'secondary-search-account-menu';

  const { width, height } = sizeEl;
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      id={menuId}
      keepMounted
      // tranformOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={isMenuOpen}
      onClose={handleMenuClose}
      style={{ marginLeft: '-15px' }}
    >
      <MenuItem onClick={saveLocation}>Save Location</MenuItem>
      <MenuItem onClick={saveNote}>Save Note</MenuItem>
      <MenuItem onClick={deleteNote}>Delete Note</MenuItem>
    </Menu>
  );

  const stateLocation = {
    activeDrags: 0,
    deltaPosition: {
      x: 0, y: 0
    },
    controlledPosition: {
      x: -400, y: 200
    }
  };
  const [fieldLocation, setStateLocation] = useState(stateLocation);
  

  const handleDrag = (e, ui) => {
    const {x, y} = this.state.deltaPosition;
    setStateLocation({
      deltaPosition: {
        x: x + ui.deltaX,
        y: y + ui.deltaY,
      }
    });
  };

  const onStart = () => {
    setStateLocation({activeDrags: ++fieldLocation.activeDrags});
  };

  const onStop = () => {
    setStateLocation({activeDrags: --fieldLocation.activeDrags});
  };

  // For controlled component
  const adjustXPos = (e) => {
    e.preventDefault();
    e.stopPropagation();
    const {x, y} = this.state.controlledPosition;
    setStateLocation({controlledPosition: {x: x - 10, y}});
  };

  const adjustYPos = (e) => {
    e.preventDefault();
    e.stopPropagation();
    const {controlledPosition} = this.state;
    const {x, y} = controlledPosition;
    setStateLocation({controlledPosition: {x, y: y - 10}});
  };

  const onControlledDrag = (e, position) => {
    const {x, y} = position;
    setStateLocation({controlledPosition: {x, y}});
  };

  const onControlledDragStop = (e, position) => {
    this.onControlledDrag(e, position);
    this.onStop();
  };

  
  const dragHandlers = {onStart: onStart, onStop: onStop};
  const {deltaPosition, controlledPosition} = fieldLocation;
  return (
    
    <Draggable handle="strong" position={{x: initalx, y: initaly}} {...dragHandlers}> 
      <div className="box no-cursor">
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
  );
}

const mapStateToProps = (state) => {
  return {
    maxZIndex: state.note.maxZIndex,
  };
};

export default connect(mapStateToProps)(Note_draggable);
// export default Note;
