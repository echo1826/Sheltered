import React, { useState, useRef } from "react";
import TinderCard from 'react-tinder-card';
import Typography from '@mui/material/Typography';
import { QUERY_ALL_DOGS } from "../../utils/queries";
import { useQuery } from "@apollo/client";
import './Cards.css';

export default function Cardrender(props) {
    const [lastDirection, setLastDirection] = useState();
    
    // const settings = props.settings;
    const {loading, data} = useQuery(QUERY_ALL_DOGS);
    let dogCardData;
    if(loading) {
        return <div>Loading cards...</div>
    } else {
        dogCardData = data?.dogs;
    }
    const swiped = (direction) => {
        setLastDirection(direction)
      }
    const testDogData = dogCardData.slice(0, 3);
    const [currentIndex, setCurrentIndex] = useState(testDogData.length - 1);
    const currentIndexRef = useRef(currentIndex);
    const updateCurrentIndex= (val) => {
        setCurrentIndex(val);
        currentIndexRef.current = val;
    }
    const childRefs = useMemo(
        () =>
          Array(testDogData.length - 1)
            .fill(0)
            .map((i) => React.createRef()),
        []
      )
    const swiped = (direction, index) => {
        setLastDirection(direction);
        updateCurrentIndex(index - 1);
    }
    return(<div className='cardContainer'>
        {testDogData.map((dog) => {
            return(
            <TinderCard className='swipe' key={dog._id} onSwipe={(direction) => swiped(direction)}>
                <img className='swipeImg' src={dog.photo[0].medium} alt={dog.name}/>
                <Typography variant="h2" component="div" color="black" margin="5px" align="center" sx={{ fontSize: "20px", display: 'inline-block', paddingLeft: 0, lineHeight:'20px' }}>
                <h2>{dog.name}</h2>
                </Typography>
                <Typography variant="p" component="div" fontFamily='Source Sans Pro' color="black" margin="5px" align="center" sx={{ fontSize: "18px", display: 'inline-block', paddingLeft: 0}}>
                <p>{dog.location}</p>
                </Typography>
            </TinderCard>)
        })}
        {lastDirection ? <h2>You swiped {lastDirection}</h2> : <h2></h2>}
    </div>)
}