import React, { useState, useEffect, useRef, useMemo } from 'react';
import ReactMapGL, { Marker, Popup } from 'react-map-gl';
import { useSpring, animated } from 'react-spring';
import './styles.css'
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import { Button,message } from 'antd';
import { updatePark } from '../../../../hooks/authApi';
import { Formik } from 'formik';
import { Box } from '@material-ui/core';

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});


const Markers = ({ park, isShowing }) => {
  const style = useSpring({
    config: {
      duration: 500
    },
    opacity: isShowing ? 0 : 0
  });

  const styles = {
    borderRadius: '50%',
    backgroundColor: 'blue',
    width: '7px',
    height: '7px'
  };
  const classes = useStyles();


  const [popupInfo, setPopupInfo] = useState(null);

  const [showPopup, setShowPopup] = useState(true);

  const handleSubmit = async (values, bag) => {
 message.loading({content: "Loading.. ", key: "park_update"})

 console.log("VALUES",values)
    try {
      await updatePark(values)
      message.success({
        content: 'The Park has been updated',
        key: "park_updated",
        duration:2,

      })
    } catch (error) {
      message.error("HATA")
      
    }
  }

  
  return (
    <div>
      <Marker
        key={park.id}
        longitude={parseFloat(park.lon)}
        latitude={parseFloat(park.lat)}


      >
        <div className='Marker'
          onClick={e => {
               setPopupInfo(park);
          }}
        />


      </Marker>
      {popupInfo && (
        <Popup
          anchor="top"
          longitude={parseFloat(popupInfo.lon)}
          latitude={parseFloat(popupInfo.lat)}
          onClose={() => setPopupInfo(null)}


        >

           <Formik
            initialValues={{
              id: park.id,
              lon:park.lon,
              lat:park.lat,
              parkType: park.parkType,
              parkName: park.parkName,
              capacityofPark: park.capacityofPark,
              countyName: park.countyName,
              locationName: park.locationName,
              workingTime: park.workingTime
            }}
            onSubmit={handleSubmit}
          >
            
            {

              ({ handleSubmit, errors, touched, handleChange, handleBlur, values,isSubmitting }) => (
                
                <>
                  <Box>
                    <Box>
                      <form onSubmit={handleSubmit}>

                      <Box margin={2}>
                          <TextField
                            autoComplete="fname" 
                            variant="outlined"
                            required
                            fullWidth
                            id="parkName"
                            label="Park Name"
                            autoFocus
                            onChange={handleChange}
                            onBlur={handleBlur}
                            defaultValue={values.parkName}
                  
                          />
                        </Box>
                        <Box margin={2}>
                          <TextField
                            autoComplete="fname"        
                            variant="outlined"
                            required
                            fullWidth
                            id="capacityofPark"
                            label="Capacity"
                            autoFocus
                            onChange={handleChange}
                            onBlur={handleBlur}
                            defaultValue={values.capacityofPark}
                          
                          />
                        </Box>

                        <Box margin={2}>
                          <TextField
                            autoComplete="fname"
                            variant="outlined"
                            required
                            fullWidth
                            id="parkName"
                            label="Location Name"
                            autoFocus
                            onChange={handleChange}
                            onBlur={handleBlur}
                            defaultValue={values.locationName}
                  
                          />
                        </Box>
                        <Box margin={2}>
                          <TextField
                            autoComplete="fname"
                            variant="outlined"
                            required
                            fullWidth
                            id="workingTime"
                            label="Working Time"
                            autoFocus
                            onChange={handleChange}
                            onBlur={handleBlur}
                            defaultValue={values.workingTime}
                  
                          />
                        </Box>

                        <Button
                          type="primary"
                          //icon={<PoweroffOutlined />}
                          loading={isSubmitting}
                          onClick={handleSubmit}
                        >
                          Update
                        </Button>
                      </form>
                    </Box>
                  </Box>
                </>



              )

            }

          </Formik> 
          
          

        </Popup>)}




    </div>
    // 	<Marker longitude={parseFloat(park.lon)} latitude={parseFloat(park.lat)}>
    // 	<div style={{ ...style, backgroundColor: park.color }}></div>
    // </Marker>
  );
};

export default Markers;
