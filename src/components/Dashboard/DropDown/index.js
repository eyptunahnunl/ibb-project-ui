import React, {useRef} from 'react'
import './styles.css'

const  DropDown = (props) => {
  const selectRef = useRef()

  const handleChange = () => {
    const borough = selectRef.current.value
    props.filterParksByBorough(borough)
  }

  return (
    <div id='DropDownBorough'>
      <label id='BoroughLabel' htmlFor="">Select A Borough</label>
      <select 
        ref={selectRef}
        value={props.activeBorough} 
        onChange={handleChange}
        name="borough" id="boroughs">
        <option value="all">(All)</option>
        <option value="KADIKÖY">Kadıköy</option>
        <option value="BAKIRKÖY">Bakırköy</option>
        <option value="SISLI">SİSLİ</option>
      </select>


    </div>
      
  )
}

export default DropDown