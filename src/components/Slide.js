import React, { Component } from 'react'
import Grid from '@material-ui/core/Grid';
import Carousel from 'react-material-ui-carousel';
import { Card, CardMedia } from '@material-ui/core';
import FormSignup from '../components/FormSignup'
import Panel from '../components/Panel'
import note1 from './note1.jpg';
import note2 from './note2.jpg';
import note3 from './note3.jpg';
function Slide() {
    var items = [
        {
            name: 'slide 1',
            decsription: 'desc slie 1',
            image: note1,
        },
        {
            name: 'slide 2',
            decsription: 'desc slie 2',
            image: note2,
        },
        {
            name: 'slide 3',
            decsription: 'desc slie 3',
            image: note3,
        }
    ]
    return (
        <div>
            <Carousel indicators={false} autoPlay={true}>
                {
                    items.map(item => {
                        return <Item item={item} key={item.name} />
                    })
                }
            </Carousel>
            <div>
            <Grid md={8} style={{width:'30%', position: 'absolute', left:'50%', transform: 'translateX(-50%)', top: '15%', /*paddingTop: '15px', paddingRight: '50px', paddingBottom: '35px', paddingLeft: '50px',*/ border: '1px solid white', borderRadius: '7px', backgroundColor: '#ffffff'}} >
                <Panel />
            </Grid>
            </div>
        </div>
    )
}

function Item(props) {
    // const img = props.item.image;
    return (
        <Card>
            <CardMedia component="img" style={{width: '100%', height: '100vh', opacity: '0.50'}} src={props.item.image} />
        </Card>

    )
}

export default Slide;