import React from 'react'
import Grid from '@material-ui/core/Grid';
import { Link } from 'react-router-dom';
//Mui imports
import AppBar from '@material-ui/core/AppBar';
import ToolBar from '@material-ui/core/ToolBar';
import Button from '@material-ui/core/Button';

export default function Navbar() {
    return (
        <div>
            <AppBar style={{position: 'relative'}}>
                <ToolBar>
                {/* <Button 
                        component={Link}
                        to="/main">Main</Button> */}
                </ToolBar>
            </AppBar>  
        </div>
    )
}
