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
      <label id='BoroughLabel' htmlFor="">İlçe Seçiniz</label>
      <select 
        ref={selectRef}
        value={props.activeBorough} 
        onChange={handleChange}
        name="borough" id="boroughs">
        <option value="all">(All)</option>
        <option value="ARNAVUTKÖY">ARNAVUTKÖY</option>
        <option value="ATASEHIR">ATAŞEHİR</option>
        <option value="AVCILAR">AVCILAR</option>
        <option value="BAGCILAR">BAĞCILAR</option>
        <option value="BASAKSEHIR">BAŞAKŞEHİR</option>
        <option value="BESIKTAS">BEŞİKTAŞ</option>
        <option value="BEYKOZ">BEYKOZ</option>
        <option value="BEYOGLU">BEYOĞLU</option>
        <option value="CEKMEKOY">ÇEKMEKÖY</option>
        
        <option value="FATIH">FATİH</option>
        <option value="KARTAL">KARTAL</option>
        <option value="MALTEPE">MALTEPE</option>
        <option value="PENDIK">PENDİK</option>
        <option value="TUZLA">TUZLA</option>
        <option value="ÜMRANIYE">ÜMRANİYE</option>
        <option value="ÜSKÜDAR">ÜSKÜDAR</option>
        <option value="KADIKÖY">KADIKÖY</option>
        <option value="BAKIRKÖY">BAKIRKÖY</option>
        <option value="ZEYTINBURNU">ZEYTİNBURNU</option>
        <option value="SISLI">ŞİŞLİ</option>
      </select>


    </div>
      
  )
}

export default DropDown