import React, { useEffect, useState, useRef } from 'react';
import './styles.css';
import useDataApi from '../../hooks/useDataApi';

import Map from './Map'
import DropDown from './DropDown'
import Input from './Input';
import Navbar from '../Navbar';

import { makeStyles } from "@material-ui/core/styles";



const useStyles = makeStyles({
  root: {
    minWidth: 275,
  },
  bullet: {
    display: "inline-block",
    margin: "0 2px",
    transform: "scale(0.8)",
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
});

export default  function Dashboard() {
  const mapRef = useRef();
  const [parkData, setParkData] = useState({
    allParks: [],
    activeParks: [],
    activeBorough: 'all'
  });

  const [{ data, isLoading }] = useDataApi(
    'https://localhost:44345/api/isparks/getispark',
    []
  );
  useEffect(() => {
    
    if (data.length) {

      setParkData((prevState) => ({
        ...prevState,
        allParks: data[0],
        activeParks: data[0]
      }));
    }
  }, [data]);
  
  console.log('App - parkData', parkData);
  

  const filterParksByPark = (park) => {
    setParkData({
      ...parkData,
      activeParks: [park],
      activeBorough: park.countyName
    });
  };

  const filterParksByBorough = (borough) => {
    const parksByBorough = parkData.allParks.filter((park) => {
      return borough === 'all' ? park : park.countyName === borough;
    });
    setParkData({
      ...parkData,
      activeParks: parksByBorough,
      activeBorough: borough
    });
  };


  return (
    < >
      <Navbar />
      <Map {...parkData} />
      <DropDown
        filterParksByBorough={filterParksByBorough}
        activeBorough={parkData.activeBorough}
      />
       <Input
        allParks={parkData.allParks}
        activeParks={parkData.activeParks}
        filterParksByPark={filterParksByPark}
      /> 

    </>
  );
}
