import React, { useEffect, useState, useRef, useMemo } from 'react';
import './styles.css';
import useOnClickOutside from '../../../hooks/useOnClickOutside';

const Input = (props) => {
  // console.log('Input - props', activeParks, reset)
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

  // THIS HANDLES THE MANUAL TOGGLING OF THE DROP DOWN
  const handleToggle = () => {
    //setIsVisible(!isVisible)
    setOpen(true)
  }


  
  // console.log('Input - parkChoices', props, parkChoices)
  return (
    <>
    <form id='sidebarStyle'>
      <label htmlFor="">Find A Court - all courts</label>
      <input id="parkInput" ref={valRef}
        onClick={handleToggle}
        type="text"
        placeholder="court name"
        
      />
    </form>
      {isOpen ? (
      <div ref={parkChoicesRef} id="parkChoices" >
        {parkChoices}
      </div> ) : '' }
    </>
  );
};


// export default MemoizedInput= memo(Input)
export default Input
