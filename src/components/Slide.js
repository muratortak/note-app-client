import React from 'react'
import Grid from '@material-ui/core/Grid';
import Carousel from 'react-material-ui-carousel';
import { Card, CardMedia } from '@material-ui/core';
import styled from 'styled-components';
import Panel from '../components/Panel'
import note1 from '../home_bg_images/note1.jpg';
import note2 from '../home_bg_images/note2.jpg';
import note3 from '../home_bg_images/note3.jpg';

const StyledGrid = styled(Grid)`
    width: 30%;
    position: absolute;
    left:50%;
    transform: translateX(-50%);
    top: 15%;
    border: 1px solid white;
    border-radius: 7px;
    background-color: #ffffff;
`;

const StyledCardMedia = styled(CardMedia)`
    width: 100%;
    height: 100vh;
    opacity: 0.50;
`;

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
            <StyledGrid md={3} >
                <Panel />
            </StyledGrid>
            </div>
        </div>
    )
}

function Item(props) {
    return (
        <Card>
            <StyledCardMedia component="img" src={props.item.image} />
        </Card>

    )
}

export default Slide;