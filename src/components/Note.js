import React, { useReducer, useState, useRef, useEffect } from 'react';
import { connect } from 'react-redux';
import { Card, CardContent, Typography, Menu, MenuItem, IconButton } from '@material-ui/core';
import Input from '@material-ui/core/Input';
import TextField from '@material-ui/core/TextField';
import ControlCameraIcon from '@material-ui/icons/ControlCamera';
import { saveNewNoteFunc, deleteNoteFunc, saveNoteLocationFunc, updateNoteFunc } from '../actions/notes.actions';
import { Rnd } from "react-rnd";
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import '../helpers/style.css';
import styled from 'styled-components';

const StyledOuterDiv = styled.div`
  height: 100%;
`;

const StyledDivHeader = styled.div`
  background-color: #b23c17;
  color: #ffffff;
  text-align: center;
  display: flex;
  width: 100%; 
  height: 15%;
  justify-content: space-between;
`;

const StyledCard = styled(Card)`
  height: 85%;
`;

const StyledInput = styled(Input)`
  width: 100%;
  height: 100%;
`;

const StyledTextField = styled(TextField)`
  width: 100%;
  height: 100%;  
`;

// TODO: Create a function to store the location of each note to put them back on the right place when user comes back.
// FIXME: Put the focus on the selected note. Some notes stay behind of others. Find a way to fix this on mouseclick.

function reducer(state, {field, value}) {
  return {
    ...state,
    [field]: value,
  };
}

function Note(props) {
  const initialState = {
    _id: props.note._id,
    type: props.note.type,
    title: props.note.title,
    note: props.note.note,
    initialx: props.note.x,
    initialy: props.note.y,
    zIndex: props.note.zIndex,
    height: (props.note.height  === null ? 250 : props.note.height),
    width: (props.note.width  === null ? 250 : props.note.width),
    status: (props.note.status  === null ? "db" : props.note.status)
  };

  const stateDrag = {
    width: props.note.width === null ? 250 :  props.note.width,
    height: props.note.height === null ? 250 :  props.note.height,
    x: props.note.x,
    y: props.note.y
  };

  const [field, setField] = useReducer(reducer, initialState);
  const [fieldDrag, setFieldDrag] = useState(stateDrag);
  const [anchorEl, setAnchorEl] = useState(null);
  const [open, setOpen] = React.useState(false);
  const isMenuOpen = Boolean(anchorEl);
  const handleChange = (event) => {
    setField({ field: event.target.name, value: event.target.value });
  };

  const { _id, type, title, note, initialx, initialy, zIndex, width, height, status } = field;

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const updateNote = () => {
    var coord = getNoteLocation();
    var size = getSize();
    var updateNote = field;
    updateNote.initialx = coord.x;
    updateNote.initialy = coord.y;
    updateNote.width = size.width;
    updateNote.height = size.height;
    props.dispatch(updateNoteFunc(updateNote))
  }

  const saveNote = (event) => {
    var coord = getNoteLocation();
    var size = getSize();
    var newNote = field;
    newNote.x = coord.x;
    newNote.y = coord.y;
    newNote.width = size.width;
    newNote.height = size.height;
    
    props.dispatch(saveNewNoteFunc(newNote));
  }

  const deleteNote = () => {
    var noteID = field._id;
    if(field.status === 'new'){
      // props.dispatch(deleteTempNoteFunc(noteID));
    } else {
      props.dispatch(deleteNoteFunc(noteID));
    }
  }

  const getNoteLocation = () => {
    let x = fieldDrag.x;
    let y = fieldDrag.y;
    return {x, y}
  }

  const getSize = () => {
    let width = fieldDrag.width;
    let height = fieldDrag.height;
    return {width, height};
  }

  const menuId = 'secondary-search-account-menu';
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      id={menuId}
      keepMounted
      open={isMenuOpen}
      onClose={handleMenuClose}
      style={{ marginLeft: '-15px' }}
    >
      {
        (status==="new") ? <MenuItem onClick={saveNote}>Save Note</MenuItem> : null
      }
      <MenuItem onClick={updateNote}>Update Note</MenuItem>
      <MenuItem onClick={deleteNote}>Delete Note</MenuItem>
    </Menu>
  );

  return (
    
    <Rnd 
      handle="strong"
      position={{ x: fieldDrag.x, y: fieldDrag.y }}
      size={{ width: fieldDrag.width, height: fieldDrag.height }}
      onDragStop={(e, d, ) => {
        setFieldDrag({ ...fieldDrag, x: d.x, y: d.y });
      }}
      onResizeStop={(e, direction, ref, delta, position) => {
        setFieldDrag({
            width: ref.style.width,
            height: ref.style.height,
            ...position
          });
        }}
    >
      <StyledOuterDiv>
        <strong className="cursor" >
          <StyledDivHeader>
            <div>
              <ControlCameraIcon />
            </div>
            <div>
              {title}
            </div>
            <div>
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
            </div>
          </StyledDivHeader>
        </strong>
        <StyledCard>
          <CardContent>
            <Typography gutterBottom variant="h5" component="h2">
              <StyledInput type="text" name="title" value={title} onChange={handleChange} />
            </Typography>
            <Typography gutterBottom variant="body2" component="h3">
              <StyledInput type="text" name="type" value={type} onChange={handleChange} />
            </Typography>
            <Typography gutterBottom variant="body2" component="div">
              <StyledTextField multiline type="text" name="note" value={note} onChange={handleChange} />
            </Typography>
          </CardContent>
        </StyledCard>
      </StyledOuterDiv>
      {renderMenu}
    </Rnd>
  );
}

const mapStateToProps = (state) => {
  return {
    maxZIndex: state.note.maxZIndex,
  };
};

export default connect(mapStateToProps)(Note);
