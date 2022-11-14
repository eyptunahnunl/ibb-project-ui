import React, { useEffect, useState, useRef, useMemo } from 'react';
import './styles.css';
import useOnClickOutside from '../../../hooks/useOnClickOutside';

const Input = (props) => {
 
  const [val, setVal] = useState('');

  const valRef = useRef('')
  const parkChoicesRef = useRef()
  const [isOpen, setOpen] = useState(false)
  useOnClickOutside(parkChoicesRef , () => setOpen(false))

  const handleUpdateVal = (park) => {
    valRef.current.value = park.parkName
    setOpen(false)
    props.filterParksByPark(park)
  }

  useEffect(() => {
    if(props.activeParks.length > 2) {
      valRef.current.value = ''
    } else if(props.activeParks.length === 1) {
      setVal(props.activeParks[0].parkName)
    }
    
  }, [props.activeParks])


  const parkChoices = useMemo(() => {
      //console.log('Input - parkChoices')
      return props.activeParks.map( (park, index) => {
        return ( 
            <div 
            key={index}
            //className={`parkChoice ${park.code}`}
            //style={{color: park.boroughColor}}
            onClick={() => handleUpdateVal(park)}
            >
            {park.parkName}
          </div> 
        )
      })}, [props.activeParks]
  )


  const handleToggle = () => {
  
    setOpen(true)
  }


 
  return (
    <>
    <form id='sidebarStyle'>
      <label htmlFor="">Park Seçiniz</label>
      <input id="parkInput" ref={valRef}
        onClick={handleToggle}
        type="text"
        placeholder="park adı..."
        
      />
    </form>
      {isOpen ? (
      <div ref={parkChoicesRef} id="parkChoices" >
        {parkChoices}
      </div> ) : '' }
    </>
  );
};


export default Input
